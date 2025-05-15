import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import NotificationModal from './NotificationModal';
import DeadlineModal from './DeadlineModal';
import ActionButton from './ActionButton';
import { BsX } from 'react-icons/bs';

const Header = () => {
  const eventDate = new Date('2024-12-15');
  const [daysLeft, setDaysLeft] = useState(0);
  const [deadline, setDeadline] = useState(new Date('2024-11-30'));
  const [notifications, setNotifications] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const timeDiff = eventDate.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 86400000);
    return () => clearInterval(interval);
  }, []);

  const handleStatClick = (label) => {
    console.log(`Viewing ${label} details`);
  };

  const handlePostNotification = ({ message, poster, type }) => {
    const newNotification = {
      id: Date.now(),
      message,
      poster: poster ? URL.createObjectURL(poster) : null,
      type,
      timestamp: new Date(),
    };
    setNotifications([...notifications, newNotification]);
    setIsNotificationModalOpen(false);
    console.log('New notification:', newNotification);
  };

  const handleExtendDeadline = ({ days, months, reason }) => {
    const totalDays = parseInt(days || 0, 10) + parseInt(months || 0, 10) * 30;
    if (totalDays <= 0) {
      console.log('Invalid extension: Please enter a valid number of days or months.');
      return;
    }
    const newDeadline = new Date(deadline);
    newDeadline.setDate(deadline.getDate() + totalDays);
    setDeadline(newDeadline);
    setIsDeadlineModalOpen(false);
    console.log(`Deadline extended to ${newDeadline.toDateString()}. Reason: ${reason}`);
  };

  const handleCancelConfirm = () => {
    console.log('Event cancellation confirmed for Tech Conference 2024');
    setIsCancelModalOpen(false);
  };

  const CancelConfirmationModal = () => (
    <>
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-dark p-6 rounded-xl shadow-xl max-w-md w-full card">
            <h2 className="text-2xl font-semibold text-white mb-4">Confirm Cancellation</h2>
            <p className="text-gray mb-6">
              Are you sure you want to cancel the Tech Conference 2024? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelConfirm}
                className="btn-primary"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  console.log('Cancellation modal closed');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-dark mt-10 px-6 sm:px-10 py-8 rounded-xl shadow-xl card max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[var(--border-accent)]">
            Tech Conference <span className="text-white">2024</span>
          </h1>
          <p className="text-gray mt-2">{eventDate.toDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full font-medium text-white bg-[var(--border-accent)] shadow-sm">
            {daysLeft} Days Left
          </span>
          <button
            onClick={() => {
              setIsNotificationModalOpen(true);
              console.log('Opening notification modal');
            }}
            className="btn-primary text-sm"
          >
            Post Notification
          </button>
          <button
            onClick={() => {
              setIsDeadlineModalOpen(true);
              console.log('Opening deadline modal');
            }}
            className="btn-primary text-sm"
          >
            Extend Deadline
          </button>
          <ActionButton
            label="Cancel Event"
            icon={<BsX className="w-5 h-5" />}
            onClick={() => {
              setIsCancelModalOpen(true);
              console.log('Opening cancel event modal');
            }}
            full={false}
            disabled={false}
            isLoading={false}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div onClick={() => handleStatClick('Registered')} className="cursor-pointer">
          <StatCard label="Registered" value="1,234" trend={10} />
        </div>
        <div onClick={() => handleStatClick('Speakers')} className="cursor-pointer">
          <StatCard label="Speakers" value="12" trend={-5} />
        </div>
        <div onClick={() => handleStatClick('Days Left')} className="cursor-pointer">
          <StatCard label="Days Left" value={daysLeft} trend={0} />
        </div>
      </div>

      <NotificationModal
        isNotificationModalOpen={isNotificationModalOpen}
        setIsNotificationModalOpen={setIsNotificationModalOpen}
        handlePostNotification={handlePostNotification}
      />

      <DeadlineModal
        isDeadlineModalOpen={isDeadlineModalOpen}
        setIsDeadlineModalOpen={setIsDeadlineModalOpen}
        handleExtendDeadline={handleExtendDeadline}
      />

      <CancelConfirmationModal />
    </div>
  );
};

export default Header;