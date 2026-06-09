import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import projectReducer from './reducer/projectReducer';

const rootReducer = combineReducers({
  project: projectReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
