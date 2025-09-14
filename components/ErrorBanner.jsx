import React from "react";

export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div role="alert" className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm">{message}</div>
        {onRetry && (
          <button onClick={onRetry} className="text-sm underline">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
