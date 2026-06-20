import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const extractToken = (data) =>
  data?.token ||
  data?.data?.token ||
  data?.access ||
  data?.accessToken ||
  data?.key ||
  (typeof data === 'string' ? data : null);

const normalizeAdminInfo = (data) => {
  const source = data?.data?.user || data?.data?.admin || data?.data || data?.user || data?.admin || data?.profile || data;
  const firstName = source?.firstName || source?.first_name || source?.firstname || '';
  const lastName = source?.lastName || source?.last_name || source?.lastname || '';
  const name = source?.name || source?.fullName || source?.full_name || `${firstName} ${lastName}`.trim();

  return {
    ...source,
    firstName,
    lastName,
    name,
    email: source?.email || source?.mail || source?.username || '',
    phone: source?.phone || source?.mobile || source?.mobile_number || source?.phone_number || '',
    role: source?.role || source?.user_role || source?.userType || source?.type || '',
    employeeCode: source?.employeeCode || source?.employee_code || source?.emp_code || source?.code || '',
    lastLogin: source?.lastLogin || source?.last_login || source?.last_login_at || source?.lastLoginAt || '',
  };
};

// Login User Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.loginUserService({ username, password });
      const token = extractToken(data);
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
  async (argToken, { dispatch, getState, rejectWithValue }) => {
    try {
      // Read token from parameter, or state, or localStorage
      const token = argToken || getState().auth?.token || localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const userData = await authService.getAdminInfoService(token);
      return normalizeAdminInfo(userData);
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
      localStorage.removeItem('role');
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
