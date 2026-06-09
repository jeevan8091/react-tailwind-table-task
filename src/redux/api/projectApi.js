const STORAGE_KEY = 'workforce_projects_v2';

const initialMockProjects = [];

const getStoredProjects = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockProjects));
    return initialMockProjects;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return initialMockProjects;
  }
};

const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const projectApi = {
  getProjects: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getStoredProjects();
  },

  createProject: async (projectData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const projects = getStoredProjects();
    const newProject = {
      ...projectData,
      id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
    };
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
  },

  updateProject: async (projectId, projectData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const projects = getStoredProjects();
    const index = projects.findIndex((p) => p.id === Number(projectId));
    if (index === -1) {
      throw new Error(`Project with ID ${projectId} not found`);
    }
    const updatedProject = { ...projects[index], ...projectData };
    projects[index] = updatedProject;
    saveProjects(projects);
    return updatedProject;
  },

  deleteProject: async (projectId) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const projects = getStoredProjects();
    const filtered = projects.filter((p) => p.id !== Number(projectId));
    saveProjects(filtered);
    return true;
  },
};

export default projectApi;
