import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../reducer/projectReducer';
import { loadState, saveState } from '../localStorage';

// Load persisted state from localStorage if available
const persistedState = loadState();

// Configure the Redux store using Redux Toolkit's configureStore, which includes thunk middleware by default.
const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  // Preloaded state ensures Redux initializes with persisted data
  preloadedState: persistedState,
});

// Subscribe to store updates and persist the entire Redux state to localStorage
store.subscribe(() => {
  saveState({ project: store.getState().project });
});

export default store;