import React, { useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const EventModal = ({ selectedEvent, setSelectedEvent }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedEvent(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelectedEvent]);

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-sub-dark)] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-sub-dark backdrop-blur-md rounded-lg w-full max-w-md p-6 text-white animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Event Details</h2>
          <button
            onClick={closeModal}
            className="btn-secondary"
            aria-label="Close event details"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <img
            src={selectedEvent.image}
            alt={`Poster for ${selectedEvent.title}`}
            className="w-full h-48 object-cover rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
            <p className="text-sm text-gray">{selectedEvent.category}</p>
          </div>
          <p className="text-sm text-white">{selectedEvent.description}</p>
          <div className="space-y-2">
            <p className="text-sm text-white">
              <span className="font-semibold">Date:</span> {selectedEvent.date}
            </p>
            <p className="text-sm text-white">
              <span className="font-semibold">Venue:</span> {selectedEvent.venue}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-full btn-primary"
            aria-label="Close event details"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;