import React from 'react';
import './ErrorMessage.scss';

export const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="cms-error-message-container">
      <div className="cms-error-message">
        <div className="cms-error-icon">⚠️</div>
        <div className="cms-error-text">
          <strong>Error</strong>
          <p>{error}</p>
        </div>
        {onClose && (
          <button className="cms-error-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="cms-success-message-container">
      <div className="cms-success-message">
        <div className="cms-success-icon">✅</div>
        <div className="cms-success-text">
          <strong>Success</strong>
          <p>{message}</p>
        </div>
        {onClose && (
          <button className="cms-success-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="cms-loading-container">
      <div className="cms-loading-spinner"></div>
      <p className="cms-loading-text">{message}</p>
    </div>
  );
};
