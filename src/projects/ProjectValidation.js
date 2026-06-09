/**
 * Project Form Validation Utilities
 * Handles validation logic for project records
 */

export const REQUIRED_FIELDS = ['name', 'shortCode', 'projectDate', 'status'];

/**
 * Validates a single project row
 * @param {Object} row - Project row data
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateProjectRow = (row) => {
  const missing = {};

  REQUIRED_FIELDS.forEach((field) => {
    const value = row[field]?.toString().trim() || '';

    if (!value) {
      missing[field] = 'Required';
      return;
    }
  });

  return missing;
};

/**
 * Validates all project rows
 * @param {Array} rows - Array of project rows
 * @returns {Object} Object with row indices as keys and error objects as values
 */
export const validateAllRows = (rows) => {
  const allErrors = {};
  rows.forEach((row, index) => {
    const errors = validateProjectRow(row);
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
 * Get error message for a specific validation scenario
 * @param {string} scenario - The validation scenario
 * @returns {string} Error message
 */
export const getErrorMessage = (scenario) => {
  const messages = {
    INCOMPLETE_ROW: 'Please complete the current project details before adding a new row.',
    INCOMPLETE_ALL: 'Please complete all project details before saving.',
    LAST_ROW: 'At least one project record is required.',
  };
  
  return messages[scenario] || 'An error occurred. Please try again.';
};
