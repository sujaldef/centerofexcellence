import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpeakersList = ({
  speakers,
  scrollList,
  selectedSpeakers,
  onSelectSpeaker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [message, setMessage] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, speaker: "John Doe", message: "Confirmed for the event!", read: false },
    { id: 2, speaker: "Jane Smith", message: "Sent you the presentation.", read: true },
  ]);

  // SVG for Search Icon
  const SearchIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  // SVG for Chevron Left Icon
  const ChevronLeftIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  // SVG for Chevron Right Icon
  const ChevronRightIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  // SVG for Notification Bell Icon
  const BellIcon = () => (
    <svg
      className="w-5 h-5"
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
  );

  const filteredSpeakers = speakers.filter((speaker) =>
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmailClick = (speaker) => {
    setCurrentSpeaker(speaker);
    setIsPopupOpen(true);
    console.log(`Opened email popup for ${speaker.name}`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message to ${currentSpeaker.name}: ${message}`);
      setMessage("");
      setIsPopupOpen(false);
    }
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    console.log(`Marked notification ${notificationId} as read`);
  };

  const hasUnreadNotifications = notifications.some((notif) => !notif.read);

  return (
    <div className="w-full max-w-7xl mx-auto mb-6 bg-dark p-6 sm:p-8 rounded-2xl shadow-xl card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Speakers
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-white hover:bg-sub-dark rounded-full transition duration-200"
              aria-label="View notifications"
            >
              <BellIcon />
              {hasUnreadNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 bg-sub-dark p-4 rounded-xl shadow-xl border border-[var(--border-accent)]/20 w-80 z-50"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Notifications
                  </h3>
                  {notifications.length === 0 ? (
                    <p className="text-gray-400">No notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`p-3 mb-2 rounded-lg cursor-pointer transition duration-200 ${
                          notif.read ? "bg-dark/50" : "bg-dark"
                        } hover:bg-dark/80`}
                      >
                        <p className="text-sm text-white font-semibold">
                          {notif.speaker}
                        </p>
                        <p className="text-sm text-gray-300">{notif.message}</p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search speakers..."
            className="w-full bg-sub-dark p-3 pl-10 rounded-xl border border-[var(--border-accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
            aria-label="Search speakers"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
        </div>
      </div>
      <div className="relative p-5">
        <div
          id="speakers"
          className="flex overflow-x-auto gap-4 scroll-smooth px-1 pb-2 pt-3"
          style={{ scrollBehavior: "smooth", overflowY: "visible" }}
        >
          <AnimatePresence>
            {filteredSpeakers.length === 0 ? (
              <p className="text-gray p-4">No speakers found</p>
            ) : (
              filteredSpeakers.map((speaker) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ scale: 1.03, zIndex: 20 }}
                  className="bg-sub-dark p-4 rounded-xl shadow-xl border border-[var(--border-accent)]/20 card flex-shrink-0 w-80 relative"
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-14 h-14 rounded-full object-cover border border-[var(--border-accent)]/50"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {speaker.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            speaker.status === "Confirmed"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {speaker.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEmailClick(speaker)}
                      className="btn-primary text-sm"
                      aria-label={`Email ${speaker.name}`}
                    >
                      Email Speaker
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        {filteredSpeakers.length > 3 && (
          <>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 btn-primary p-2 rounded-full shadow-md"
              onClick={() => {
                scrollList("left", "speakers");
                console.log("Scrolled speakers list left");
              }}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 btn-primary p-2 rounded-full shadow-md"
              onClick={() => {
                scrollList("right", "speakers");
                console.log("Scrolled speakers list right");
              }}
              aria-label="Scroll right"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Email Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items compromisecenter justify-center z-50"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-[var(--border-accent)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Email {currentSpeaker?.name}
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full h-32 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200 resize-none"
                aria-label="Email message"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSendMessage}
                  className="btn-primary flex-1"
                  disabled={!message.trim()}
                >
                  Send
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="btn-primary flex-1 bg-sub-dark hover:bg-sub-dark/80"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeakersList;