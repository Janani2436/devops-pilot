import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold text-indigo-600">AgentDashboard</div>
          <div className="text-sm text-gray-500">Dashboard · UX</div>
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm text-gray-700 hover:underline">Home</Link>
          <Link to="/dashboard" className="text-sm text-gray-700 hover:underline">Dashboard</Link>
          <Link to="/history" className="text-sm text-gray-700 hover:underline">History</Link>
        </nav>
      </div>
    </header>
  );
}
