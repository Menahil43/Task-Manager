import React from 'react';

/**
 * LoadingSpinner Component
 * Displays an animated loading indicator
 * 
 * @param {Object} props
 * @param {string} props.size - Size of spinner: 'small' | 'medium' | 'large'
 * @param {string} props.label - Accessibility label
 */
const LoadingSpinner = ({ size = 'large', label = 'Loading...' }) => {
  return (
    <div className={`spinner spinner-${size}`} role="status" aria-label={label}>
      <div className="spinner-circle"></div>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;

