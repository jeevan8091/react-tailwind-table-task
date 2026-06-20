import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../reducer/projectReducer';
import authReducer from '../reducer/authReducer';
import userReducer from '../reducer/userReducer';
import { loadState, saveState } from '../localStorage';

// Load persisted state from localStorage if available
const persistedState = loadState();

// Configure the Redux store using Redux Toolkit's configureStore, which includes thunk middleware by default.
const store = configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
    users: userReducer,
  },
  // Preloaded state ensures Redux initializes with persisted data
  preloadedState: persistedState,
});

// Subscribe to store updates and persist the entire Redux state to localStorage
store.subscribe(() => {
  saveState({ project: store.getState().project, users: store.getState().users });
});

export default store;
