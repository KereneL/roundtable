"use client";
import { useAppContext } from "../context/AppContext";

import Participants from "./components/Participants";

export default function RoomLobby() {
  const { roomName } = useAppContext();

  return (
    <div className="card card-bordered bg-base-100 shadow-xl">
      <div className="card-body grid">
        <div className="card-title w-full card-title flex flex-row w-full justify-between">
          <h2 className="font-normal text-base flex flex-col text-start">
            <span className="text-xs">Playing</span>
            <span className="underline decoration-2 decoration-primary font-bold text-xl">
              SocketBasedGame
            </span>
          </h2>
          <h2 className="font-normal flex flex-col text-end">
            <span className="text-xs">Room</span>
            <span className="underline decoration-2 decoration-secondary font-bold text-xl">
              {roomName}
            </span>
          </h2>
        </div>
        <div className="divider divider-neutral m-0 mb-2">
        </div>
        <Participants />
      </div>
    </div>
  );
}
