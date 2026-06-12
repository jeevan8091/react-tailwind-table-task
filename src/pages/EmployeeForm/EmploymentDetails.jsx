import React from 'react';


function EmploymentDetails({ formData, handleChange, errors, onPrev, onNext }) {
  return (
    <section className="mx-auto p-4">
      {/* Page Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Employee Registration</h1>
        
      </header>

      {/* Card Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Employment Details</h2>


        {/* Responsive Two‑Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700">
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
                className={`w-full border ${errors?.department ? 'border-red-500' : 'border-slate-300'} rounded-lg h-12 pl-4 pr-4 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
              />
            </div>
            {errors?.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-slate-700">
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
                className={`w-full border ${errors?.designation ? 'border-red-500' : 'border-slate-300'} rounded-lg h-12 pl-4 pr-4 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
              />
            </div>
            {errors?.designation && (
              <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-slate-700">
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
                className={`w-full border ${errors?.salary ? 'border-red-500' : 'border-slate-300'} rounded-lg h-12 pl-4 pr-4 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
              />
            </div>
            {errors?.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <button type="button" onClick={onPrev} className="h-11 px-6 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300">◀ Previous</button>
          <button type="button" onClick={onNext} className="h-11 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Next →</button>
        </div>
      </div>
    </section>
  );
}

export default EmploymentDetails;
