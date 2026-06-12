import { useEffect, useRef, useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import EmployeeTable from './EmployeeTable';
import PersonalDetails from './PersonalDetails';
import SearchBar from '../../components/UserTable/SearchBar';
import { useUsers } from '../../hooks/useUsers';
import {
  validateEmployeeRow,
  getErrorMessage,
  convertRowToUser,
} from './EmployeeValidation';
import { validatePersonal } from './Validation';

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
  const { saveEmployeeRecord } = useUsers();
  const [step, setStep] = useState(1); // 1: Personal Details, 2: Employee Table form
  const [rowErrors, setRowErrors] = useState({});
  const [wizardData, setWizardData] = useState({ name: '', email: '', phone: '', dob: '' });
  const [formErrors, setFormErrors] = useState({});
  const [rows, setRows] = useState([createEmployeeRow(1)]);
  const [searchQuery, setSearchQuery] = useState('');
  const formRef = useRef(null);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setWizardData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleNext = () => {
    const errors = validatePersonal(wizardData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleDeleteRow = (sNo) => {
    if (rows.length === 1) {
      toast.error(getErrorMessage('LAST_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      return;
    }
    
    setRows((prev) => {
      const newRows = prev.filter((row) => row.sNo !== sNo);
      const updatedRows = newRows.map((row, i) => ({ ...row, sNo: i + 1 }));
      
      // Update errors mapping to match new sNo values
      setRowErrors((prevErrors) => {
        const nextErrors = {};
        updatedRows.forEach((row, i) => {
          const oldRow = newRows[i];
          if (prevErrors[oldRow.sNo]) {
            nextErrors[row.sNo] = prevErrors[oldRow.sNo];
          }
        });
        return nextErrors;
      });
      
      return updatedRows;
    });
  };

  useEffect(() => {
    document.title = 'Employee Form';
  }, []);

  const isMobileValid = (value) => /^\d{10}$/.test(value?.toString().trim() || '');

  const normalizeValue = (name, value) => {
    if (name === 'mobile') {
      return value.toString().replace(/\D/g, '').slice(0, 10);
    }
    return value;
  };

  const handleChange = (sNo, name, value) => {
    const normalizedValue = normalizeValue(name, value);

    setRows((prev) =>
      prev.map((row) => (row.sNo === sNo ? { ...row, [name]: normalizedValue } : row))
    );

    setRowErrors((prev) => {
      const rowError = prev[sNo];
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
        delete nextErrors[sNo];
      } else {
        nextErrors[sNo] = nextRowError;
      }

      return nextErrors;
    });
  };

  const handleAddRow = async (sNo) => {
    const currentRowIndex = rows.findIndex((r) => r.sNo === sNo);
    const currentRow = rows[currentRowIndex];

    // Validate current row
    const missing = validateEmployeeRow(currentRow);

    if (Object.keys(missing).length > 0) {
      toast.error(getErrorMessage('INCOMPLETE_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      setRowErrors((prev) => ({ ...prev, [sNo]: missing }));
      return;
    }

    setRowErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[sNo];
      return nextErrors;
    });

    // Add new row
    setRows((prev) => {
      const insertIdx = currentRowIndex + 1;
      const newRows = [...prev];
      newRows.splice(insertIdx, 0, createEmployeeRow(0));
      const updatedRows = newRows.map((row, i) => ({ ...row, sNo: i + 1 }));

      // Shift errors to match new sNos
      setRowErrors((prevErrors) => {
        const nextErrors = {};
        updatedRows.forEach((row, i) => {
          if (row.sNo === insertIdx + 1) return;
          const originalRow = i < insertIdx ? prev[i] : prev[i - 1];
          if (prevErrors[originalRow.sNo]) {
            nextErrors[row.sNo] = prevErrors[originalRow.sNo];
          }
        });
        return nextErrors;
      });

      return updatedRows;
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all rows
    const allErrors = {};
    rows.forEach((row) => {
      const errors = validateEmployeeRow(row);
      if (Object.keys(errors).length > 0) {
        allErrors[row.sNo] = errors;
      }
    });

    if (Object.keys(allErrors).length > 0) {
      toast.error('Please complete all required employee details before saving.', {
        id: ERROR_TOAST_ID,
        duration: 4000,
      });
      setRowErrors(allErrors);
      return;
    }

    setRowErrors({});

    // Register all employees to the Context state
    try {
      rows.forEach((row) => {
        const userRecord = convertRowToUser(row);
        saveEmployeeRecord(userRecord);
      });

      toast.success(`Successfully saved ${rows.length} employee record(s)!`);
      setRows([createEmployeeRow(1)]);
      setSearchQuery('');
    } catch (error) {
      toast.error('Error saving employee records.');
    }
  };

  // Clear validation messages when user clicks outside the form
  useEffect(() => {
    const onClick = (e) => {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target)) {
        setRowErrors({});
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return rows;
    return rows.filter((row) => {
      return (
        (row.name || '').toLowerCase().includes(q) ||
        (row.mobile || '').includes(q) ||
        (row.profession || '').toLowerCase().includes(q)
      );
    });
  }, [rows, searchQuery]);

  return (
    <div className="space-y-8">
      {step === 1 ? (
          <PersonalDetails formData={wizardData} handleChange={handlePersonalChange} errors={formErrors} onNext={handleNext} />
      ) : (
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

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by employee name, mobile number, profession..."
            id="employee-search"
          />

          <section>
            <form ref={formRef} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={handleSubmit}>
              {/* Header with Add Row (plus) icon */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Employee Details</h3>
                <button type="button" className="flex items-center text-blue-600 hover:text-blue-800" onClick={() => handleAddRow(rows[rows.length - 1].sNo)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Row
                </button>
              </div>
              <EmployeeTable rows={filteredRows} onChange={handleChange} onAddRow={handleAddRow} onDeleteRow={handleDeleteRow} rowErrors={rowErrors} />

              {/* Save Button */}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Employee Records
                </button>
              </div>
            </form>
          </section>
        </section>
      )}
    </div>
  );
};

export default EmployeeForm;
