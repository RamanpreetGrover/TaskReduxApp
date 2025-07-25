import { createSlice } from '@reduxjs/toolkit';

/*
  Redux slice for managing tasks.
  Includes: addTask, toggleTask (complete/incomplete), and deleteTask.
*/

const taskSlice = createSlice({
  name: 'tasks',            // Slice name
  initialState: [],         // Initial empty array of tasks

  reducers: {
    // Action to add a new task
    addTask: {
      // Reducer logic for adding task to state
      reducer: (state, action) => {
        state.push(action.payload); // Add the task object to the array
      },
      // Prepares the payload with a unique ID and default values
      prepare: (title) => {
        return {
          payload: {
            id: Date.now().toString(), // Unique task ID based on timestamp
            title,                     // Task title passed in
            completed: false           // Default to not completed
          }
        };
      }
    },

    // Action to toggle completion status (done/undone)
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed; // Flip the completed status
      }
    },

    // Action to delete a task by ID
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    }
  }
});

// Export individual actions for use in components
export const { addTask, toggleTask, deleteTask } = taskSlice.actions;

// Export the reducer to be added to the Redux store
export default taskSlice.reducer;
