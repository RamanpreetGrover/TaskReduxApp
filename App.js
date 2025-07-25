import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import TaskScreen from './src/screens/taskScreen';

export default function App() {
  return (
    <Provider store={store}>
      <TaskScreen />
    </Provider>
  );
}
