import React, { useRef, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';

const NOTIFICATIONS = [
  {
    id: 1,
    message: "AI Summit 2024 registration opens tomorrow!",
    date: "2025-04-24",
    unread: true,
    eventDetails: {
      title: "AI Summit 2024",
      description: "Join the leading experts in artificial intelligence to explore the latest advancements in machine learning and AI applications.",
      date: "March 15, 2024 | 9:00 AM - 5:00 PM",
      venue: "Tech Center, Silicon Valley",
      image: "/past1.png",
      category: "Machine Learning",
    },
  },
  {
    id: 2,
    message: "Web3 Conference schedule updated.",
    date: "2025-04-23",
    unread: true,
    eventDetails: {
      title: "Web3 Conference",
      description: "Discover the future of decentralized technologies and blockchain innovations at this premier conference.",
      date: "April 6, 2024 | 10:00 AM - 4:00 PM",
      venue: "Innovation Hub, San Francisco",
      image: "/past1.png",
      category: "Blockchain",
    },
  },
  {
    id: 3,
    message: "Reminder: DevOps Summit starts in 2 days.",
    date: "2025-04-22",
    unread: false,
    eventDetails: {
      title: "DevOps Summit",
      description: "A hands-on workshop to master cloud infrastructure and DevOps practices with industry leaders.",
      date: "April 20, 2024 | 8:00 AM - 3:00 PM",
      venue: "Skyline Hall, New York",
      image: "/past1.png",
      category: "Cloud & DevOps",
    },
  },
];

const NotificationDropdown = ({ isNotificationOpen, setIsNotificationOpen, setSelectedEvent }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsNotificationOpen]);

  const toggleNotifications = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const openEventModal = (eventDetails) => {
    setSelectedEvent(eventDetails);
    setIsNotificationOpen(false);
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={toggleNotifications}
        className="relative btn-secondary"
        aria-label="View notifications"
        aria-expanded={isNotificationOpen}
      >
        <FiBell size={20} />
        {NOTIFICATIONS.some((n) => n.unread) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-sub-dark backdrop-blur-md rounded-lg shadow-lg border border-[var(--border-accent)] z-20">
          <div className="p-4 border-b border-[var(--border-accent)]">
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {NOTIFICATIONS.length > 0 ? (
              NOTIFICATIONS.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 border-b card border-[var(--border-accent)] last:border-b-0 flex justify-between items-center ${
                    notification.unread ? 'bg-opacity-10' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm text-white">{notification.message}</p>
                    <p className="text-xs text-gray mt-1">{notification.date}</p>
                  </div>
                  <button
                    onClick={() => openEventModal(notification.eventDetails)}
                    className="btn-primary text-sm"
                    aria-label={`View details for ${notification.eventDetails.title}`}
                  >
                    View
                  </button>
                </li>
              ))
            ) : (
              <li className="p-4 text-sm text-gray">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
