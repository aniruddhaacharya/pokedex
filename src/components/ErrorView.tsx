import React from "react";

export default function ErrorView({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div>
      <p>Error: {message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
