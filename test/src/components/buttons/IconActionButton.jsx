import React from "react";

export function IconActionButton({ children, onAction, className = "" }) {
  return (
    <button
      onClick={onAction}
      className={`p-2 rounded-md hover:bg-gray-100 transition
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        ${className}`}
    >
      {children}
    </button>
  );
}
