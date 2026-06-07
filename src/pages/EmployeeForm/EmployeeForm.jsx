import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EmployeeTable from './EmployeeTable';
import {
  validateEmployeeRow,
  validateAllRows,
  getErrorMessage,
} from './EmployeeValidation';

const ERROR_TOAST_ID = 'employee-validation-error';

const createEmployeeRow = (sNo) => ({
  sNo,
  name: '',
  mobile: '',
  dob: '',
  relation: '',
  profession: '',
  emergency: false,
});


const EmployeeForm = () => {
  // React Hook Form setup is intentionally preserved elsewhere in the app.

  // Track field errors per row (e.g., {0: {name:true, mobile:true}})
  const [rowErrors, setRowErrors] = useState({});
  // Track which rows have validation triggered by action (Add Row / Submit)
  const [validatedRows, setValidatedRows] = useState({});
  const formRef = useRef(null);

  // Delete row handler
  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      toast.error(getErrorMessage('LAST_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      return;
    }
    // Remove the row and re-index
    setRows((prev) => {
      const newRows = prev.filter((_, i) => i !== index);
      return newRows.map((row, i) => ({ ...row, sNo: i + 1 }));
    });
    // Remove related errors
    setRowErrors((prev) => {
      const rest = Object.fromEntries(Object.entries(prev).filter(([key]) => Number(key) !== index));
      const shifted = {};
      Object.entries(rest).forEach(([key, val]) => {
        const k = Number(key);
        shifted[k > index ? k - 1 : k] = val;
      });
      return shifted;
    });
  };





  useEffect(() => {
    document.title = 'Employee Form';
  }, []);



  const [rows, setRows] = useState([createEmployeeRow(1)]);

  const isMobileValid = (value) => /^\d{10}$/.test(value?.toString().trim() || '');

  const normalizeValue = (name, value) => {
    if (name === 'mobile') {
      return value.toString().replace(/\D/g, '').slice(0, 10);
    }
    return value;
  };

  const handleChange = (index, name, value) => {
    const normalizedValue = normalizeValue(name, value);

    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [name]: normalizedValue } : row))
    );

    setRowErrors((prev) => {
      const rowError = prev[index];
      if (!rowError || !rowError[name]) {
        return prev;
      }

      const isValueValid =
        name === 'mobile'
          ? isMobileValid(normalizedValue)
          : normalizedValue?.toString().trim() !== '';

      if (!isValueValid) {
        return prev;
      }

      const nextRowError = { ...rowError };
      delete nextRowError[name];

      const nextErrors = { ...prev };
      if (Object.keys(nextRowError).length === 0) {
        delete nextErrors[index];
      } else {
        nextErrors[index] = nextRowError;
      }

      return nextErrors;
    });
  };

  

  const handleAddRow = async (index) => {
    const currentRow = rows[index];

    // Validate current row
    const missing = validateEmployeeRow(currentRow);

    if (Object.keys(missing).length > 0) {
      // mark this row as validated so user sees inline messages
      setValidatedRows((p) => ({ ...p, [index]: true }));
      toast.error(getErrorMessage('INCOMPLETE_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      setRowErrors((prev) => ({ ...prev, [index]: missing }));
      return;
    }

    setRowErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[index];
      return nextErrors;
    });

    // Add new row
    setRows((prev) => {
      const insertIdx = typeof index === 'number' ? index + 1 : prev.length;
      const newRows = [...prev];
      newRows.splice(insertIdx, 0, createEmployeeRow(0));
      return newRows.map((row, i) => ({ ...row, sNo: i + 1 }));
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all rows
    const allErrors = validateAllRows(rows);

    if (Object.keys(allErrors).length > 0) {
      // mark rows that failed as validated so inline messages appear
      const marked = {};
      Object.keys(allErrors).forEach((k) => (marked[k] = true));
      setValidatedRows((p) => ({ ...p, ...marked }));
      toast.error('Please complete all required employee details before saving.', {
        id: ERROR_TOAST_ID,
        duration: 4000,
      });
      setRowErrors(allErrors);
      return;
    }

    setRowErrors({});
    setValidatedRows({});
  };

  // Clear validation messages when user clicks outside the form
  useEffect(() => {
    const onClick = (e) => {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target)) {
        setRowErrors({});
        setValidatedRows({});
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Employee Form
        </p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">
          Employee Form
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Fill in employee details for the current admin session.
        </p>
      

        <form ref={formRef} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={handleSubmit}>
          {/* Header with Add Row (plus) icon */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Employee Details</h3>
            <button type="button" className="flex items-center text-blue-600 hover:text-blue-800" onClick={() => handleAddRow(0)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Row
            </button>
          </div>
          <EmployeeTable rows={rows} onChange={handleChange} onAddRow={handleAddRow} onDeleteRow={handleDeleteRow} rowErrors={rowErrors} />
        </form>
      </section>

    </div>
  );
};

export default EmployeeForm;
