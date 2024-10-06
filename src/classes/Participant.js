class Participant {
    constructor({ sid, username }) {
        this.sid = sid;
        this.username = username;
        this.room = null;
    }
}

module.exports = Participant
