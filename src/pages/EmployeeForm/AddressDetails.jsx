import React from 'react';
import { FiMapPin } from 'react-icons/fi';

/**
 * AddressDetails – Collects employee address details in the registration wizard.
 */
function AddressDetails({ formData, handleChange, errors, onPrev, onNext }) {
  return (
    <section className="mx-auto p-4">
      {/* Page Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Employee Registration</h1>

      </header>

      {/* Card Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Address Details</h2>


        {/* Responsive Two‑Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">
              Address
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter address"
                value={formData.address || ''}
                onChange={handleChange}
                className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${errors?.address ? 'border-red-500' : ''}`}
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city || ''}
              onChange={handleChange}
              className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${errors?.city ? 'border-red-500' : ''}`}
            />
            {errors?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              placeholder="Enter state"
              value={formData.state || ''}
              onChange={handleChange}
              className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${errors?.state ? 'border-red-500' : ''}`}
            />
            {errors?.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-slate-700">
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              placeholder="Enter 6‑digit pincode"
              maxLength={6}
              value={formData.pincode || ''}
              onChange={handleChange}
              className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${errors?.pincode ? 'border-red-500' : ''}`}
            />
            {errors?.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="h-11 px-6 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
          >
            ◀ Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="h-11 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddressDetails;
