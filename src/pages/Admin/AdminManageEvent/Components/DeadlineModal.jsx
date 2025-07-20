import React, { useState } from 'react';

const DeadlineModal = ({ isOpen, onClose, onSubmit }) => {
  const [newDate, setNewDate] = useState('');
  const [extensionReason, setExtensionReason] = useState('');

  const onExtend = () => {
    console.log('DeadlineModal: Submitting new date:', { newDate, reason: extensionReason });
    onSubmit({
      newDate,
      reason: extensionReason,
    });
    setNewDate('');
    setExtensionReason('');
    onClose();
  };

  console.log('DeadlineModal render - isOpen:', isOpen);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-dark p-6 rounded-xl shadow-xl max-w-3xl w-full transform transition-all duration-300 card">
            <h2 className="text-2xl font-semibold text-white mb-6">Change Event Date</h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray mb-2">New Event Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]"
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray mb-2">Reason for Change</label>
                <textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="Explain why you need to change the event date"
                  className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] resize-none"
                  rows="4"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onExtend}
                className="btn-primary"
              >
                Change Date
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeadlineModal;