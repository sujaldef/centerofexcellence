import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './calendar-custom.css';

const INITIAL_EVENTS = [
  {
    id: 'cal_001',
    date: new Date(2025, 3, 15),
    title: 'Tech Summit 2025',
  },
  {
    id: 'cal_002',
    date: new Date(2025, 3, 18),
    title: 'Digital Marketing Workshop',
  },
  {
    id: 'cal_003',
    date: new Date(2025, 3, 22),
    title: 'AI Innovation Hackathon',
  },
];

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const tileContent = ({ date, view }) => {
    const event = events.find((e) => e.date.toDateString() === date.toDateString());
    return view === 'month' && event ? (
      <p className="text-small text-[var(--primary-color)] mt-1 truncate">{event.title}</p>
    ) : null;
  };
  const handleRemoveEvent = () => {
    const eventExists = events.find((e) => e.date.toDateString() === value.toDateString());
    if (eventExists) {
      const updatedEvents = events.filter((e) => e.date.toDateString() !== value.toDateString());
      setEvents(updatedEvents);
    
    }
  };
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      const newEvent = {
        id: `cal_${Date.now()}`,
        date: value,
        title: newEventTitle.trim(),
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setIsModalOpen(false);
   
    }
  };

  return (
    <div className="bg-dark text-white p-6 rounded-xl mb-6">
      
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">

  <div className="flex gap-2">
    <button
      onClick={() => setIsModalOpen(true)}
      className="btn-secondary"
      aria-label="Add new event"
    >
      <FaPlus /> Add Event
    </button>
    <button
      onClick={handleRemoveEvent}
      className="btn-secondary"
      aria-label="Remove event"
    >
      Remove Event
    </button>
  </div>
</div>

      <div className="w-full">
      <Calendar
  onChange={setValue}
  value={value}
  tileContent={tileContent}
  tileClassName={({ date, view }) => {
    if (view === 'month') {
      const event = events.find((e) => e.date.toDateString() === date.toDateString());
      if (event) {
        return 'event-day'; // Custom class
      }
    }
    return null;
  }}
  className="w-full"
/>

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-sub-dark/80 flex items-center justify-center z-50">
          <div className="bg-dark p-6 rounded-xl card max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Event</h3>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Enter event title"
                className="w-full p-3 rounded-lg bg-sub-dark border border-[var(--border-accent)]/30 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] mb-4"
                aria-label="Event title"
              />
              <p className="text-small text-white/80 mb-4">
                Selected Date: {value.toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  aria-label="Save event"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 btn-secondary"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;