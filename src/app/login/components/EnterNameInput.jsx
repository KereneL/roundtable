export default function EnterNameInput({ username, setUsername }) {
  
  return (
    <div className="card bg-base-300 rounded-box grid h-28 flex-grow grow w-full place-items-center p-4">
      <label className="input input-bordered input-primary flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 "
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-40 text-center"
          value={username} // Set the value to the current name state
          onChange={(e) => setUsername(e.target.value)} // Update the name state on change
          autoFocus
        />
      </label>
    </div>
  );
}
