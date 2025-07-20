// EventTimeline.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const EventTimeline = ({ timelineData }) => {
  const eventRefs = useRef([]);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      eventRefs.current.forEach((ref) => {
        if (ref) {
          ref.classList.add('opacity-100', 'translate-y-0');
          ref.classList.remove('opacity-0', 'translate-y-10');
        }
      });
      return;
    }

    const observers = eventRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.classList.add('opacity-100', 'translate-y-0');
            ref.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(ref);
          }
        },
        { threshold: 0.5 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section
      className="p-4 sm:p-6 bg-[#01010f] text-gray-100"
      aria-label="Event Timeline"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-100">
          Event Timeline
        </h2>
        {timelineData.length === 0 ? (
          <p className="text-center text-gray-400" role="alert">
            No timeline events available.
          </p>
        ) : (
          <div className="relative flex flex-col">
            {timelineData.map((event, index) => (
              <article
                key={`${event.title}-${index}`}
                ref={(el) => (eventRefs.current[index] = el)}
                className="flex items-start mb-16 opacity-0 translate-y-10 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
                role="region"
                aria-label={`Timeline event: ${event.title}`}
              >
                <div className="flex flex-col items-center mr-8 relative">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {event.date}
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="w-1 bg-purple-600 absolute top-[80px] h-[calc(100%+88px)]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-400 mr-4">{event.time}</span>
                    <span className="text-sm text-gray-400">⦁ {event.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    {event.title}
                  </h3>
                  <p className="text-base text-gray-300">{event.description}</p>
                </div>
                <div className="ml-8">
                  <img
                    src={event.image}
                    alt={`Illustration for ${event.title}`}
                    className="w-72 h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/288x192?text=Image+Not+Found';
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

EventTimeline.propTypes = {
  timelineData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventTimeline;