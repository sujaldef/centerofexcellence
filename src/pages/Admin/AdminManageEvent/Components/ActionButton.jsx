import React from 'react';

const ActionButton = ({ label, icon, onClick, full, disabled, isLoading }) => {
  return (
    <button
      onClick={() => !disabled && !isLoading && onClick(label)}
      className={`btn-primary flex items-center justify-center gap-2 ${full ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${isLoading ? 'opacity-75' : ''}`}
      disabled={disabled}
      aria-label={label}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
        </svg>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};

export default ActionButton;