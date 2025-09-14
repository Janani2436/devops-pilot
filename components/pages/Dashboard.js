import React, { useState } from "react";

function Dashboard() {
  const [log, setLog] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log }),
      });
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const data = await res.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Submit a Log</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={log}
          onChange={(e) => setLog(e.target.value)}
          placeholder="Enter log details..."
          className="flex-1 border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading suggestions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Agent Suggestions</h3>
          <ul className="list-disc pl-5">
            {suggestions.map((s, idx) => (
              <li key={idx} className="text-gray-700">{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
