import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import SuggestionsPanel from "../components/SuggestionsPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBanner from "../components/ErrorBanner";

export default function DashboardPage() {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitLog(payload) {
    setLoading(true);
    setError("");
    setSuggestions(null);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || "Request failed");
      }
      const data = await res.json();
      // accept data.suggestions (array) or data (if array)
      const s = Array.isArray(data) ? data : (data.suggestions ?? data.results ?? []);
      setSuggestions(s);
    } catch (err) {
      setError(err.message || "Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Submit log</h2>
            <p className="text-sm text-gray-500">Paste the log or incident and press submit.</p>
          </div>

          <LogForm onSubmit={submitLog} />

          <div className="mt-6">
            {loading && <LoadingSpinner />}
            {error && <ErrorBanner message={error} onRetry={() => submitLog({ title: "retry", description: "" })} />}
            {suggestions && (
              <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Results (raw)</h3>
                <pre className="text-xs max-h-64 overflow-auto bg-gray-50 p-2 rounded">{JSON.stringify(suggestions, null, 2)}</pre>
              </div>
            )}
          </div>
        </section>

        <aside>
          <h3 className="text-lg font-semibold mb-3">Agent suggestions</h3>
          <SuggestionsPanel suggestions={suggestions} />
        </aside>
      </main>
    </>
  );
}
