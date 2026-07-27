const { validationResult } = require('express-validator');
const Task = require('../models/Task');

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Public
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks',
    });
  }
};

/**
 * @desc    Get a single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error fetching task:', error);

    // Handle invalid MongoDB ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching task',
    });
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { title, description, completed, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
      priority,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating task',
    });
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { title, description, completed, priority } = req.body;

    // Build update object (only include provided fields)
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;
    if (priority !== undefined) updateFields.priority = priority;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error updating task:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating task',
    });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error deleting task:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting task',
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};

