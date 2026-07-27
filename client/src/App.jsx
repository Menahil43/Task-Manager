import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';
import taskService from './services/api';

/**
 * Main App component
 * Manages the global state for tasks, loading, and notifications
 */
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks on component mount
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      showNotification(
        'error',
        error.response?.data?.message || 'Failed to fetch tasks'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Show a notification message
   * @param {'success' | 'error'} type - Notification type
   * @param {string} message - Notification message
   */
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  /**
   * Create a new task
   * @param {Object} taskData - Task data from form
   */
  const handleCreateTask = async (taskData) => {
    try {
      setSubmitting(true);
      const response = await taskService.createTask(taskData);
      setTasks((prev) => [response.data, ...prev]);
      showNotification('success', 'Task created successfully!');
      return true;
    } catch (error) {
      showNotification(
        'error',
        error.response?.data?.message || 'Failed to create task'
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   */
  const handleUpdateTask = async (id, taskData) => {
    try {
      setSubmitting(true);
      const response = await taskService.updateTask(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
      setEditingTask(null);
      showNotification('success', 'Task updated successfully!');
      return true;
    } catch (error) {
      showNotification(
        'error',
        error.response?.data?.message || 'Failed to update task'
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Delete a task after user confirmation
   * @param {string} id - Task ID to delete
   */
  const handleDeleteTask = async (id) => {
    try {
      setSubmitting(true);
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
      showNotification('success', 'Task deleted successfully!');
    } catch (error) {
      showNotification(
        'error',
        error.response?.data?.message || 'Failed to delete task'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Set the task being edited
   * @param {Object|null} task - Task to edit or null to cancel
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <span className="header-icon">📋</span> Task Manager
        </h1>
        <p className="app-subtitle">
          Organize your tasks with ease — Create, Read, Update, Delete
        </p>
      </header>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="app-main">
        <section className="form-section">
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
            submitting={submitting}
          />
        </section>

        <section className="list-section">
          {loading ? (
            <div className="loading-container">
              <LoadingSpinner />
              <p>Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              submitting={submitting}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;

