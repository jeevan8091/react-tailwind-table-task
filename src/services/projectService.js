import projectApi from '../api/projectApi';

const projectService = {
  fetchProjects: async () => {
    return await projectApi.getProjects();
  },
  createProject: async (projectData) => {
    return await projectApi.createProject(projectData);
  },
  updateProject: async (projectId, projectData) => {
    return await projectApi.updateProject(projectId, projectData);
  },
  deleteProject: async (projectId) => {
    return await projectApi.deleteProject(projectId);
  },
};

export default projectService;
