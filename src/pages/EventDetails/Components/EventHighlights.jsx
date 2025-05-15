import React from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaStar, FaUsers } from 'react-icons/fa';

// Constants for highlights data
const HIGHLIGHTS_DATA = [
  {
    category: 'Speakers',
    title: 'Keynote: Future of Technology',
    description: 'Join our distinguished speaker as they explore the cutting-edge developments shaping our technological landscape.',
    timeLocation: 'Main Stage • 10:00 AM',
    icon: 'FaMicrophone',
  },
  {
    category: 'Announcements',
    title: 'Product Launch Reveal',
    description: 'Be the first to witness our groundbreaking new product that will revolutionize the industry.',
    timeLocation: 'Innovation Hall • 2:00 PM',
    icon: 'FaStar',
  },
  {
    category: 'Activities',
    title: 'Interactive Workshop',
    description: 'Hands-on session where participants will learn practical skills from industry experts.',
    timeLocation: 'Workshop Room A • 11:30 AM',
    icon: 'FaUsers',
  },
  {
    category: 'Highlights',
    title: 'Innovation Showcase',
    description: 'Explore cutting-edge demonstrations from leading technology providers and emerging startups.',
    timeLocation: 'Exhibition Area • All Day',
    icon: 'FaMicrophone',
  },
  {
    category: 'Speakers',
    title: 'Panel Discussion',
    description: 'Industry leaders discuss the future trends and challenges in technology adoption.',
    timeLocation: 'Conference Room B • 3:30 PM',
    icon: 'FaMicrophone',
  },
  {
    category: 'Announcements',
    title: 'Special Announcement',
    description: 'Major collaboration announcement that will shape the future of our industry.',
    timeLocation: 'Main Stage • 4:00 PM',
    icon: 'FaStar',
  },
];

// Map of icon names to components
const ICON_COMPONENTS = {
  FaMicrophone: FaMicrophone,
  FaStar: FaStar,
  FaUsers: FaUsers,
};

const EventHighlights = ({ highlightsData = HIGHLIGHTS_DATA }) => {
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
              const IconComponent = ICON_COMPONENTS[highlight.icon];
              return (
                <article
                  key={`${highlight.title}-${index}`}
                  className="bg-[#0a0a1a] p-6 rounded-lg shadow-lg border border-gray-700/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-[#000000]/80"
                  role="region"
                  aria-label={`Highlight: ${highlight.title}`}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-purple-600 text-xs font-semibold mr-3 bg-purple-600/20 px-2 py-1 rounded-full">
                      {highlight.category}
                    </span>
                    {IconComponent ? (
                      <IconComponent
                        className="text-purple-600 text-2xl"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm" aria-hidden="true">
                        [Icon Missing]
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {highlight.description}
                  </p>
                  <p className="text-xs text-gray-400">{highlight.timeLocation}</p>
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
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      timeLocation: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
};

EventHighlights.defaultProps = {
  highlightsData: HIGHLIGHTS_DATA,
};

export default EventHighlights;