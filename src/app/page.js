"use client";

import { useAppContext } from "./context/AppContext";
import Login from "./login/Login";
import RoomLobby from "./room-lobby/RoomLobby";

export default function Home() {
  const { currentView, socketStatus, login, navigateTo } = useAppContext();

  return (
    <main className="flex flex-col grow-1 gap-8 justify-items-center m-4">
      {/* Conditionally render components based on currentView */}
      {currentView === "login" && (
        <Login onLogin={login} />
      )}
      
      {currentView === "room-lobby" && (
        <RoomLobby  />
      )}
    </main>
  );
}