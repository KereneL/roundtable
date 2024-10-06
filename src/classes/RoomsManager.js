// RoomsManager.js
const Room = require('./Room');

class RoomsManager {
  constructor() {
    this.rooms = new Map();  // Store rooms using a Map for fast lookups
  }

  // Create a new room and return the room object
  createNewRoom() {
    const roomName = this.generateRoomName();
    const room = new Room(roomName);
    this.rooms.set(roomName, room);
    return room;  // Return the Room object, not the room name
  }

  // Retrieve an existing room by name
  attempt(roomName) {
    return this.rooms.get(roomName) || null;
  }

  // Remove a room by name
  removeRoom(roomName) {
    this.rooms.delete(roomName);
  }

  // Generate a unique room name (implement this however you like)
  generateRoomName() {
    // Example: Generates a random string of 4 uppercase characters
    return Math.random().toString(36).substring(2, 6).toUpperCase();
  }
}

const gameroomsManager = new RoomsManager();
module.exports = gameroomsManager
