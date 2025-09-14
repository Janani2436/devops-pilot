export default function SuggestionPanel({ suggestions, error }) {
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-600 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!suggestions) {
    return (
      <div className="p-4 text-gray-500 italic">
        Submit a log to see agent suggestions.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-2">Agent Suggestions</h2>
      <ul className="space-y-2">
        {suggestions.map((s, idx) => (
          <li key={idx} className="p-2 border rounded-lg bg-gray-50">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
