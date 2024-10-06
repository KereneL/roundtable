"use client";
import { useState, useEffect } from "react";

import EnterNameInput from "./components/EnterNameInput";
import JoinExisting from "./components/JoinExisting";
import StartNew from "./components/StartNew";

export default function Login() {
  const [username, setUsername] = useState(""); // Lift the name state up to the parent component

  return (
    <div className="card card-bordered bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-2">Join the fun!</h2>
        <EnterNameInput username={username} setUsername={setUsername} />
        <div className="flex w-full flex-col lg:flex-row m-4">
          <JoinExisting username={username} />
          <div className="divider lg:divider-horizontal">OR</div>
          <StartNew username={username} />
        </div>
      </div>
    </div>
  );
}
