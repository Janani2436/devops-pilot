import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <nav className="bg-indigo-600 text-white p-4 flex justify-between">
        <h1 className="font-bold">Agent Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/history" className="hover:underline">History</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
