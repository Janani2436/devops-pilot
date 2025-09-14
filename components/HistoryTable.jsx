import React from "react";

export default function HistoryTable({ rows = [] }) {
  if (!rows.length) {
    return <div className="text-gray-500 italic">No history available.</div>;
  }

  return (
    <div className="overflow-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left">Log</th>
            <th className="px-3 py-2 text-left">Suggestions</th>
            <th className="px-3 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id ?? idx} className="border-t hover:bg-gray-50 align-top">
              <td className="px-3 py-2 align-top">{r.title ?? r.log ?? "—"}</td>
              <td className="px-3 py-2 align-top">
                <div className="text-xs text-gray-700 max-w-xl whitespace-pre-wrap">
                  {Array.isArray(r.suggestions) ? r.suggestions.join(", ") : JSON.stringify(r.suggestions)}
                </div>
              </td>
              <td className="px-3 py-2 align-top">{r.date ? new Date(r.date).toLocaleString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
