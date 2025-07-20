// Sponsors.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Sponsors = ({ sponsorsData }) => {
  return (
    <section className="py-10 px-4 text-center bg-[var(--dark)]">
      <h2 className="text-3xl font-bold mb-8 text-[var(--light)]">{sponsorsData.title}</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {sponsorsData.logos.length === 0 ? (
          <p className="text-gray-400" role="alert">
            No sponsors available.
          </p>
        ) : (
          sponsorsData.logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-3 bg-[var(--dark-secondary)] rounded-lg shadow-md"
            >
              <img src={logo} alt={`Sponsor ${index + 1}`} className="h-12 object-contain" />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

Sponsors.propTypes = {
  sponsorsData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    logos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default memo(Sponsors);