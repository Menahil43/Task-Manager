import axios from 'axios';

/**
 * Axios instance configured with the backend API URL.
 * Uses Vite proxy in development (proxied to localhost:5000)
 * or the VITE_API_URL environment variable in production.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Task API service
 * Encapsulates all CRUD operations for tasks
 */
const taskService = {
  /**
   * Fetch all tasks
   * @returns {Promise} Response with tasks array
   */
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Fetch a single task by ID
   * @param {string} id - Task ID
   * @returns {Promise} Response with task data
   */
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Create a new task
   * @param {Object} taskData - { title, description, completed, priority }
   * @returns {Promise} Response with created task
   */
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Fields to update
   * @returns {Promise} Response with updated task
   */
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Delete a task
   * @param {string} id - Task ID to delete
   * @returns {Promise} Response confirming deletion
   */
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default taskService;

