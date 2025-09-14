import { useState } from "react";

export default function LogForm({ onSubmit }) {
  const [log, setLog] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!log.trim()) return;
    onSubmit(log);
    setLog("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow">
      <label className="block mb-2 font-semibold">Submit a Log</label>
      <textarea
        className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-400"
        rows="4"
        placeholder="Enter log here..."
        value={log}
        onChange={(e) => setLog(e.target.value)}
      />
      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
