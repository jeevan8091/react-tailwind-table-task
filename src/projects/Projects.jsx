import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import ProjectTable from './ProjectTable';
import { createProject } from '../thunk/projectThunk';
import {
  validateProjectRow,
  validateAllRows,
  getErrorMessage,
} from './ProjectValidation';

const ERROR_TOAST_ID = 'project-validation-error';

const createProjectRow = (sNo) => ({
  sNo,
  name: '',
  shortCode: '',
  projectDate: '',
  status: '',
});

// Discard Confirmation Modal Component
const DiscardConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20 animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-600 animate-bounce">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-[20px] font-semibold text-slate-800">Discard Changes?</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Discard all unsaved project changes?
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-100 w-full sm:w-auto"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  // Track field errors per row (e.g., {0: {name: 'Required', shortCode: 'Required'}})
  const [rowErrors, setRowErrors] = useState({});
  const [rows, setRows] = useState([createProjectRow(1)]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  useEffect(() => {
    document.title = 'Projects';
  }, []);

  // Handle click outside to clear validation errors, matching Employee Form behavior
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

  const handleChange = (index, name, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [name]: value } : row))
    );

    setRowErrors((prev) => {
      const rowError = prev[index];
      if (!rowError || !rowError[name]) {
        return prev;
      }

      const isValueValid = value?.toString().trim() !== '';

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

  const handleAddRow = () => {
    const lastIndex = rows.length - 1;
    const lastRow = rows[lastIndex];

    // Validate the current last row before adding a new one
    const missing = validateProjectRow(lastRow);

    if (Object.keys(missing).length > 0) {
      toast.error(getErrorMessage('INCOMPLETE_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      setRowErrors((prev) => ({ ...prev, [lastIndex]: missing }));
      return;
    }

    setRowErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[lastIndex];
      return nextErrors;
    });

    setRows((prev) => [
      ...prev,
      createProjectRow(prev.length + 1)
    ]);
  };

  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      toast.error(getErrorMessage('LAST_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      return;
    }

    // Remove the row and re-index S.No
    setRows((prev) => {
      const newRows = prev.filter((_, i) => i !== index);
      return newRows.map((row, i) => ({ ...row, sNo: i + 1 }));
    });

    // Shift validation errors
    setRowErrors((prev) => {
      const rest = Object.fromEntries(
        Object.entries(prev).filter(([key]) => Number(key) !== index)
      );
      const shifted = {};
      Object.entries(rest).forEach(([key, val]) => {
        const k = Number(key);
        shifted[k > index ? k - 1 : k] = val;
      });
      return shifted;
    });
  };

  const handleDiscardClick = () => {
    const hasUnsavedChanges =
      rows.length > 1 ||
      rows.some(
        (row) =>
          row.name.trim() !== '' ||
          row.shortCode.trim() !== '' ||
          row.projectDate !== '' ||
          row.status !== ''
      );

    if (hasUnsavedChanges) {
      setShowDiscardConfirm(true);
    } else {
      setRows([createProjectRow(1)]);
      setRowErrors({});
    }
  };

  const handleDiscardConfirm = () => {
    setRows([createProjectRow(1)]);
    setRowErrors({});
    setShowDiscardConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all rows
    const allErrors = validateAllRows(rows);

    if (Object.keys(allErrors).length > 0) {
      toast.error(getErrorMessage('INCOMPLETE_ALL'), {
        id: ERROR_TOAST_ID,
        duration: 4000,
      });
      setRowErrors(allErrors);
      return;
    }

    setRowErrors({});
    setIsSubmitting(true);

    try {
      // Dispatch thunks to persist all entered projects
      await Promise.all(
        rows.map((row) =>
          dispatch(
            createProject({
              name: row.name,
              shortCode: row.shortCode,
              projectDate: row.projectDate,
              status: row.status,
              description: '',
            })
          )
        )
      );

      toast.success('Project records saved successfully!');
      // Reset form to a single empty row
      setRows([createProjectRow(1)]);
    } catch (err) {
      toast.error(err?.message || 'Failed to save project records. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Projects
        </p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">
          Projects Module
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Fill in project details to register new project records.
        </p>
      </section>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Project Details</h3>
          <button
            type="button"
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-150"
            onClick={handleAddRow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Row
          </button>
        </div>

        <ProjectTable
          rows={rows}
          onChange={handleChange}
          onAddRow={handleAddRow}
          onDeleteRow={handleDeleteRow}
          rowErrors={rowErrors}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleDiscardClick}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors duration-200"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 disabled:opacity-60 transition-colors duration-200"
          >
            {isSubmitting && (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            Save Project Records
          </button>
        </div>
      </form>

      <DiscardConfirmModal
        isOpen={showDiscardConfirm}
        onCancel={() => setShowDiscardConfirm(false)}
        onConfirm={handleDiscardConfirm}
      />
    </div>
  );
};

export default Projects;
