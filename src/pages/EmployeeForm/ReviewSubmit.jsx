import React, { useState } from 'react';

/**
 * ReviewSubmit – final step of the employee wizard.
 * Shows a read‑only summary of all entered values, grouped into three sections.
 * Provides a "Previous" button to go back and a "Submit" button that logs the
 * data, shows a success message and (optionally) could be hooked into a real
 * API call.
 */
function ReviewSubmit({ data, onPrev }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee form submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-slate-100">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-gray-700">Your employee information has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 space-y-8">
      {/* Personal Details */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">
          Personal Details
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div><dt className="font-medium text-gray-600">Name</dt><dd>{data.name}</dd></div>
          <div><dt className="font-medium text-gray-600">Email</dt><dd>{data.email}</dd></div>
          <div><dt className="font-medium text-gray-600">Phone</dt><dd>{data.phone}</dd></div>
          <div><dt className="font-medium text-gray-600">Date of Birth</dt><dd>{data.dob}</dd></div>
        </dl>
      </section>

      {/* Address Details */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">
          Address Details
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div><dt className="font-medium text-gray-600">Address</dt><dd>{data.address}</dd></div>
          <div><dt className="font-medium text-gray-600">City</dt><dd>{data.city}</dd></div>
          <div><dt className="font-medium text-gray-600">State</dt><dd>{data.state}</dd></div>
          <div><dt className="font-medium text-gray-600">Pincode</dt><dd>{data.pincode}</dd></div>
        </dl>
      </section>

      {/* Employment Details */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">
          Employment Details
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div><dt className="font-medium text-gray-600">Department</dt><dd>{data.department}</dd></div>
          <div><dt className="font-medium text-gray-600">Designation</dt><dd>{data.designation}</dd></div>
          <div><dt className="font-medium text-gray-600">Salary</dt><dd>{data.salary}</dd></div>
        </dl>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          ◀ Previous
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit ▶
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;
