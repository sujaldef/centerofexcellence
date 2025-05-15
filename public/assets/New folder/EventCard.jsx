import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div
      className="relative flex rounded-lg overflow-hidden h-56 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${event.img})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 flex w-full">
        <div className="w-1/2"></div>
        <div className="p-4 flex flex-col items-center justify-between w-1/3">
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-300">{event.category}</p>
          </div>
          <a
            href="./eventdetails"
            className="border border-primary text-primary px-3 py-1 rounded-md"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;