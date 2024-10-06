import AdminBadge from "./AdminBadge";

import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { socket } from "../../socket/socket";  // Ensure this is the correct socket instance

const listItemStyle = "hover:bg-base-300 rounded-md py-1 ps-4";
const secondaryStyle = "bg-secondary text-white rounded-md py-1 ps-4"; // Define your secondary color style

export default function Participants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Listen for participant updates from the server
    socket.on('update-participants', (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });
  }, []);

  return (
    <div className="justify-self-center text-start items-center text-center w-3/5">
      <h3 className="underline decoration-2 decoration-accent mb-2">
        {" "}
        Participants:
      </h3>

      <ol role="list" className="list-decimal list-outside">
        {participants.map((participant, index) => (
          <li
            key={index}
            className={listItemStyle}
          >
            {participant.username} {participant.isAdmin && <AdminBadge />}
          </li>
        ))}
      </ol>
    </div>
  );
}
