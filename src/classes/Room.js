class Room {
    constructor(name) {
      this.name = name;  // Store the room name
      this.participants = new Set();  // Store participants using a Set
    }
  
    // Method to add a participant
    addParticipant(participant) {
      this.participants.add(participant);  // Add the participant to the Set
    }
  
    // Method to remove a participant by their socket ID (sid)
    removeParticipant(sid) {
      this.participants.forEach((participant) => {
        if (participant.sid === sid) {
          this.participants.delete(participant);  // Remove the participant from the Set
        }
      });
    }

    get participant() {return this.participants}
  }
  
  module.exports = Room;
  