import React, { useEffect } from 'react';

/**
 * Notification Component
 * Displays success/error messages with auto-dismiss
 * 
 * @param {Object} props
 * @param {'success' | 'error'} props.type - Notification type
 * @param {string} props.message - Message to display
 * @param {Function} props.onClose - Close callback
 */
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const icon = isSuccess ? '✅' : '❌';
  const className = isSuccess ? 'notification-success' : 'notification-error';

  return (
    <div className={`notification ${className}`} role="alert">
      <div className="notification-content">
        <span className="notification-icon">{icon}</span>
        <p className="notification-message">{message}</p>
      </div>
      <button
        className="notification-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;

