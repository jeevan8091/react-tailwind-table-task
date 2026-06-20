import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchAdminInfo, logoutUser, initializeAuth } from '../thunk/authThunk';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message || 'Login failed';
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    });

      // initializeAuth
      builder.addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.token = action.payload;
          state.isAuthenticated = true;
        } else {
          state.token = null;
          state.isAuthenticated = false;
        }
        state.error = null;
      });
      builder.addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message || 'Session restoration failed';
        localStorage.removeItem('token');
      });

    // fetchAdminInfo
    builder.addCase(fetchAdminInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.token = state.token || localStorage.getItem('token');
      state.error = null;
    });
    builder.addCase(fetchAdminInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message || 'Failed to fetch user session';
      // Auto Logout on Invalid/Expired Token
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    });

    // logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    });
  },
});

export default authSlice.reducer;
