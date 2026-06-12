/**
 * Validation utilities for Employee Form steps. 
 * Each function receives an object representing the form data for that step
 * and returns an object where keys are field names and values are error messages.
 * If a field passes validation it is omitted from the returned object.
 */

/**
 * Validate personal details.
 * Expected fields: name, email, phone, dob
 */
export const validatePersonal = (data) => {
  const errors = {};
  const required = ['name', 'email', 'phone', 'dob'];
  required.forEach((field) => {
    const value = data?.[field]?.toString().trim() ?? '';
    if (!value) {
      errors[field] = 'Required';
      return;
    }
    if (field === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      errors[field] = 'Invalid email format';
    }
    if (field === 'phone' && !/^\d{10}$/.test(value)) {
      errors[field] = 'Phone must contain exactly 10 digits';
    }
  });
  return errors;
};

/**
 * Validate address details.
 * Expected fields: address, city, state, pincode
 */
export const validateAddress = (data) => {
  const errors = {};
  const required = ['address', 'city', 'state', 'pincode'];
  required.forEach((field) => {
    const value = data?.[field]?.toString().trim() ?? '';
    if (!value) {
      errors[field] = 'Required';
      return;
    }
    if (field === 'pincode' && !/^\d{6}$/.test(value)) {
      errors[field] = 'Pincode must contain exactly 6 digits';
    }
  });
  return errors;
};

/**
 * Validate employment details.
 * Expected fields: department, designation, salary
 */
export const validateEmployment = (data) => {
  const errors = {};
  const required = ['department', 'designation', 'salary'];
  required.forEach((field) => {
    const value = data?.[field];
    if (value === undefined || value === null || value.toString().trim() === '') {
      errors[field] = 'Required';
      return;
    }
    if (field === 'salary') {
      const num = Number(value);
      if (Number.isNaN(num) || num <= 0) {
        errors[field] = 'Salary must be a positive number';
      }
    }
  });
  return errors;
};
