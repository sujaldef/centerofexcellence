import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight, FiAlertCircle, FiLoader } from 'react-icons/fi';
import EventCard from '../../Components/EventCard'; // Assuming you have this component
import { fetchEvents, clearError } from '../../../../redux/slices/eventSlice';

const CARDS_PER_PAGE = 4;

const UpcomingEvents = ({ searchTerm = '' }) => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter Logic
  const filteredEvents = useMemo(() => {
    const currentDate = new Date("2025-05-02"); // Fixed reference date from your code
    const lowerSearch = searchTerm.toLowerCase();
    
    return events
      .map(event => ({
        id: event._id,
        title: event.eventName,
        category: event.category,
        venue: event.location,
        date: `${event.date} ${event.month} ${event.year}`,
        image: event.thumbnailImage,
        rawDate: new Date(`${event.month} ${event.date}, ${event.year}`),
      }))
      .filter(event => event.rawDate > currentDate)
      .filter(event => 
        event.title.toLowerCase().includes(lowerSearch) ||
        event.category.toLowerCase().includes(lowerSearch)
      );
  }, [events, searchTerm]);

  const visibleEvents = filteredEvents.slice(startIndex, startIndex + CARDS_PER_PAGE);
  const isEnd = startIndex + CARDS_PER_PAGE >= filteredEvents.length;
  const isStart = startIndex === 0;

  return (
    <section className="px-6 mb-12 w-full max-w-7xl mx-auto" aria-label="Upcoming Events">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Upcoming Events</h2>
          <p className="text-sm text-gray-400 mt-1 font-mono">
            SHOWING {filteredEvents.length > 0 ? startIndex + 1 : 0}-
            {Math.min(startIndex + CARDS_PER_PAGE, filteredEvents.length)} OF {filteredEvents.length}
          </p>
        </div>

        <div className="flex gap-2">
          <ControlButton 
            onClick={() => setStartIndex(prev => Math.max(0, prev - CARDS_PER_PAGE))} 
            disabled={isStart} 
            icon={FiChevronLeft} 
          />
          <ControlButton 
            onClick={() => setStartIndex(prev => prev + CARDS_PER_PAGE)} 
            disabled={isEnd} 
            icon={FiChevronRight} 
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        {loading ? (
          <StateMessage icon={FiLoader} text="Syncing Events..." animate />
        ) : error ? (
          <StateMessage icon={FiAlertCircle} text={error} isError />
        ) : filteredEvents.length === 0 ? (
          <StateMessage icon={FiAlertCircle} text={`No events found matching "${searchTerm}"`} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                venue={event.venue}
                date={event.date}
                image={event.image}
                // Ensure EventCard accepts className or is styled cleanly itself
                className="h-full" 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Sub-Components ---

const ControlButton = ({ onClick, disabled, icon: Icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center
      ${disabled 
        ? 'border-white/5 text-gray-600 bg-transparent cursor-not-allowed' 
        : 'border-white/10 text-white bg-[#151520] hover:bg-white/10 hover:border-white/20 active:scale-95'
      }`}
  >
    <Icon size={20} />
  </button>
);

const StateMessage = ({ icon: Icon, text, isError, animate }) => (
  <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl bg-white/5 text-gray-400">
    <Icon size={32} className={`mb-3 ${isError ? 'text-red-400' : 'text-gray-500'} ${animate ? 'animate-spin' : ''}`} />
    <p className="text-sm font-medium">{text}</p>
  </div>
);

UpcomingEvents.propTypes = {
  searchTerm: PropTypes.string,
};

export default UpcomingEvents;