// PersonalDetails.jsx – Updated UI/UX for Step 1

// InfoBox import removed for unified design
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

function PersonalDetails({ formData, handleChange, errors, onNext }) {
  // Track which fields have been touched to control validation messages
  const [touched, setTouched] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Determine if an error for a field should be shown
  const shouldShowError = (field) =>
    errors && errors[field] && (touched[field] || Object.keys(errors).length > 0);

  return (
    <section className="mx-auto p-4">
      {/* Page Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Employee Registration</h1>

      </header>

      {/* Step Indicator */}






       {/* Card Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Personal Details</h2>


        {/* Responsive Two‑Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${ shouldShowError('name') ? 'border-red-500' : ''}`} placeholder="Enter full name"
              />
            </div>
            {shouldShowError('name') && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${ shouldShowError('email') ? 'border-red-500' : ''}`} placeholder="Enter email address"
              />
            </div>
            {shouldShowError('email') && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Phone
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="phone"
                name="phone"
                type="text"
                maxLength={15}
                value={formData.phone || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${ shouldShowError('phone') ? 'border-red-500' : ''}`} placeholder="Enter 10-digit phone number"
              />
            </div>
            {shouldShowError('phone') && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-slate-700">
              Date of Birth
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border border-slate-300 rounded-lg h-12 pl-10 pr-10 bg-white text-slate-700 placeholder:text-slate-400 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${ shouldShowError('dob') ? 'border-red-500' : ''}`} placeholder="Select date of birth"
              />
            </div>
            {shouldShowError('dob') && (
              <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end pt-6">
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

export default PersonalDetails;
