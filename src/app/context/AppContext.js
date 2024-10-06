"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket/socket";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const [userName, setuserName] = useState("")
  const [roomName, setRoomName] = useState("")
  const [roomParticipants, setRoomParticipants] = useState([])
  const [socketStatus, setSocketStatus] = useState(false);

  useEffect(() => {
    console.log(`Setting up SocketIO listeners...`);

    socket.on('disconnect', () => {
      console.log(`SocketIO disconnected`);
      setSocketStatus(false); // Trigger re-render
    });
  }, []);

  const connectSocket = ()=>{
    if (!socket.connected) {
      socket.connect();
    }
  }

  // Join Room
  const joinRoom = ({roomName, username}) => {
      socket.once('connect', () => {
        console.log(`SocketIO successfully connected.`);
        attemptJoinRoom({ roomName, username }); // Attempt to join the room once socket is connected
    })

    connectSocket();
    // setRoomName(`${roomName}`)
    // setCurrentView('room-lobby');
    // setSocketStatus(true);
  };
  const attemptJoinRoom = ({ roomName, username }) => {
    console.log(`Attempting to join room: ${roomName}`);
    // Clear any old listeners
    socket.off('joined-room-successfully');
    socket.off('error-joining-room');

    // Listener for successfully joining the room
    socket.once('joined-room-successfully', (roomInfo) => {
      console.log(`Entered room ${roomName} as ${username}`);
      setRoomName(`${roomName}`)
      setCurrentView('room-lobby');
      setSocketStatus(true);

      // Remove the failure listener
      socket.off('joined-room-successfully');
      socket.off('error-joining-room');
    });

    // Listener for no room found
    socket.once('error-joining-room', ({error}) => {
      console.log(`Could not connect to room '${roomName}' as '${username}'\nError: '${error}'`);
      socket.off('joined-room-successfully');
      socket.off('error-joining-room');
      socket.disconnect();
      setSocketStatus(false);
      setRoomName(null)
    });

    socket.emit('join-room', { roomName, username });
  };

  // Create New Room
  const createNewRoom = ({ username }) => {
    socket.once('connect', () => {
      console.log(`SocketIO successfully connected!`);
      attemptCreateNewRoom({ username });
    })

    connectSocket();
  };
  const attemptCreateNewRoom = ({ username }) => {

    // Listener for successful room creation
    socket.once('room-created-successfully', ({roomName}) => {
      console.log(`Room created successfully: '${roomName}'`);
      socket.off('room-created-successfully')
      socket.off('room-not-created')
      
      attemptJoinRoom({ roomName, username });
    });
    // Listener for room creation failure
    socket.once('room-not-created', () => {
      console.warn(`Could not create new room as '${username}'.`);
      socket.disconnect();

      socket.off('room-created-successfully')
      socket.off('room-not-created')
      setSocketStatus(false);
    });

    console.log(`Attempting to create a new room...`);
    socket.emit('create-new-room', { username });
  };

  // Utils
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };
  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const value = {
    isAuthenticated,
    currentView,
    socketStatus,
    roomName,
    roomParticipants,
    createNewRoom,
    joinRoom,
    login,
    logout,
    navigateTo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
