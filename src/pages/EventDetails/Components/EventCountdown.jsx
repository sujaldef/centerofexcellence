import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Constant for countdown data
const COUNTDOWN_DATA = {
  eventDate: '2025-04-27T00:00:00',
  dateLabel: 'April 25–27, 2025',
  venue: 'Hilton Conference Center',
};

// Utility function to calculate countdown
const calculateCountdown = (targetDate) => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
};

const EventCountdown = ({ countdownData = COUNTDOWN_DATA }) => {
  const targetDate = new Date(countdownData.eventDate).getTime();
  const [countdown, setCountdown] = useState(calculateCountdown(targetDate));

  // Validate date
  const isValidDate = !isNaN(targetDate);

  useEffect(() => {
    if (!isValidDate) return;

    // Log target date for debugging (remove in production)
    console.log('Target Date:', new Date(targetDate).toISOString());

    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(targetDate);
      setCountdown(newCountdown);

      // Log countdown values for debugging (remove in production)
      console.log('Countdown:', newCountdown);

      if (newCountdown.expired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isValidDate]);

  return (
    <section
      className="p-4 sm:p-6 bg-[#6A1B9A] mt-20 mb-20 text-gray-100"
      aria-label="Event Countdown"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {!isValidDate ? (
          <p className="text-center text-gray-400" role="alert">
            Invalid event date provided.
          </p>
        ) : countdown.expired ? (
          <p className="text-center text-gray-400" role="alert">
            The event has already occurred.
          </p>
        ) : (
          <>
            {/* Info Cards */}
            {(countdownData.dateLabel || countdownData.venue) && (
              <div className="flex flex-col md:flex-row gap-4">
                {countdownData.dateLabel && (
                  <div
                    className="bg-[#000000] p-4 rounded-lg shadow-lg border border-gray-700/20 flex items-center gap-3 w-full max-w-[250px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    role="region"
                    aria-label="Event Date"
                  >
                    <FaCalendarAlt className="text-xl text-purple-600" aria-hidden="true" />
                    <div>
                      <p className="uppercase tracking-widest text-xs text-gray-400 font-medium">
                        Event Date
                      </p>
                      <p className="text-sm font-semibold text-gray-100">
                        {countdownData.dateLabel}
                      </p>
                    </div>
                  </div>
                )}
                {countdownData.venue && (
                  <div
                    className="bg-[#000000] p-4 rounded-lg shadow-lg border border-gray-700/20 flex items-center gap-3 w-full max-w-[250px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    role="region"
                    aria-label="Venue"
                  >
                    <FaMapMarkerAlt className="text-xl text-purple-600" aria-hidden="true" />
                    <div>
                      <p className="uppercase tracking-widest text-xs text-gray-400 font-medium">
                        Venue
                      </p>
                      <p className="text-sm font-semibold text-gray-100">
                        {countdownData.venue}
                      </p>
                    </div>
                  </div>
                )}
                 <div
              className="flex gap-4 bg-[#000000] border border-gray-700/20 px-6 py-4 rounded-lg shadow-lg backdrop-blur-md"
              role="timer"
              aria-live="polite"
              aria-label={`Countdown to event: ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds`}
            >
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[60px]">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-100 drop-shadow-sm">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
              </div>
            )}

            {/* Countdown */}
           
          </>
        )}
      </div>
    </section>
  );
};

EventCountdown.propTypes = {
  countdownData: PropTypes.shape({
    eventDate: PropTypes.string.isRequired,
    dateLabel: PropTypes.string,
    venue: PropTypes.string,
  }),
};

EventCountdown.defaultProps = {
  countdownData: COUNTDOWN_DATA,
};

export default EventCountdown;