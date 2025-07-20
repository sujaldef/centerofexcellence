import React from 'react';

const EventCarouselCard = ({ event }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[350px] h-[500px] rounded-xl overflow-hidden z-10 bg-gray-900 flex flex-col justify-end shadow-2xl">
      <img
        src={event.image}
        alt="Main Event"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-3xl font-bold">{event.name}</h3>
          <p className="text-md">{event.venue} • {event.date}</p>
        </div>
        <div className="flex justify-between gap-4">
          <a
            href="./register-event/:id"
            className="w-1/2 text-center px-4 py-2 text-sm rounded-full font-semibold bg-gradient-to-r from-[#6A1B9A] to-[#AB47BC] text-white"
          >
            Apply Now
          </a>
          <a
            href="./event-details"
            className="w-1/2 text-center border border-[#ffffff] text-[#ffffff] px-4 py-2 text-sm rounded-full"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCarouselCard;