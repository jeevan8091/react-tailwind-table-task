import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProjectForm from './ProjectForm';
import { updateProject, fetchProjects } from '../redux/thunk/projectThunk';

const EditProject = () => {
  const { id } = useParams();
  console.log('EditProject route param id:', id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects = [], loading } = useSelector((state) => state.project);
  console.log('EditProject projects from Redux:', projects);
  console.log('EditProject projects count:', projects.length);
  console.log('EditProject loading state:', loading);
  const project = projects.find((p) => String(p.id) === String(id));
  console.log('EditProject located project:', project);

  useEffect(() => {
    // Fetch projects if not already loaded
    if (!project && !loading) {
      dispatch(fetchProjects());
    }
  }, [dispatch, project, loading]);

  const handleCancel = () => {
    // Optionally reset handled by component unmounting
    navigate('/projects');
  };

  // Submit handler for updating the project
  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateProject({
          projectId: id,
          projectData: {
            name: data.name,
            shortCode: data.shortCode,
            projectDate: data.projectDate,
            status: data.status,

          },
        })
      );
      toast.success('Project updated successfully!');
      // Refresh the project list
      dispatch(fetchProjects());
      navigate('/projects');
    } catch (err) {
      toast.error(err?.message || 'Failed to update project.');
    }
  };

  // Loading or not found handling
  if (!project) {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm text-gray-500">Loading project data...</p>
        </div>
      );
    }
    // Not loading and project missing – show professional empty state
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-sm text-red-500">Project not found.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  // Pass project as "project" prop to ProjectForm (expects "project" prop)
  return (
    <ProjectForm
      mode="edit"
      project={project}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={false}
    />
  );
};

export default EditProject;
