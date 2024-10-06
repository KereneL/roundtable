
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function StartNew({ username }) {
  const { createNewRoom, socketStatus } = useAppContext();

  useEffect(() => {
    console.log("Socket Status changed:", socketStatus);
  }, [socketStatus]);

  return (
    <div className="card bg-base-300 rounded-box grid h-24 flex-grow place-items-center p-4">
      <div className="flex flex-row items-center">
        Start a
        <button
          className="btn btn-outline btn-accent btn-sm mx-2"
          onClick={() => {
            createNewRoom({username}); // Call the context's newRoom function
          }}
        >
          new game
        </button>
        room
      </div>
    </div>
  );
}
