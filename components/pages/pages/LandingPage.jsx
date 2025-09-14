import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Agent Dashboard</h1>
        <p className="text-gray-600 mb-6">Submit logs, get agent suggestions, and inspect history.</p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard" className="px-5 py-3 bg-indigo-600 text-white rounded-lg">Open Dashboard</Link>
          <Link to="/history" className="px-5 py-3 border rounded-lg text-gray-700">History</Link>
        </div>
      </div>
    </div>
  );
}
