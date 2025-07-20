import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

// Fallback image URL
const FALLBACK_IMAGE = "https://via.placeholder.com/300x150?text=Event+Image";

// Status colors
const statusColors = {
  upcoming: "#2196F3",
  registered: "#4CAF50",
  past: "#757575",
};

// Main component for rendering an event card
const EventCard = ({ id, title, category, venue, date, image, status }) => {
  // Parse the event date and compare with current date (May 2, 2025)
  const currentDate = new Date("2025-05-02");
  const eventDate = new Date(date); // Assumes date format like "Mar 15, 2024"
  const isUpcoming = eventDate > currentDate;

  return (
    <article
      className="min-w-[250px] h-[370px] rounded-lg overflow-hidden flex-shrink-0 flex flex-col text-white bg-[#0a0a1a] shadow-2xl border border-gray-700/20 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:min-w-[300px]"
      role="region"
      aria-label={`Event: ${title}`}
    >
      {/* Top 50% Image with Bottom Gradient */}
      <div
        className="relative h-[50%] w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${image || FALLBACK_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent flex items-end p-4 flex-wrap gap-2">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#AB47BC] text-[#ffffff] shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC]"
            role="label"
            tabIndex={0}
            aria-label={`Category: ${category}`}
          >
            {category}
          </span>
          {status && (
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white shadow-md"
              style={{ backgroundColor: statusColors[status] || "#757575" }}
              role="label"
              tabIndex={0}
              aria-label={`Status: ${status}`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      {/* Bottom 50% Content */}
      <div className="h-[50%] w-full bg-[#000000] p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-300">📍 {venue}</p>
          <p className="text-xs text-gray-300">🗓 {date}</p>
        </div>

        <div className="mt-3">
          {isUpcoming ? (
            <div className="flex gap-2">
              <Link
                to={`/student/event-registration/${id}`} // Changed event._id to id
                className="flex-1 text-center px-3 py-2 text-sm rounded-xl font-semibold bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 shadow-md hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition-all duration-200"
                aria-label={`Apply for ${title}`} // Changed event.eventName to title
              >
                Apply Now
              </Link>
              <Link
                to={`/event-detail/${id}`}
                className="flex-1 text-center px-3 py-2 text-sm rounded-xl font-semibold border-1 border-[#6A1B9A] text-[#ffffff] hover:bg-[#6A1B9A]/20 hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC]"
                aria-label={`View details for ${title}`}
              >
                View Details
              </Link>
            </div>
          ) : (
            <Link
              to={`/event-detail/${id}`}
              className="btn-primary flex-1 min-w-0 flex items-center justify-center gap-2 text-sm rounded-lg font-semibold text-[#ffffff] shadow-md hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC]"
              aria-label={`View event ${title}`}
            >
              <FiEye /> View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  status: PropTypes.string,
};

EventCard.defaultProps = {
  image: FALLBACK_IMAGE,
};

export default EventCard;