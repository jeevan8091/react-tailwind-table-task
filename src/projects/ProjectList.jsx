import { useEffect, useState, useMemo } from 'react';
import SearchBar from '../components/UserTable/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import ProjectDeleteModal from './ProjectDeleteModal';
import { fetchProjects, deleteProject } from '../redux/thunk/projectThunk';

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects = [] } = useSelector((state) => state.project);

  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Filtering & Pagination
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return projects;
    return projects.filter((project) =>
      (project.name || '').toLowerCase().includes(query) ||
      (project.shortCode || '').toLowerCase().includes(query) ||
      (project.status || '').toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteProject(projectToDelete.id));
      toast.success('Project deleted successfully!');
      setProjectToDelete(null);
      dispatch(fetchProjects());
    } catch (err) {
      toast.error(err?.message || 'Failed to delete project.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">Projects</p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">Projects Module</h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Manage your project records – view, edit, add or delete.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by project name, short code, status..."
          id="project-search"
        />
        <button
          onClick={() => navigate('/projects/add')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Project
        </button>
      </div>

      {/* Project Table */}
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
                <td colSpan={6} className="px-5 py-8 text-center text-slate-500 italic">
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
                      {new Date(project.projectDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${(() => {
                        const statusClasses = {
                          'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
                          'Completed': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                          'Planning': 'bg-blue-50 text-blue-700 border border-blue-200',
                          'On Hold': 'bg-rose-50 text-rose-700 border border-rose-200',
                        };
                        return statusClasses[project.status] ?? 'bg-slate-50 text-slate-700 border border-slate-200';
                      })()}`}> 
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/projects/edit/${project.id}`)}
                          title="Edit"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => setProjectToDelete(project)}
                          title="Delete"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
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

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-slate-150 px-5 py-4 sm:flex-row sm:items-center sm:justify-between mt-2">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600">{filteredProjects.length > 0 ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredProjects.length) : 0}</span> to <span className="font-semibold text-slate-600">{Math.min(currentPage * itemsPerPage, filteredProjects.length)}</span> of <span className="font-semibold text-slate-600">{filteredProjects.length}</span> projects
          </p>
          {totalPages > 1 && (
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold ${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
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

export default ProjectList;
