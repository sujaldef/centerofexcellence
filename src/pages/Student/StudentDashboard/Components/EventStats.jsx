import React from 'react';
import PropTypes from 'prop-types';

const EVENT_STATS = [
  { icon: "📝", value: "12", label: "Events Registered" },
  { icon: "✅", value: "8", label: "Events Attended" },
  { icon: "🚀", value: "3", label: "Active Applications" }
];

const EventStats = () => {
  return (
    <section className="px-6 mb-6" aria-label="Event Statistics">
      <style>
        {`
          .shiny-card {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .shiny-card:hover {
            transform: scale(1.02);
            filter: brightness(1.05);
          }
          .shiny-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -100%;
            width: 50%;
            height: 200%;
            background: linear-gradient(
              to right,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
            transform: rotate(45deg);
            animation: shine 6s ease-in-out infinite;
          }
          .shiny-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -100%;
            width: 50%;
            height: 200%;
            background: linear-gradient(
              to right,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transform: rotate(45deg);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .shiny-card:hover::after {
            opacity: 1;
            animation: shine-hover 4s ease-in-out infinite;
          }
          @keyframes shine {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
          }
          @keyframes shine-hover {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
          }
        `}
      </style>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EVENT_STATS.map((card, index) => (
          <article
            key={`${card.label}-${index}`}
            className="shiny-card bg-[#000000] rounded-xl p-6 shadow-2xl border border-gray-700/30 flex items-center justify-between transition-all duration-300"
            role="region"
            aria-label={`${card.label} statistic`}
          >
            <div
              className="text-purple-400 text-3xl  "
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: card.icon }}
            />
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-100">{card.value}</p>
              <p className="text-sm text-gray-400">{card.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

EventStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default EventStats;