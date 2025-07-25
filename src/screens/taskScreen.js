import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTask, deleteTask } from '../slices/taskSlice';

const TaskScreen = () => {
  const [taskInput, setTaskInput] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // When "Add" button is pressed
  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch(addTask(taskInput));  // Add the task to Redux store
      setTaskInput('');              // Clear input box
    }
  };

  // Show confirmation alert before deleting task
  const handleDeleteTask = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTask(id)) }
    ]);
  };

  // Each task row (tap to toggle, long press to delete)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => dispatch(toggleTask(item.id))}
      onLongPress={() => handleDeleteTask(item.id)}
    >
      <Text style={[styles.taskText, item.completed && styles.completed]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* App title */}
      <Text style={styles.heading}>My Tasks</Text>

      {/* Input row: new task entry + button */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={taskInput}
          placeholder="Enter a new task"
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Helper text for long press instruction */}
      <Text style={styles.hintText}>Long press a task to delete it.</Text>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet.</Text>}
      />
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hintText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
    fontSize: 14,
  },
  taskItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default TaskScreen;
