import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/taskSlice';

// Set up the Redux store with the task reducer
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
