import projectService from '../services/projectService';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const data = await projectService.fetchProjects();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch projects');
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const data = await projectService.createProject(projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create project');
    }
  }
);

// Update an existing project
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const data = await projectService.updateProject(projectId, projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update project');
    }
  }
);

// Delete a project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      await projectService.deleteProject(projectId);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete project');
    }
  }
);

// View a single project
export const viewProject = createAsyncThunk(
  'projects/viewProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await projectService.fetchProjects(); // fallback to fetching all
      const project = data.find((p) => p.id === Number(projectId));
      return project;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to view project details');
    }
  }
);
