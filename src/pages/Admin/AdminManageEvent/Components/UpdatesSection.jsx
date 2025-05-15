import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Constants for labels
const NOTIFICATION_LABELS = {
  TITLE: 'Notification Title',
  DESCRIPTION: 'Message',
  SOURCE: 'Type',
  ACTIONS: 'Actions',
  EDIT: 'Edit Notification',
  DELETE: 'Delete Notification',
  MARK_AS_READ: 'Mark as Read',
  NO_NOTIFICATIONS: 'No notifications available for this event.',
  DEFAULT_TITLE: 'Event Notification',
};

const UpdatesSection = ({ notifications = [] }) => {
  const [notificationList, setNotificationList] = useState(
    notifications.map((n, index) => ({
      id: n.id || 100 + index,
      title: n.message
        ? n.message.split(' ').slice(0, 5).join(' ') + (n.message.split(' ').length > 5 ? '...' : '')
        : NOTIFICATION_LABELS.DEFAULT_TITLE,
      description: n.message || '',
      source: n.type || 'text',
      read: n.read || false,
      poster: n.poster || null,
    }))
  );
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const handleEditStart = (notification) => {
    setEditingId(notification.id);
    setEditMessage(notification.description);
  };

  const handleEditSave = (id) => {
    if (!editMessage.trim()) {
      toast.error('Notification message is required');
      return;
    }
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              title:
                editMessage.split(' ').slice(0, 5).join(' ') +
                (editMessage.split(' ').length > 5 ? '...' : ''),
              description: editMessage,
            }
          : notification
      )
    );
    setEditingId(null);
    setEditMessage('');
    toast.success('Notification updated!');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditMessage('');
  };

  const handleDelete = (id) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id));
    toast.info('Notification deleted');
  };

  const handleMarkAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.info('Notification marked as read');
  };

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
          {notificationList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center text-gray-400 bg-sub-dark rounded-lg border border-[var(--border-accent)]/20"
            >
              {NOTIFICATION_LABELS.NO_NOTIFICATIONS}
            </motion.div>
          ) : (
            notificationList.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`grid grid-cols-12 gap-4 p-3 rounded-lg border border-[var(--border-accent)]/20 transition-all duration-200 ${
                  notification.read ? 'bg-sub-dark/50' : 'bg-sub-dark'
                } hover:bg-sub-dark/80`}
              >
                {editingId === notification.id ? (
                  <>
                    <div className="col-span-4 flex items-center text-white text-sm">
                      {editMessage.split(' ').slice(0, 5).join(' ') +
                        (editMessage.split(' ').length > 5 ? '...' : '')}
                    </div>
                    <div className="col-span-4">
                      <textarea
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="w-full bg-dark p-2 rounded-lg border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white text-sm resize-y transition-all duration-200"
                        placeholder="Enter notification message"
                        rows={3}
                        aria-label="Edit notification message"
                      />
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 rounded-full bg-[var(--border-accent)] text-white text-xs">
                        {notification.source.charAt(0).toUpperCase() + notification.source.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditSave(notification.id)}
                        className="px-3 py-1 btn-primary text-xs rounded-lg flex items-center gap-1 transition-all duration-200"
                        aria-label="Save notification"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-3 py-1 btn-secondary text-xs rounded-lg flex items-center gap-1 transition-all duration-200"
                        aria-label="Cancel edit"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-4 text-white text-sm flex items-center">
                      {notification.title}
                    </div>
                    <div className="col-span-4 text-gray-300 text-sm flex items-center">
                      {notification.description.length > 100
                        ? notification.description.slice(0, 100) + '...'
                        : notification.description || 'No message'}
                      {notification.poster && (
                        <span className="ml-2 text-[var(--border-accent)] text-xs">[Poster]</span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 rounded-full bg-[var(--border-accent)] text-white text-xs">
                        {notification.source.charAt(0).toUpperCase() + notification.source.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditStart(notification)}
                        className="p-1.5 btn-primary rounded-full hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                        title={NOTIFICATION_LABELS.EDIT}
                        aria-label={NOTIFICATION_LABELS.EDIT}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1.5 btn-danger rounded-full hover:bg-red-600/80 transition-all duration-200"
                        title={NOTIFICATION_LABELS.DELETE}
                        aria-label={NOTIFICATION_LABELS.DELETE}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1.5 btn-primary rounded-full hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                          title={NOTIFICATION_LABELS.MARK_AS_READ}
                          aria-label={NOTIFICATION_LABELS.MARK_AS_READ}
                        >
                          <FaCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UpdatesSection;