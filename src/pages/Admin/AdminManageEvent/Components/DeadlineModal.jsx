import React, { useState } from 'react';

const DeadlineModal = ({ isDeadlineModalOpen, setIsDeadlineModalOpen, handleExtendDeadline }) => {
  const [deadlineExtensionDays, setDeadlineExtensionDays] = useState(0);
  const [deadlineExtensionMonths, setDeadlineExtensionMonths] = useState(0);
  const [extensionReason, setExtensionReason] = useState('');

  const handleIncrement = (setter, value) => setter(Math.max(0, value + 1));
  const handleDecrement = (setter, value) => setter(Math.max(0, value - 1));

  const onExtend = () => {
    handleExtendDeadline({
      days: deadlineExtensionDays,
      months: deadlineExtensionMonths,
      reason: extensionReason,
    });
    setDeadlineExtensionDays(0);
    setDeadlineExtensionMonths(0);
    setExtensionReason('');
    console.log('Deadline extension submitted');
  };

  return (
    <>
      {isDeadlineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-dark p-6 rounded-xl shadow-xl max-w-3xl w-full transform transition-all duration-300 card">
            <h2 className="text-2xl font-semibold text-white mb-6">Extend Deadline</h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Days and Months Inputs */}
              <div className="flex-1 flex gap-4">
                {/* Days Input */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray mb-2">Days</label>
                  <div className="flex items-center space-x-2 bg-sub-dark rounded-lg border border-[var(--border-accent)]/50">
                    <button
                      onClick={() => handleDecrement(setDeadlineExtensionDays, deadlineExtensionDays)}
                      className="p-2 text-white hover:bg-gray-600 rounded-l-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={deadlineExtensionDays}
                      onChange={(e) => setDeadlineExtensionDays(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-sub-dark text-white text-center border-0 focus:outline-none focus:ring-0"
                      min="0"
                    />
                    <button
                      onClick={() => handleIncrement(setDeadlineExtensionDays, deadlineExtensionDays)}
                      className="p-2 text-white hover:bg-gray-600 rounded-r-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Months Input */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray mb-2">Months</label>
                  <div className="flex items-center space-x-2 bg-sub-dark rounded-lg border border-[var(--border-accent)]/50">
                    <button
                      onClick={() => handleDecrement(setDeadlineExtensionMonths, deadlineExtensionMonths)}
                      className="p-2 text-white hover:bg-gray-600 rounded-l-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={deadlineExtensionMonths}
                      onChange={(e) => setDeadlineExtensionMonths(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-sub-dark text-white text-center border-0 focus:outline-none focus:ring-0"
                      min="0"
                    />
                    <button
                      onClick={() => handleIncrement(setDeadlineExtensionMonths, deadlineExtensionMonths)}
                      className="p-2 text-white hover:bg-gray-600 rounded-r-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reason Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray mb-2">Reason for Extension</label>
                <textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="Explain why you need to extend the deadline"
                  className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] resize-none"
                  rows="4"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsDeadlineModalOpen(false);
                  console.log('Deadline modal closed');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onExtend}
                className="btn-primary"
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeadlineModal;