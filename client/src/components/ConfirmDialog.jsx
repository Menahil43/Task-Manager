import React from 'react';

/**
 * ConfirmDialog Component
 * Modal confirmation dialog for destructive actions
 * 
 * @param {Object} props
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Confirmation message
 * @param {Function} props.onConfirm - Confirm callback
 * @param {Function} props.onCancel - Cancel callback
 * @param {boolean} props.loading - Whether action is loading
 */
const ConfirmDialog = ({ title, message, onConfirm, onCancel, loading }) => {
  return (
    <div className="dialog-overlay" onClick={loading ? undefined : onCancel}>
      <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3 className="dialog-title">{title}</h3>
        </div>
        <div className="dialog-body">
          <p className="dialog-message">{message}</p>
        </div>
        <div className="dialog-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

