import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import ProjectTable from './ProjectTable';
import ProjectDeleteModal from './ProjectDeleteModal';
import SearchBar from '../components/UserTable/SearchBar';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  viewProject,
} from '../redux/thunk/projectThunk';
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

// Helper for formatting date
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// StatusBadge Component
const StatusBadge = ({ status }) => {
  const styles = {
    'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
    Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Planning: 'bg-blue-50 text-blue-700 border border-blue-200',
    'On Hold': 'bg-rose-50 text-rose-700 border border-rose-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] ?? 'bg-slate-50 text-slate-700 border border-slate-200'
      }`}
    >
      {status}
    </span>
  );
};

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

  // Redux State
  const { projects = [], loading } = useSelector((state) => state.project);

  // Track field errors per row
  const [rowErrors, setRowErrors] = useState({});
  const [rows, setRows] = useState([createProjectRow(1)]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Edit Mode State
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Delete Confirm State
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Pagination State for Project Records Table
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    document.title = 'Projects';
    dispatch(fetchProjects());
  }, [dispatch]);

  // Handle click outside to clear validation errors
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



  const handleDeleteRow = (index) => {
    if (rows.length === 1) {
      toast.error(getErrorMessage('LAST_ROW'), { id: ERROR_TOAST_ID, duration: 4000 });
      return;
    }

    setRows((prev) => {
      const newRows = prev.filter((_, i) => i !== index);
      return newRows.map((row, i) => ({ ...row, sNo: i + 1 }));
    });

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
    let hasUnsavedChanges = false;
    if (editingProjectId) {
      const original = projects.find((p) => p.id === editingProjectId);
      if (original) {
        const current = rows[0];
        hasUnsavedChanges =
          rows.length > 1 ||
          current.name !== (original.name || '') ||
          current.shortCode !== (original.shortCode || '') ||
          current.projectDate !== (original.projectDate || '') ||
          current.status !== (original.status || '');
      }
    } else {
      hasUnsavedChanges =
        rows.length > 1 ||
        rows.some(
          (row) =>
            row.name.trim() !== '' ||
            row.shortCode.trim() !== '' ||
            row.projectDate !== '' ||
            row.status !== ''
        );
    }

    if (hasUnsavedChanges) {
      setShowDiscardConfirm(true);
    } else {
      setRows([createProjectRow(1)]);
      setRowErrors({});
      setEditingProjectId(null);
    }
  };

  const handleDiscardConfirm = () => {
    setRows([createProjectRow(1)]);
    setRowErrors({});
    setEditingProjectId(null);
    setShowDiscardConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      if (editingProjectId) {
        // Edit Mode: Update single project
        const row = rows[0];
        await dispatch(
          updateProject(editingProjectId, {
            name: row.name,
            shortCode: row.shortCode,
            projectDate: row.projectDate,
            status: row.status,
            description: '',
          })
        );
        toast.success('Project updated successfully!');
        setEditingProjectId(null);
      } else {
        // Create Mode: Batch persist
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
      }

      setRows([createProjectRow(1)]);
      dispatch(fetchProjects());
    } catch (err) {
      toast.error(err?.message || 'Failed to save project records. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start Editing Flow
  const handleStartEdit = (project) => {
    setRows([
      {
        sNo: 1,
        name: project.name || '',
        shortCode: project.shortCode || '',
        projectDate: project.projectDate || '',
        status: project.status || '',
      },
    ]);
    setRowErrors({});
    setEditingProjectId(project.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete Confirmation Flow
  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteProject(projectToDelete.id));
      toast.success('Project deleted successfully!');
      setProjectToDelete(null);

      // If the currently edited project was deleted, reset the form
      if (editingProjectId === projectToDelete.id) {
        setEditingProjectId(null);
        setRows([createProjectRow(1)]);
        setRowErrors({});
      }

      dispatch(fetchProjects());
    } catch (err) {
      toast.error(err?.message || 'Failed to delete project.');
    }
  };

  // Pagination Logic for Project Records
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return projects;
    return projects.filter((project) => {
      return (
        (project.name || '').toLowerCase().includes(query) ||
        (project.shortCode || '').toLowerCase().includes(query) ||
        (project.status || '').toLowerCase().includes(query)
      );
    });
  }, [projects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

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
          Fill in project details to register or update project records.
        </p>
      </section>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by project name, short code, status..."
        id="project-search"
      />

      {/* Project Details Form Section */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {editingProjectId ? 'Edit Project' : 'Project Details'}
          </h3>
        </div>

        <ProjectTable
          rows={rows}
          onChange={handleChange}
          onDeleteRow={handleDeleteRow}
          rowErrors={rowErrors}
          editingProjectId={editingProjectId}
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
            {editingProjectId ? 'Update Project' : 'Save Project Records'}
          </button>
        </div>
      </form>

      {/* Project Records Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Project Records</h3>
        </div>

        <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr className="text-[12px] uppercase tracking-wide text-slate-600">
                <th className="px-5 py-3 text-left font-semibold">S.No</th>
                <th className="px-5 py-3 text-left font-semibold">Project Name</th>
                <th className="px-5 py-3 text-left font-semibold">Project Short Code</th>
                <th className="px-5 py-3 text-left font-semibold">Project Date</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm font-semibold text-slate-400">
                    No project records registered yet.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project, idx) => {
                  const sNo = idx + 1 + (currentPage - 1) * itemsPerPage;
                  return (
                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{sNo}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-800">{project.name}</td>
                      <td className="px-5 py-4">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-600">
                          {project.shortCode}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {formatDate(project.projectDate)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(project)}
                            title="Edit"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectToDelete(project)}
                            title="Delete"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition-colors duration-200 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination and Count */}
        {filteredProjects.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-150 px-5 py-4 sm:flex-row sm:items-center sm:justify-between mt-2">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filteredProjects.length > 0 ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredProjects.length) : 0}</span> to{' '}
              <span className="font-semibold text-slate-600">{Math.min(currentPage * itemsPerPage, filteredProjects.length)}</span> of{' '}
              <span className="font-semibold text-slate-600">{filteredProjects.length}</span> projects
            </p>
            {totalPages > 1 && (
              <nav className="flex items-center gap-1 self-center sm:self-auto" aria-label="Pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition-all duration-150 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        )}
      </div>

      <DiscardConfirmModal
        isOpen={showDiscardConfirm}
        onCancel={() => setShowDiscardConfirm(false)}
        onConfirm={handleDiscardConfirm}
      />

      {projectToDelete && (
        <ProjectDeleteModal
          project={projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Projects;
