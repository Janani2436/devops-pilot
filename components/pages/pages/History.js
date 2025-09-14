import { useEffect, useState } from "react";
import HistoryTable from "../components/HistoryTable";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">History</h1>
      <HistoryTable history={history} />
    </div>
  );
}
