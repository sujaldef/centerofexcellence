import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiEye } from 'react-icons/fi';

const EventCard = ({ event }) => {
  const { _id, title, type, date, attendees } = event;

  return (
    <div className="bg-sub-dark p-5 rounded-xl card">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-base text-white tracking-tight">{title}</p>
          <p className="text-xs text-white/60 mt-1">
            {type} • {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-sm mt-2 text-white/80">{attendees} attendees</p>
        </div>

        <div className="flex flex-col gap-3 ml-4">
          <Link to={`/admin/manage-events/${_id}`} className="btn-primary flex-1 min-w-0">
            <FiSettings /> Manage
          </Link>
          <Link to={`/event-detail/${_id}`} className="btn-primary flex-1 min-w-0">
            <FiEye /> View
          </Link>
        </div>
      </div>

      {/* HIDDEN DIV TO KEEP TAILWIND COLORS */}
      <div className="hidden">
        bg-sub-dark text-white text-white/60 text-white/80
      </div>
    </div>
  );
};

export default EventCard;
