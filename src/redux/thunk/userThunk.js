import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchUsersService();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  },
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.addUserService(userData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add user');
    }
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser, { rejectWithValue }) => {
    try {
      return await userService.updateUserService(updatedUser);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user');
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.deleteUserService(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete user');
    }
  },
);
