import React from 'react';

const ActionButtons = ({ onBulkDelete }) => {
  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={() => alert('Bulk delete not implemented. Select events and try again.')}
        className="btn-secondary"
        aria-label="Delete selected events"
      >
        Delete Selected
      </button>
    </div>
  );
};

export default ActionButtons;