const { Server } = require('socket.io');
const Participant = require('../classes/Participant');
const gameroomsManager = require('../classes/RoomsManager');

module.exports = function initializeSocketIO(httpServer, hostName, port) {
  const io = new Server(httpServer, {
    cors: {
      origin: [`http://${hostName}:${port}`],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🏰 Socket connected: '\x1b[36m${socket.id}\x1b[0m'`);

    // Handle room joining
    socket.on('join-room', async ({ roomName, username }) => {
      await joinRoomHandler(io, socket, { roomName, username });
    });

    // Handle room creation
    socket.on('create-new-room', async ({ username }) => {
      const roomObj = await createRoomHandler(io, socket, username);

      if (!roomObj) {
         io.to(socket.id).emit('room-not-created');
         return;
      } else {
          io.to(socket.id).emit('room-created-successfully',{ roomName: roomObj.name});
          return;
      }
    });

    // Handle disconnection
    socket.on('disconnect', async (reason) => {
      console.log(`🏰 Socket disconnected. Reason: '\x1b[31m${reason}'\x1b[0m`);
      await leaveRoomHandler(io, socket);
    });
  });

  return io;
};

// Helper to handle room joining
async function joinRoomHandler(io, socket, { roomName, username }) {
  try {
    // Attempt to join the room
    const roomObj = gameroomsManager.attempt(roomName);

    if (!roomObj) {
      // Emit event if the room was not found
      io.to(socket.id).emit('error-joining-room', {error:`🏰 Could not find room "${roomName}"`});
      return;
    }

    // Check if the participant already exists in the room
    const isAlreadyParticipant = Array.from(roomObj.participants).some(
      (participant) => participant.sid === socket.id
    );

    if (isAlreadyParticipant) {
      console.log(`🏰 User \x1b[32m${username} (SID: '\x1b[36m${socket.id}\x1b[0m') is already in room: "\x1b[33m\x1b[2m${roomName}\x1b[0m"`);
      return;
    }

    // Join the room and create a new participant
    await socket.join(roomName);
    const participant = new Participant({ sid: socket.id, username });
    roomObj.addParticipant(participant);

    // Attach the participant and room to socket.data
    socket.data.participant = participant;
    socket.data.participant.room = roomObj;

    console.log(`🏰 User \x1b[32m${username}\x1b[0m (SID: '\x1b[36m${socket.id}\x1b[0m') joined room: "\x1b[33m\x1b[2m${roomName}\x1b[0m"`);
    
    // Emit success event
    io.to(socket.id).emit('joined-room-successfully', { roomObj });

    // Emit updated participant list to all clients in the room
    io.to(roomObj.name).emit('update-participants', Array.from(roomObj.participants));

  } catch (error) {
    console.error(`Error joining room: '${error.message}'`);
    try {
      io.to(socket.id).emit('error-joining-room', {error:`Some error joining room`});
    } catch (error){
      console.error(`Probable socket error. Error: "\x1b[31m${error.message}\x1b[0m"`);
    }
  }
}

// Helper to handle room creation
async function createRoomHandler(io, socket, username) {
  try {
    // Create a new room and return the Room object
    const roomObj = gameroomsManager.createNewRoom();
    console.log(`🏰 Room created: "\x1b[33m\x1b[2m${roomObj.name}\x1b[0m"`);
    return roomObj;

  } catch (error) {
    console.error(`Error creating room: "\x1b[31m${error.message}\x1b[0m" for \x1b[32m${username}\x1b[0m`);
    try {
      io.to(socket.id).emit('room-not-created');
    } catch (error){
      console.error(`Probable socket error. Error: "\x1b[31m${error.message}\x1b[0m"`);
    }
    return null;
  }
}

// Helper to handle room leaving
async function leaveRoomHandler(io, socket) {
  try {
    // Retrieve the participant data from the socket
    const participant = socket.data.participant;
    const roomObj = participant.room;
    participant.room = undefined;

    // Remove the participant from the room
    roomObj.removeParticipant(participant.sid);
    console.log(`🏰 User \x1b[32m${participant.username}\x1b[0m (SID: '\x1b[36m${socket.id}\x1b[0m') removed from room: "\x1b[33m\x1b[2m${roomObj.name}\x1b[0m"`);

    // If the room is empty, remove the room
    if (roomObj.participants.size === 0) {
      gameroomsManager.removeRoom(roomObj.name);
      console.log(`🏰 Room "\x1b[33m\x1b[2m${roomObj.name}\x1b[0m" has been removed due to Inactivity.\x1b[0m`);
    } else {
      // Emit updated participant list to all clients in the room
      io.to(roomObj.name).emit('update-participants', Array.from(roomObj.participants));
    }
  } catch (error) {
    console.error(`Error leaving room: "\x1b[31m${error.message}\x1b[0m"`);
  }
}
