// PastEvents.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const PastEvents = ({ pastEvents }) => {
  return (
    <section className="py-16 px-4 bg-[01010f] text-[var(--light)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="md:w-2/5 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-md">WHO WE ARE</h2>
          <p className="text-lg leading-relaxed text-gray-200 max-w-prose mx-auto">
            Eventify is a comprehensive platform for organizing and promoting
            events, conferences, and industry gatherings. Our team of seasoned
            professionals is dedicated to delivering unparalleled event
            management solutions, streamlining your planning process, and
            maximizing your ROI. We believe knowledge sharing drives innovation
            and success, and we’re here to help you seize every opportunity.
          </p>
        </div>
        <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pastEvents.length === 0 ? (
            <p className="text-center text-gray-400" role="alert">
              No past events available.
            </p>
          ) : (
            pastEvents.map((event, index) => (
              <div
                key={index}
                className="relative bg-[#000000] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/288x192?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] to-transparent opacity-80"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{event.date}</p>
                  <button
                    className="bg-[#AB47BC] text-[#ffffff] font-semibold py-1.5 px-5 rounded-xl shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC] text-sm"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

PastEvents.propTypes = {
  pastEvents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(PastEvents);