import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

function EmploymentDetails({ formData, handleChange, errors }) {
  return (
    <section className="mx-auto p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">


    <div className="space-y-6">
      {/* Department */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="department"
              name="department"
              type="text"
              value={formData.department || ''}
              onChange={handleChange}
              className={`mt-1 block w-full h-12 pl-10 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.department ? 'border-red-500' : ''}`}
            />
          </div>
        {errors?.department && (
          <p className="mt-1 text-sm text-red-600">{errors.department}</p>
        )}
      </div>

      {/* Designation */}
      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
          Designation
        </label>
        <input
          id="designation"
          name="designation"
          type="text"
          value={formData.designation || ''}
          onChange={handleChange}
          className={`mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.designation ? 'border-red-500' : ''}`}
        />
        {errors?.designation && (
          <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
        )}
      </div>

      {/* Salary */}
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
          Salary
        </label>
        <input
          id="salary"
          name="salary"
          type="number"
          min="0"
          value={formData.salary || ''}
          onChange={handleChange}
          className={`mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.salary ? 'border-red-500' : ''}`}
        />
        {errors?.salary && (
          <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
        )}
      </div>
      </div>
        </div>
    </section>
  );
}

export default EmploymentDetails;
