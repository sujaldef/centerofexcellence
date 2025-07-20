// EventHighlights.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaStar, FaUsers } from 'react-icons/fa';

const ICON_COMPONENTS = {
  FaMicrophone: FaMicrophone,
  FaStar: FaStar,
  FaUsers: FaUsers,
};

const EventHighlights = ({ highlightsData }) => {
  return (
    <section
      className="p-4 sm:p-6 bg-[#01010f] text-gray-100"
      aria-label="Event Highlights"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-100">
          Event Highlights
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-300 mb-8">
          Join us for an extraordinary gathering of innovators, thought leaders, and industry pioneers.
        </p>
        {highlightsData.length === 0 ? (
          <p className="text-center text-gray-400" role="alert">
            No highlights available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightsData.map((highlight, index) => {
              const IconComponent = ICON_COMPONENTS[highlight.icon] || FaMicrophone;
              return (
                <article
                  key={`${highlight.title}-${index}`}
                  className="bg-[#0a0a1a] p-6 rounded-lg shadow-lg border border-gray-700/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-[#000000]/80"
                  role="region"
                  aria-label={`Highlight: ${highlight.title}`}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-purple-600 text-xs font-semibold mr-3 bg-purple-600/20 px-2 py-1 rounded-full">
                      {highlight.category || highlight.type || 'Highlight'}
                    </span>
                    <IconComponent
                      className="text-purple-600 text-2xl"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {highlight.description}
                  </p>
                  <p className="text-xs text-gray-400">{highlight.timeLocation || `${highlight.time || 'TBD'} • ${highlight.location || 'TBD'}`}</p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

EventHighlights.propTypes = {
  highlightsData: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string,
      location: PropTypes.string,
      timeLocation: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default EventHighlights;