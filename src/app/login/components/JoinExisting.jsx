import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function JoinExisting({ username }) { // Receive the name as a prop
  const { joinRoom, socketStatus } = useAppContext();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    console.log("Socket Status changed:", socketStatus);
  }, [socketStatus]);

  return (
    <div className="card bg-base-300 rounded-box grid h-24 flex-grow place-items-center p-4">
      <div className="flex flex-row items-center">
        <input
          type="text"
          placeholder="Room Code"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="input input-sm input-bordered input-secondary text-center w-36 max-w-xs"
        />
        <button
          className="btn btn-secondary btn-sm mx-2"
          onClick={() => {
            joinRoom({roomName, username}); // Call the context's joinRoom function
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
