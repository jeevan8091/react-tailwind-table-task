import React from 'react';

/**
 * ReviewSubmit – Displays a summary of entered employee details and handles final submission.
 */
function ReviewSubmit({ data, onPrev, onSubmit }) {




  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6 animate-in fade-in zoom-in duration-200">
      {/* Personal Details */}
      <section>
        <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-1.5 mb-3">
          Personal Details
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div><dt className="font-medium text-slate-500">Name</dt><dd className="font-normal text-slate-800">{data.name}</dd></div>
          <div><dt className="font-medium text-slate-500">Email</dt><dd className="font-normal text-slate-800">{data.email}</dd></div>
          <div><dt className="font-medium text-slate-500">Phone</dt><dd className="font-normal text-slate-800">{data.phone}</dd></div>
          <div><dt className="font-medium text-slate-500">Date of Birth</dt><dd className="font-normal text-slate-800">{data.dob}</dd></div>
        </dl>
      </section>

      {/* Address Details */}
      <section>
        <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-1.5 mb-3">
          Address Details
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div><dt className="font-medium text-slate-500">Address</dt><dd className="font-normal text-slate-800">{data.address}</dd></div>
          <div><dt className="font-medium text-slate-500">City</dt><dd className="font-normal text-slate-800">{data.city}</dd></div>
          <div><dt className="font-medium text-slate-500">State</dt><dd className="font-normal text-slate-800">{data.state}</dd></div>
          <div><dt className="font-medium text-slate-500">Pincode</dt><dd className="font-normal text-slate-800">{data.pincode}</dd></div>
        </dl>
      </section>

      {/* Employment Details */}
      <section>
        <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-1.5 mb-3">
          Employment Details
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div><dt className="font-medium text-slate-500">Department</dt><dd className="font-normal text-slate-800">{data.department}</dd></div>
          <div><dt className="font-medium text-slate-500">Designation</dt><dd className="font-normal text-slate-800">{data.designation}</dd></div>
          <div><dt className="font-medium text-slate-500">Salary</dt><dd className="font-normal text-slate-800">{data.salary}</dd></div>
        </dl>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          className="h-10 px-5 bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 rounded-xl transition-all duration-200"
        >
          ◀ Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white rounded-xl shadow-sm transition-all duration-200"
        >
          Submit ▶
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;
