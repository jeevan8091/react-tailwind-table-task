import React from 'react';
import { FiMapPin } from 'react-icons/fi';


function AddressDetails({ formData, handleChange, errors }) {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleChange}
              className={`mt-1 block w-full h-12 pl-10 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.address ? 'border-red-500' : ''}`}
            />
          </div>
        {errors?.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city || ''}
          onChange={handleChange}
          className={`mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.city ? 'border-red-500' : ''}`}
        />
        {errors?.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          id="state"
          name="state"
          type="text"
          value={formData.state || ''}
          onChange={handleChange}
          className={`mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.state ? 'border-red-500' : ''}`}
        />
        {errors?.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
        )}
      </div>

      {/* Pincode */}
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
          Pincode
        </label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          maxLength={10}
          value={formData.pincode || ''}
          onChange={handleChange}
          className={`mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${errors?.pincode ? 'border-red-500' : ''}`}
        />
        {errors?.pincode && (
          <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
        )}
      </div>
    </div>
  );
}

export default AddressDetails;
