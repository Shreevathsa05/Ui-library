import React, { useState } from "react";

export function ActionButton({
  children,
  onAction,
  onError,
  disabled = false,
  className = "",
  ...props
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!onAction || loading || disabled) return;

    try {
      setLoading(true);
      await onAction();
    } catch (err) {
      console.error(err);
      onError && onError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-md bg-indigo-600 text-white font-medium
        hover:bg-indigo-700 transition
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
