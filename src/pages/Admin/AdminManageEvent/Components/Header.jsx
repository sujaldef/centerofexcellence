import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEventDetailsForManagement, extendEventDeadline, deleteEvent, clearError } from '../../../../redux/slices/eventSlice';
import { postNotification } from '../../../../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import NotificationModal from './NotificationModal';
import DeadlineModal from './DeadlineModal';
import ActionButton from './ActionButton';
import { BsX } from 'react-icons/bs';

const Header = ({ eventId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEvent, loading, error } = useSelector((state) => state.events);
  const [daysLeft, setDaysLeft] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    console.log('Header useEffect: Fetching event details for eventId:', eventId);
    if (eventId) {
      dispatch(fetchEventDetailsForManagement(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (selectedEvent) {
      console.log('Selected event updated:', selectedEvent);
      const eventDate = new Date(
        `${selectedEvent.year}-${selectedEvent.month}-${selectedEvent.date}`
      );
      const calculateDaysLeft = () => {
        const today = new Date();
        const timeDiff = eventDate.getTime() - today.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDaysLeft(days > 0 ? days : 0);
      };
      calculateDaysLeft();
      setDeadline(eventDate);
      const interval = setInterval(calculateDaysLeft, 86400000);
      return () => clearInterval(interval);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (error) {
      console.error('Header Redux error:', error);
      toast.error(error, { theme: 'dark' });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleStatClick = (label) => {
    console.log(`StatCard clicked: ${label}`);
    toast.info(`Viewing ${label} details`, { theme: 'dark' });
  };

  const handlePostNotification = ({ message, poster, type }) => {
    console.log('Dispatching postNotification:', {
      eventId,
      message,
      poster: poster ? poster.name : null,
      type,
      url: 'https://centerofexcellence-1.onrender.com/notifications/',
    });
    dispatch(postNotification({ eventId, notificationData: { message, poster }, type }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Notification posted successfully!', { theme: 'dark' });
        } else {
          console.error('Notification post failed:', result.payload);
          toast.error(`Failed to post notification: ${result.payload}`, { theme: 'dark' });
        }
      })
      .catch((err) => {
        console.error('Notification post error:', err);
        toast.error(`Error posting notification: ${err.message || 'Unknown error'}`, { theme: 'dark' });
      });
    setIsNotificationModalOpen(false);
  };

  const handleExtendDeadline = ({ newDate, reason }) => {
    console.log('Dispatching extendEventDeadline:', { eventId, newDate, reason });
    if (!newDate) {
      toast.error('Please select a valid date.', { theme: 'dark' });
      return;
    }
    const selectedDate = new Date(newDate);
    if (selectedDate < new Date()) {
      toast.error('New date must be in the future.', { theme: 'dark' });
      return;
    }

    // Calculate extended days and months
    const currentDate = new Date(`${selectedEvent.year}-${selectedEvent.month}-${selectedEvent.date}`);
    const timeDiff = selectedDate.getTime() - currentDate.getTime();
    const extendedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const extendedMonths = Math.round(extendedDays / 30);

    // Dispatch deadline extension
    dispatch(extendEventDeadline({ eventId, extensionData: { newDate, reason } }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Event date changed successfully!', { theme: 'dark' });
          // Post deadline notification
          dispatch(postNotification({
            eventId,
            notificationData: {
              message: `Event deadline extended to ${newDate}. Reason: ${reason}`,
              reason,
              extended_days: extendedDays,
              extended_months: extendedMonths,
            },
            type: 'deadline',
          }))
            .then((notifResult) => {
              if (notifResult.meta.requestStatus === 'fulfilled') {
                toast.success('Deadline extension notification posted!', { theme: 'dark' });
              } else {
                toast.error(`Failed to post deadline notification: ${notifResult.payload}`, { theme: 'dark' });
              }
            });
        } else {
          console.error('Date change failed:', result.payload);
          toast.error(`Failed to change event date: ${result.payload}`, { theme: 'dark' });
        }
      })
      .catch((err) => {
        console.error('Date change error:', err);
        toast.error(`Error changing event date: ${err.message || 'Unknown error'}`, { theme: 'dark' });
      });
    setIsDeadlineModalOpen(false);
  };

  const handleCancelConfirm = () => {
    console.log('Dispatching deleteEvent:', eventId);
    dispatch(deleteEvent(eventId))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Event cancelled successfully!', { theme: 'dark' });
          // Post cancellation notification
          dispatch(postNotification({
            eventId,
            notificationData: {
              message: `Event ${selectedEvent?.eventName} has been cancelled. Reason: ${cancelReason}`,
              reason: cancelReason,
            },
            type: 'cancellation',
          }))
            .then((notifResult) => {
              if (notifResult.meta.requestStatus === 'fulfilled') {
                toast.success('Cancellation notification posted!', { theme: 'dark' });
              } else {
                toast.error(`Failed to post cancellation notification: ${notifResult.payload}`, { theme: 'dark' });
              }
            });
          navigate('/events');
        } else {
          console.error('Cancellation failed:', result.payload);
          toast.error(`Failed to cancel event: ${result.payload}`, { theme: 'dark' });
        }
      })
      .catch((err) => {
        console.error('Cancellation error:', err);
        toast.error(`Error cancelling event: ${err.message || 'Unknown error'}`, { theme: 'dark' });
      });
    setIsCancelModalOpen(false);
    setCancelReason('');
  };

  const CancelConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-dark p-6 rounded-xl shadow-xl max-w-md w-full card">
            <h2 className="text-2xl font-semibold text-white mb-4">Confirm Cancellation</h2>
            <p className="text-gray mb-4">
              Are you sure you want to cancel {selectedEvent?.eventName || 'the event'}? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray mb-2">Reason for Cancellation</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Explain why the event is being cancelled"
                className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] resize-none"
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={onConfirm}
                className="btn-primary"
                disabled={!cancelReason.trim()}
              >
                Confirm
              </button>
              <button
                onClick={onClose}
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

  console.log('Header render - State:', { loading, isNotificationModalOpen, isDeadlineModalOpen, isCancelModalOpen });

  return (
    <div className="bg-dark mt-10 px-6 sm:px-10 py-8 rounded-xl shadow-xl card max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[var(--border-accent)]">
            {selectedEvent?.eventName || 'Loading...'} <span className="text-white">2024</span>
          </h1>
          <p className="text-gray mt-2">
            {selectedEvent ? new Date(
              `${selectedEvent.year}-${selectedEvent.month}-${selectedEvent.date}`
            ).toDateString() : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full font-medium text-white bg-[var(--border-accent)] shadow-sm">
            {daysLeft} Days Left
          </span>
          <button
            onClick={() => {
              console.log('Opening notification modal');
              setIsNotificationModalOpen(true);
            }}
            className="btn-primary text-sm"
            disabled={loading}
          >
            Post Notification
          </button>
          <button
            onClick={() => {
              console.log('Opening deadline modal');
              setIsDeadlineModalOpen(true);
            }}
            className="btn-primary text-sm"
            disabled={loading}
          >
            Change Event Date
          </button>
          <ActionButton
            label="Cancel Event"
            icon={<BsX className="w-5 h-5" />}
            onClick={() => {
              console.log('Opening cancel event modal');
              setIsCancelModalOpen(true);
            }}
            full={false}
            disabled={loading}
            isLoading={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Registrations"
          value={selectedEvent?.totalRegistrations || 0}
          onClick={() => handleStatClick('Total Registrations')}
        />
        <StatCard
          label="Days Left"
          value={daysLeft}
          onClick={() => handleStatClick('Days Left')}
        />
        <StatCard
          label="Event Status"
          value={selectedEvent?.status || 'N/A'}
          onClick={() => handleStatClick('Event Status')}
        />
      </div>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => {
          console.log('Closing notification modal');
          setIsNotificationModalOpen(false);
        }}
        onSubmit={handlePostNotification}
      />
      <DeadlineModal
        isOpen={isDeadlineModalOpen}
        onClose={() => {
          console.log('Closing deadline modal');
          setIsDeadlineModalOpen(false);
        }}
        onSubmit={handleExtendDeadline}
      />
      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          console.log('Closing cancel modal');
          setIsCancelModalOpen(false);
          setCancelReason('');
        }}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
};

export default Header;