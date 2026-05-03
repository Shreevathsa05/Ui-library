import React from "react";

export function LinkButton({ children, onNavigate, className = "" }) {
  function handleClick(e) {
    e.preventDefault();
    onNavigate && onNavigate();
  }

  return (
    <button
      onClick={handleClick}
      className={`text-indigo-600 hover:underline font-medium ${className}`}
    >
      {children}
    </button>
  );
}
