import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Login User Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.loginUserService(credentials);
      // The API response could be { token: '...' } or similar
      const token = data.token || data;
      if (!token) {
        throw new Error('No token received from login API');
      }
      localStorage.setItem('token', token);
      
      // After login success, we fetch the admin info automatically
      await dispatch(fetchAdminInfo(token));
      
      return token;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Fetch Admin Info Thunk
export const fetchAdminInfo = createAsyncThunk(
  'auth/fetchAdminInfo',
  async (argToken, { getState, rejectWithValue }) => {
    try {
      // Read token from parameter, or state, or localStorage
      const token = argToken || getState().auth?.token || localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const userData = await authService.getAdminInfoService(token);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admin info');
    }
  }
);

// Logout User Thunk
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to logout');
    }
  }
);

// Initialize Authentication Thunk (Session Restore)
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await dispatch(fetchAdminInfo(token)).unwrap();
        return token;
      }
      return null;
    } catch (error) {
      // Return reject value but it's handled gracefully (token will be cleared by fetchAdminInfo.rejected)
      return rejectWithValue(error.message || 'Session restoration failed');
    }
  }
);
