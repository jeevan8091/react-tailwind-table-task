import { createSlice } from '@reduxjs/toolkit';
import { addUser, deleteUser, fetchUsers, updateUser } from '../thunk/userThunk';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.pending, (state) => {
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Failed to add user';
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          String(user.id) === String(action.payload.id) ? action.payload : user,
        );
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Failed to update user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => String(user.id) !== String(action.payload));
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Failed to delete user';
      });
  },
});

export default userSlice.reducer;
