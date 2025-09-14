import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Navbar */}
        <nav className="flex justify-between bg-white shadow-md p-4 rounded-lg mb-6">
          <h1 className="text-xl font-bold text-blue-600">DevOps Pilot</h1>
          <div className="flex gap-4">
            <Link className="text-gray-700 hover:text-blue-500" to="/">Dashboard</Link>
            <Link className="text-gray-700 hover:text-blue-500" to="/history">History</Link>
          </div>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
