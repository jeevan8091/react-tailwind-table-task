/**
 * Employee Form Validation Utilities
 * Handles validation logic for employee records
 */

export const REQUIRED_FIELDS = ['name', 'mobile', 'dob', 'relation', 'profession'];

/**
 * Validates a single employee row
 * @param {Object} row - Employee row data
 * @returns {Object} Object with field names as keys and boolean as value (true if field is missing)
 */
export const validateEmployeeRow = (row) => {
  const missing = {};

  REQUIRED_FIELDS.forEach((field) => {
    const value = row[field]?.toString().trim() || '';

    if (!value) {
      missing[field] = 'Required';
      return;
    }

    if (field === 'mobile' && !/^\d{10}$/.test(value)) {
      missing[field] = 'Please enter a valid 10-digit mobile number.';
    }
  });

  return missing;
};

/**
 * Validates all employee rows
 * @param {Array} rows - Array of employee rows
 * @returns {Object} Object with row indices as keys and error objects as values
 */
export const validateAllRows = (rows) => {
  const allErrors = {};
  rows.forEach((row, index) => {
    const errors = validateEmployeeRow(row);
    if (Object.keys(errors).length > 0) {
      allErrors[index] = errors;
    }
  });
  return allErrors;
};

/**
 * Check if any validation errors exist
 * @param {Object} errors - Validation errors object
 * @returns {boolean} True if there are errors
 */
export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Convert employee row to user registration object
 * @param {Object} row - Employee row data
 * @returns {Object} User object for registration
 */
export const convertRowToUser = (row) => {
  const username = row.name.toLowerCase().replace(/\s+/g, '.') + Date.now();
  
  return {
    fullName: row.name,
    username: username,
    email: `${username}@employees.local`,
    phone: row.mobile,
    website: '',
    company: `Relation: ${row.relation}`,
    address: `Profession: ${row.profession}`,
  };
};

/**
 * Validate and convert multiple rows to users
 * @param {Array} rows - Array of employee rows
 * @returns {Object} { valid: boolean, users: Array, errors: Object }
 */
export const validateAndConvertRows = (rows) => {
  const errors = validateAllRows(rows);
  
  if (hasValidationErrors(errors)) {
    return {
      valid: false,
      users: [],
      errors,
    };
  }
  
  const users = rows.map(convertRowToUser);
  
  return {
    valid: true,
    users,
    errors: {},
  };
};

/**
 * Get error message for a specific validation scenario
 * @param {string} scenario - The validation scenario
 * @returns {string} Error message
 */
export const getErrorMessage = (scenario) => {
  const messages = {
    INCOMPLETE_ROW: 'Please complete the current employee details before adding a new row.',
    INCOMPLETE_ALL: 'Please complete all employee details before saving.',
    LAST_ROW: 'At least one employee record is required.',
    REGISTRATION_ERROR: 'Error registering employees. Please try again.',
  };
  
  return messages[scenario] || 'An error occurred. Please try again.';
};
