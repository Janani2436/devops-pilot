import React from "react";

export default function LoadingSpinner({ size = 6 }) {
  const px = size * 4;
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="rounded-full animate-spin"
        style={{
          width: px,
          height: px,
          border: `${Math.max(2, Math.floor(size/2))}px solid rgba(79,70,229,0.95)`,
          borderTopColor: "transparent",
        }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
