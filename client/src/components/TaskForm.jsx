import React, { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * Handles both creating and editing tasks
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with form data when submitted
 * @param {Object|null} props.editingTask - Task being edited (null for new task)
 * @param {Function} props.onCancelEdit - Cancel editing callback
 * @param {boolean} props.submitting - Whether a request is in progress
 */
const TaskForm = ({ onSubmit, editingTask, onCancelEdit, submitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false,
  });
  const [errors, setErrors] = useState({});

  // Prefill form when editing a task
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        completed: editingTask.completed || false,
      });
    } else {
      resetForm();
    }
  }, [editingTask]);

  /**
   * Validate form data
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      completed: formData.completed,
    };

    // If editing, prepend the task ID
    if (editingTask) {
      const success = await onSubmit(editingTask._id, taskData);
      if (success) resetForm();
    } else {
      const success = await onSubmit(taskData);
      if (success) resetForm();
    }
  };

  /**
   * Handle input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Reset form to default values
   */
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      completed: false,
    });
    setErrors({});
  };

  const isEditing = !!editingTask;

  return (
    <div className="task-form-container">
      <h2 className="form-title">
        {isEditing ? (
          <>
            ✏️ Edit Task: <span className="edit-task-title">{editingTask.title}</span>
          </>
        ) : (
          '➕ Create New Task'
        )}
      </h2>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            className={errors.title ? 'input-error' : ''}
            disabled={submitting}
            autoFocus={!isEditing}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)..."
            rows={3}
            className={errors.description ? 'input-error' : ''}
            disabled={submitting}
          />
          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                disabled={submitting}
              />
              <span>Mark as completed</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className={`btn btn-primary ${submitting ? 'btn-loading' : ''}`}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-small"></span>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : isEditing ? (
              '✏️ Update Task'
            ) : (
              '➕ Add Task'
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                resetForm();
              }}
              disabled={submitting}
            >
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

