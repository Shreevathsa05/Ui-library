import React, { useState } from "react";

export function ConfirmButton({
  children,
  onConfirm,
  message = "Are you sure?",
  className = "",
  ...props
}) {
  const [confirming, setConfirming] = useState(false);

  async function handleClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setConfirming(false);
    await onConfirm();
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md font-medium text-white
        ${confirming ? "bg-red-700" : "bg-red-600 hover:bg-red-700"}
        transition
        ${className}`}
      {...props}
    >
      {confirming ? message : children}
    </button>
  );
}
