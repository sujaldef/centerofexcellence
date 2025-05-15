import React from 'react';
import ActionButton from './ActionButton';
import { BsX } from 'react-icons/bs';

const CancelActionPage = ({ onConfirm, onCancel }) => {
  return (
    <div className="min-h-screen bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-dark p-8 rounded-xl shadow-xl max-w-3xl w-full card">
        <h2 className="text-2xl font-semibold text-white mb-4">Confirm Cancellation</h2>
        <p className="text-gray mb-6">
          Are you sure you want to cancel this action? This cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              onConfirm();
              console.log('Confirm action triggered');
            }}
            className="btn-primary"
          >
            Confirm
          </button>
          <ActionButton
            label="Cancel"
            icon={<BsX className="w-5 h-5" />}
            onClick={() => {
              onCancel();
              console.log('Cancel action triggered');
            }}
            full={false}
            disabled={false}
            isLoading={false}
            className="btn-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default CancelActionPage;