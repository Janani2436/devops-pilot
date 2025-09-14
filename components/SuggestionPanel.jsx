import React, { useState } from "react";

export default function SuggestionsPanel({ suggestions }) {
  const [expanded, setExpanded] = useState(null);

  if (!suggestions) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm text-gray-500 italic">
        Submit a log to get agent suggestions.
      </div>
    );
  }

  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm text-gray-500">
        No suggestions returned.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => {
        // support string or object shapes
        const title = typeof s === "string" ? s : (s.title || `Suggestion ${i + 1}`);
        const summary = typeof s === "string" ? s : (s.summary || (s.details ? JSON.stringify(s.details) : ""));
        return (
          <article key={s.id ?? i} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="font-semibold text-gray-800">{title}</div>
                {summary && <div className="text-sm text-gray-600 mt-1 line-clamp-3">{summary}</div>}
              </div>
              <div>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-sm text-indigo-600 underline"
                >
                  {expanded === i ? "Hide" : "View"}
                </button>
              </div>
            </div>

            {expanded === i && (
              <pre className="mt-3 p-2 bg-gray-50 text-xs rounded overflow-auto max-h-48">
                {typeof s === "string" ? s : JSON.stringify(s, null, 2)}
              </pre>
            )}
          </article>
        );
      })}
    </div>
  );
}
