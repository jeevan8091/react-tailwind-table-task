import React from 'react';

/**
 * ProgressBar – shows a horizontal progress indicator.
 * Props:
 *   step: current step (1‑4)
 */
export default function ProgressBar({ step }) {
  const percent = (step / 4) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
