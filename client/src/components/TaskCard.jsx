import React from 'react';

/**
 * TaskCard Component
 * Displays a single task with edit and delete actions
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {Function} props.onEdit - Edit callback
 * @param {Function} props.onDelete - Delete callback
 * @param {boolean} props.disabled - Whether actions are disabled
 */
const TaskCard = ({ task, onEdit, onDelete, disabled }) => {
  const { _id, title, description, completed, priority, createdAt } = task;

  /**
   * Get priority display info
   */
  const getPriorityInfo = () => {
    const info = {
      low: { label: 'Low', icon: '🟢', className: 'priority-low' },
      medium: { label: 'Medium', icon: '🟡', className: 'priority-medium' },
      high: { label: 'High', icon: '🔴', className: 'priority-high' },
    };
    return info[priority] || info.medium;
  };

  /**
   * Format date to readable string
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const priorityInfo = getPriorityInfo();

  return (
    <div className={`task-card ${completed ? 'task-completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-title-row">
          <span className="task-status-icon">
            {completed ? '✅' : '🔄'}
          </span>
          <h3 className={`task-title ${completed ? 'title-completed' : ''}`}>
            {title}
          </h3>
        </div>
        <span className={`priority-badge ${priorityInfo.className}`}>
          {priorityInfo.icon} {priorityInfo.label}
        </span>
      </div>

      {description && (
        <p className="task-description">{description}</p>
      )}

      <div className="task-card-footer">
        <span className="task-date">
          📅 {formatDate(createdAt)}
        </span>
        <div className="task-actions">
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(task)}
            disabled={disabled}
            title="Edit task"
          >
            ✏️ Edit
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(task)}
            disabled={disabled}
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {completed && (
        <div className="completed-badge">
          <span>✓ Completed</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

