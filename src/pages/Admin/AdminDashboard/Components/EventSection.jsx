import React from 'react';
import { FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import EventCard from './EventCard';

const EventSection = ({
  title,
  events,
  currentPage,
  setCurrentPage,
  section,
  itemsPerPage,
  exportToCSV,
}) => {
  const startIndex = currentPage * itemsPerPage;
  const visibleEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-medium font-semibold text-white">{title}</h4>
        <button
          onClick={() => exportToCSV(events, section)}
          className="text-[var(--primary-color)] hover:text-[var(--border-accent)] flex items-center gap-1 text-small font-medium transition-colors"
          aria-label={`Export ${title} to CSV`}
        >
          <FiDownload /> Export
        </button>
      </div>
      {visibleEvents.length === 0 ? (
        <div className="bg-sub-dark/50 p-6 rounded-xl border border-[var(--border-accent)]/20 text-center">
          <p className="text-white/60 text-small">No events found for this section.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleEvents.map((event, i) => (
            <EventCard
              key={`${section}-${i}`}
              event={event}
              section={section}
              index={i}
            />
          ))}
        </div>
      )}
      {events.length > itemsPerPage && (
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="flex items-center gap-2 text-[var(--primary-color)] disabled:opacity-40 hover:text-[var(--border-accent)] transition-colors text-small font-medium"
            aria-label="Previous page"
          >
            <FiChevronLeft /> Prev
          </button>
          <button
            disabled={startIndex + itemsPerPage >= events.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center gap-2 text-[var(--primary-color)] disabled:opacity-40 hover:text-[var(--border-accent)] transition-colors text-small font-medium"
            aria-label="Next page"
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default EventSection;