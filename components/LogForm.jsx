import React, { useState } from "react";

export default function LogForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const payload = {
      title: text.split("\n")[0].slice(0, 80) || "Log entry",
      description: text,
      tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
      <label className="block text-sm font-medium">Log / Incident</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Paste or type the log/incident here..."
        className="w-full rounded-md border-gray-200 border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tags (comma separated)"
        className="w-full rounded-md border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
      />
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Submit to /api/agents</div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
