import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

/**
 * Stepper – displays step numbers in circles with a connecting line.
 * Props:
 *   step: current active step (1‑based)
 *   totalSteps: total number of steps (default 4)
 */
const Stepper = ({ step = 1, totalSteps = 4 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        {steps.map((s, idx) => (
          <React.Fragment key={s}>
            {/* Circle */}
            <div className="relative flex items-center justify-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 {
                  s === step ? 'border-blue-600 bg-blue-600 text-white' : s < step ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-600'
                }`}
              >
                {s < step ? (
                  <FiCheckCircle className="h-5 w-5" />
                ) : (
                  s
                )}
              </div>
            </div>
            {/* Line (except after last) */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-300">
                {/* Filled part of line */}
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${Math.min(100, ((step - 1) / (totalSteps - 1)) * 100)}%` }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        Step {step} of {totalSteps}
      </div>
    </div>
  );
};

export default Stepper;
