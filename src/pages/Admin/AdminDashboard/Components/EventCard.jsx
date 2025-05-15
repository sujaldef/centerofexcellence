import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiEye } from 'react-icons/fi';

const EventCard = ({ event, section, index }) => {
  // Map status to Tailwind CSS classes
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-yellow-600';
      case 'Cancelled':
        return 'bg-red-600';
      case 'Completed':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-sub-dark p-5 rounded-xl card">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-base text-white tracking-tight">{event.title}</p>
          <p className="text-xs text-white/60 mt-1">
            {event.type} • {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm mt-2 text-white/80">{event.attendees} attendees</p>
          <span
            className={`text-xs px-3 py-1 rounded-full inline-block mt-2 font-medium text-white ${getBadgeColor(event.status)}`}
          >
            {event.status}
          </span>
        </div>
        <div className="flex flex-col gap-3 ml-4">
          <Link
            to="/admin/manage-events"
            className="btn-primary"
            aria-label={`Manage ${event.title}`}
            onClick={() => console.log(`Managing ${event.title}`)}
          >
            <FiSettings /> Manage
          </Link>
          <Link
            to={`/event-detail?event_id=${event.event_id}`}
            className="btn-secondary"
            aria-label={`View ${event.title}`}
            onClick={() => console.log(`Viewing ${event.title} details`)}
          >
            <FiEye /> View
          </Link>
        </div>
      </div>

      {/* HIDDEN DIV TO KEEP TAILWIND COLORS */}
      <div className="hidden">
        bg-green-600 bg-yellow-600 bg-red-600 bg-blue-600 bg-gray-600
      </div>
    </div>
  );
};

export default EventCard;