import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NOTIFICATION_LABELS = {
  TITLE: 'Notification',
  DESCRIPTION: 'Message',
  SOURCE: 'Type',
  ACTIONS: 'Actions',
  NO_NOTIFICATIONS: 'No notifications available for this event.',
};

const UpdatesSection = ({ notifications = [] }) => {
  return (
    <section className="bg-dark rounded-xl p-6 card mx-auto max-w-7xl">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <svg
          className="text-[var(--border-accent)] w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        Event Notifications and Updates
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 bg-sub-dark p-3 rounded-lg text-white text-sm font-medium">
          <div className="col-span-4">{NOTIFICATION_LABELS.TITLE}</div>
          <div className="col-span-4">{NOTIFICATION_LABELS.DESCRIPTION}</div>
          <div className="col-span-2">{NOTIFICATION_LABELS.SOURCE}</div>
          <div className="col-span-2 text-right">{NOTIFICATION_LABELS.ACTIONS}</div>
        </div>
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center text-gray-400 bg-sub-dark rounded-lg border border-[var(--border-accent)]/20"
            >
              {NOTIFICATION_LABELS.NO_NOTIFICATIONS}
            </motion.div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`grid grid-cols-12 gap-4 p-3 rounded-lg border border-[var(--border-accent)]/20 transition-all duration-200 ${
                  notification.read ? 'bg-sub-dark/50' : 'bg-sub-dark'
                } hover:bg-sub-dark/80`}
              >
                <div className="col-span-4 text-white text-sm flex items-center">
                  {notification.message.split(' ').slice(0, 3).join(' ')}...
                </div>
                <div className="col-span-4 text-gray-300 text-sm flex items-center">
                  {notification.message.length > 100
                    ? notification.message.slice(0, 100) + '...'
                    : notification.message}
                  {notification.poster && (
                    <span className="ml-2 text-[var(--border-accent)] text-xs">[Poster]</span>
                  )}
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="px-2 py-1 rounded-full bg-[var(--border-accent)] text-white text-xs">
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => toast.info('Mark as read not implemented', { theme: 'dark' })}
                      className="p-1.5 btn-primary rounded-full hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                      title="Mark as Read"
                      aria-label="Mark as Read"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UpdatesSection;