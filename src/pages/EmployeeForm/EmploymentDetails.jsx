import React from 'react';


function EmploymentDetails({ formData, handleChange, errors, onPrev, onNext }) {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-5 animate-in fade-in zoom-in duration-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Employment Details</h2>

        {/* Responsive Two‑Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1.5">
              Department
            </label>
            <div className="relative">
              <input
                id="department"
                name="department"
                type="text"
                placeholder="Enter department"
                value={formData.department || ''}
                onChange={handleChange}
                className={`w-full border ${errors?.department ? 'border-red-500' : 'border-slate-300'} rounded-xl h-11 pl-4 pr-4 bg-white text-sm font-normal text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200`}
              />
            </div>
            {errors?.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-slate-700 mb-1.5">
              Designation
            </label>
            <div className="relative">
              <input
                id="designation"
                name="designation"
                type="text"
                placeholder="Enter designation"
                value={formData.designation || ''}
                onChange={handleChange}
                className={`w-full border ${errors?.designation ? 'border-red-500' : 'border-slate-300'} rounded-xl h-11 pl-4 pr-4 bg-white text-sm font-normal text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200`}
              />
            </div>
            {errors?.designation && (
              <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-1.5">
              Salary
            </label>
            <div className="relative">
              <input
                id="salary"
                name="salary"
                type="number"
                min="0"
                placeholder="Enter salary"
                value={formData.salary || ''}
                onChange={handleChange}
                className={`w-full border ${errors?.salary ? 'border-red-500' : 'border-slate-300'} rounded-xl h-11 pl-4 pr-4 bg-white text-sm font-normal text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200`}
              />
            </div>
            {errors?.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-5 mt-4 border-t border-slate-100">
          <button type="button" onClick={onPrev} className="h-10 px-5 bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 rounded-xl transition-all duration-200">◀ Previous</button>
          <button type="button" onClick={onNext} className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white rounded-xl shadow-sm transition-all duration-200">Next →</button>
        </div>
      </div>
  );
}

export default EmploymentDetails;
