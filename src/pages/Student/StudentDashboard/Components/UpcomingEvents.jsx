import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import EventCard from '../../Components/EventCard';
import { fetchEvents, clearError } from '../../../../redux/slices/eventSlice';

const CARDS_PER_PAGE = 4;

const UpcomingEvents = ({ searchTerm = '' }) => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Event fetch error:', error);
      setTimeout(() => dispatch(clearError()), 5000); // Clear error after 5s
    }
  }, [error, dispatch]);

  // Standardize events and filter for upcoming ones (date after May 2, 2025)
  const currentDate = new Date("2025-05-02");
  const standardizedEvents = events.map((event) => ({
    id: event._id,
    title: event.eventName,
    category: event.category,
    venue: event.location,
    date: `${event.date} ${event.month} ${event.year}`,
    image: event.thumbnailImage,
    rawDate: new Date(`${event.month} ${event.date}, ${event.year}`), // For date comparison
  }));

  const upcomingEvents = standardizedEvents.filter((event) => event.rawDate > currentDate);

  const filteredEvents = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(lowerSearchTerm) ||
        event.category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [upcomingEvents, searchTerm]);

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + CARDS_PER_PAGE < filteredEvents.length) {
      setStartIndex((prev) => prev + CARDS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - CARDS_PER_PAGE >= 0) {
      setStartIndex((prev) => prev - CARDS_PER_PAGE);
    }
  };

  const visibleEvents = filteredEvents.slice(startIndex, startIndex + CARDS_PER_PAGE);

  return (
    <section className="p-6 bg-dark text-white" aria-label="Upcoming Events">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous events"
          >
            <FiChevronLeft size={20} className="text-gray" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + CARDS_PER_PAGE >= filteredEvents.length}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next events"
          >
            <FiChevronRight size={20} className="text-gray" />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-12 text-gray" role="alert">
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500" role="alert">
          <p>{error}</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 text-gray" role="alert">
          <p>No upcoming events found matching "{searchTerm}".</p>
          <p>Try adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {visibleEvents.map((event, index) => (
            <EventCard
              key={`${event.id}-${index}`}
              id={event.id}
              title={event.title}
              category={event.category}
              venue={event.venue}
              date={event.date}
              image={event.image}
              className="h-[370px] card border border-[var(--border-accent)] rounded-xl p-4"
              aria-label={`Event: ${event.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

UpcomingEvents.propTypes = {
  searchTerm: PropTypes.string,
};

UpcomingEvents.defaultProps = {
  searchTerm: '',
};

export default UpcomingEvents;