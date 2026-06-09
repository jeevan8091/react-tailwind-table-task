import projectService from '../services/projectService';
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  VIEW_PROJECT_REQUEST,
  VIEW_PROJECT_SUCCESS,
  VIEW_PROJECT_FAILURE,
} from '../reducer/projectReducer';

// Async Thunks
export const fetchProjects = () => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
    const data = await projectService.fetchProjects();
    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      payload: error.message || 'Failed to fetch projects',
    });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const data = await projectService.createProject(projectData);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.message || 'Failed to create project',
    });
    throw error;
  }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROJECT_REQUEST });
  try {
    const data = await projectService.updateProject(projectId, projectData);
    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: error.message || 'Failed to update project',
    });
    throw error;
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    await projectService.deleteProject(projectId);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    return projectId;
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: error.message || 'Failed to delete project',
    });
    throw error;
  }
};

export const viewProject = (projectId) => async (dispatch) => {
  dispatch({ type: VIEW_PROJECT_REQUEST });
  try {
    const data = await projectService.fetchProjects(); // or retrieve by ID if service supports it
    const project = data.find((p) => p.id === Number(projectId));
    dispatch({ type: VIEW_PROJECT_SUCCESS, payload: project });
    return project;
  } catch (error) {
    dispatch({
      type: VIEW_PROJECT_FAILURE,
      payload: error.message || 'Failed to view project details',
    });
    throw error;
  }
};

