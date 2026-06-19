import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchAdminInfo, logoutUser } from '../thunk/authThunk';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
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
