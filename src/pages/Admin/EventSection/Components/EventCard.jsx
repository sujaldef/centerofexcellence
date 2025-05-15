import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSettings, FiEye, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modifyEvent } from '../../../../redux/slices/eventSlice';

const EventCard = ({ id, image, eventName, date, location, status, daysLeft, category, onCancel }) => {
  const dispatch = useDispatch();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const getStatusText = () => {
    switch (status) {
      case 'upcoming':
        return `Days Left: ${daysLeft}`;
      case 'ongoing':
        return 'Ongoing Now';
      case 'past':
        return 'Completed';
      case 'pending':
        return 'Pending Approval';
      case 'canceled':
        return 'Canceled';
      default:
        return '';
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await dispatch(modifyEvent({ id, data: { status: 'canceled', updatedAt: new Date().toISOString() } })).unwrap();
      onCancel(id);
      setIsCancelModalOpen(false);
    } catch (error) {
      console.error('Failed to cancel event:', error);
    }
  };

  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: `Registration for ${eventName} has reached 80% capacity.`,
      timestamp: '2025-05-01 10:30 AM',
      type: 'info',
    },
    {
      id: 2,
      message: `Speaker confirmed for ${eventName}.`,
      timestamp: '2025-04-30 3:15 PM',
      type: 'success',
    },
    {
      id: 3,
      message: `Venue change request submitted for ${eventName}.`,
      timestamp: '2025-04-29 9:00 AM',
      type: 'warning',
    },
  ];

  const CancelConfirmationModal = () => (
    <>
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-dark bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-md w-full animate-fadeIn">
            <h2 className="text-medium font-semibold text-white mb-4">Confirm Cancellation</h2>
            <p className="text-gray mb-6">
              Are you sure you want to cancel <strong>{eventName}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelConfirm}
                className="btn-primary"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
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

  const NotificationModal = () => (
    <>
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-dark bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-lg w-full animate-fadeIn">
            <h2 className="text-medium font-semibold text-white mb-4">Notifications for {eventName}</h2>
            <p className="text-gray mb-6">
              View updates and alerts relevant to this event.
            </p>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-sub-dark p-4 rounded-lg border border-[var(--border-accent)]/50 card"
                  >
                    <p className="text-white text-sm">{notification.message}</p>
                    <p className="text-gray text-xs mt-1">{notification.timestamp}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                        notification.type === 'success'
                          ? 'bg-green-600'
                          : notification.type === 'warning'
                          ? 'bg-yellow-600'
                          : 'bg-blue-600'
                      } text-white`}
                    >
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray text-sm">No notifications available.</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-xl card w-full max-w-md mx-auto"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-[400px]">
          {/* Image Section */}
          <div className="relative h-[40%]">
            <img src={image} alt={eventName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-sub-dark)] via-transparent to-transparent opacity-70" />
            <div className="absolute top-2 left-2">
              <span className="text-xs bg-[var(--primary-color)] text-white px-2 py-1 rounded-full">{category}</span>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="text-xs bg-[var(--border-accent)] text-white px-2 py-1 rounded-full">{getStatusText()}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-sub-dark h-[60%] px-4 pt-4 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white truncate">{eventName}</h3>
                <button
                  onClick={() => setIsNotificationModalOpen(true)}
                  className="text-[var(--primary-color)] text-xl hover:text-[var(--border-accent)] transition-colors duration-200"
                  aria-label={`View notifications for ${eventName}`}
                >
                  <FiBell />
                </button>
              </div>

              {/* Date and Location */}
              <div className="text-sm text-gray flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>{date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.243l-4.243-4.243m0 0L9.172 7.757M13.414 12H21m-9-7.414V2m-7.414 9H2m7.414 9v3m9-3h-3m-9-9h3" />
                  </svg>
                  <p>{location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  to={`/admin/manage-events/${id}`}
                  className="btn-primary flex-1 min-w-0"
                >
                  <FiSettings /> Manage
                </Link>
                <Link
                  to={`/event-detail/${id}`}
                  className="btn-primary flex-1 min-w-0"
                >
                  <FiEye /> View
                </Link>
                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="btn-danger flex-1 min-w-0"
                  disabled={status === 'canceled'}
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <CancelConfirmationModal />
      <NotificationModal />
    </>
  );
};

export default EventCard;