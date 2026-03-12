import React from "react";

const STYLES = {
  success: "bg-emerald-900/90 border-emerald-600/50 text-emerald-200",
  error: "bg-red-900/90 border-red-600/50 text-red-200",
  info: "bg-blue-900/90 border-blue-600/50 text-blue-200",
};

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export default function Toast({ message, type = "success" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm flex items-start gap-3 
        px-4 py-3 rounded-xl border backdrop-blur-sm shadow-2xl 
        animate-slide-up ${STYLES[type] || STYLES.info}`}
      style={{
        animation: "slideUp 0.3s ease-out",
      }}
    >
      <span className="font-bold text-sm mt-0.5">{ICONS[type]}</span>
      <p className="text-sm leading-snug">{message}</p>
    </div>
  );
}
