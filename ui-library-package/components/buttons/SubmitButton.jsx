import React from "react";

export function SubmitButton({
  children,
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-2 rounded-md bg-green-600 text-white font-medium
        hover:bg-green-700 transition
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    >
      {loading ? "Submitting..." : children}
    </button>
  );
}
