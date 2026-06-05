import { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import EmployeeTable from './EmployeeTable';
import {
  validateEmployeeRow,
  validateAllRows,
  convertRowToUser,
  getErrorMessage,
} from './EmployeeValidation';

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
  const { employeeRecords, saveEmployeeRecord } = useUsers();
  // React Hook Form setup is intentionally preserved elsewhere in the app.

  // Alert message state for validation failures
  const [alertMessage, setAlertMessage] = useState('');

  // Track field errors per row (e.g., {0: {name:true, mobile:true}})
  const [rowErrors, setRowErrors] = useState({});

  // Delete row handler
  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      setAlertMessage(getErrorMessage('LAST_ROW'));
      return;
    }
    // Clear any alert
    setAlertMessage('');
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

  const handleChange = (index, name, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [name]: value } : row))
    );
  };

  const handleAddRow = async (index) => {
    const currentRow = rows[index];

    // Validate current row
    const missing = validateEmployeeRow(currentRow);

    if (Object.keys(missing).length > 0) {
      setAlertMessage(getErrorMessage('INCOMPLETE_ROW'));
      setRowErrors((prev) => ({ ...prev, [index]: missing }));
      return;
    }

    // Clear previous errors
    setAlertMessage('');
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
      setAlertMessage(getErrorMessage('INCOMPLETE_ALL'));
      setRowErrors(allErrors);
      return;
    }

    // Clear any previous errors
    setAlertMessage('');
    setRowErrors({});

    // Register all employees
    try {
      rows.forEach((row) => {
        const userRecord = convertRowToUser(row);
        saveEmployeeRecord(userRecord);
      });

      // Show success feedback and reset
      setAlertMessage('Employee record saved successfully.');
      setRows([
        {
          sNo: 1,
          name: '',
          mobile: '',
          dob: '',
          relation: '',
          profession: '',
          emergency: false,
        },
      ]);

      alert(`Successfully registered ${rows.length} employee(s)!`);
    } catch (error) {
      setAlertMessage(getErrorMessage('REGISTRATION_ERROR'));
      console.error('Registration error:', error);
    }
  };

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
      

        {/* Alert for validation */}
        {alertMessage && (
          <div className="mb-4 rounded bg-yellow-100 border-l-4 border-yellow-500 p-4 text-yellow-700">
            {alertMessage}
          </div>
        )}

        <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={handleSubmit}>
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

          {/* Save Button */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
              Save Employee Records
            </button>
          </div>
        </form>
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Employee Records</p>
        <h3 className="mt-2 text-[30px] font-bold text-slate-800">{employeeRecords.length}</h3>
        <p className="mt-2 text-sm font-medium text-slate-500">Local employee records saved during this session.</p>

        <div className="mt-5 space-y-3">
          {employeeRecords.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">No local employee records saved yet.</p>
          ) : (
            employeeRecords.slice(-4).reverse().map((user) => (
              <div key={user.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs font-semibold text-slate-500">Employee record added</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

export default EmployeeForm;
