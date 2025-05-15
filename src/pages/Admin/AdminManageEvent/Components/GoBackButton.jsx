import React from 'react';

const GoBackButton = ({ navigate }) => {
  // SVG for Arrow Left Icon
  const ArrowLeftIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  return (
    <div className="tooltip-wrapper">
      <button
        onClick={() => {
          navigate(-1);
          console.log('Navigating back');
        }}
        className="btn-primary m-2"
        aria-label="Go back"
      >
        <ArrowLeftIcon /> Go Back
      </button>
      <span className="tooltip">Back to previous page</span>
    </div>
  );
};

export default GoBackButton;