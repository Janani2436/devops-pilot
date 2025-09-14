import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="text-gray-500">Loading history...</p>;

  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No logs yet.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Log</th>
              <th className="p-2 border">Suggestions</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className="text-gray-700">
                <td className="p-2 border">{item.log}</td>
                <td className="p-2 border">{item.suggestions.join(", ")}</td>
                <td className="p-2 border">{new Date(item.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
