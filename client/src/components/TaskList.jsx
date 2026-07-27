import React, { useState } from 'react';
import TaskCard from './TaskCard';
import ConfirmDialog from './ConfirmDialog';

/**
 * TaskList Component
 * Displays all tasks with edit/delete capabilities
 * Shows empty state when no tasks exist
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {Function} props.onEdit - Edit task callback
 * @param {Function} props.onDelete - Delete task callback
 * @param {boolean} props.submitting - Whether a request is in progress
 */
const TaskList = ({ tasks, onEdit, onDelete, submitting }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /**
   * Show delete confirmation dialog
   * @param {Object} task - Task to delete
   */
  const requestDelete = (task) => {
    setDeleteConfirm(task);
  };

  /**
   * Confirm and execute deletion
   */
  const confirmDelete = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm._id);
      setDeleteConfirm(null);
    }
  };

  /**
   * Cancel delete
   */
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No tasks yet</h3>
        <p>Create your first task using the form above to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="task-list-header">
        <h2>
          📋 All Tasks
          <span className="task-count"> ({tasks.length})</span>
        </h2>
      </div>

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={requestDelete}
            disabled={submitting}
          />
        ))}
      </div>

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          loading={submitting}
        />
      )}
    </>
  );
};

export default TaskList;

