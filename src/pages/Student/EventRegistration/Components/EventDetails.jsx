import React from 'react';
import EventHighlights from './EventHighlights';

const EventDetails = () => {
  return (
    <div
      
      className="md:w-2/5 bg-[#01010f] text-white p-10 flex flex-col items-start justify-center"
    >
      <img
        src="/event1.jpg"
        alt="Tech Innovation Summit"
        className="w-full max-w-md mb-6 rounded-xl shadow-md"
      />
      <div className="ml-10">
        <h1 className="text-3xl font-bold mb-2 text-left">
          Tech Innovation Summit 2024
        </h1>
        <p className="text-lg text-left mb-4">
          March 15-16, 2024 | 9:00 AM - 6:00 PM PST
        </p>
        <p className="text-left mb-2">San Francisco Convention Center</p>
        <p className="text-left mb-6">Organized by TechCorp Events</p>
        <p className="text-sm text-[var(--light)] text-left max-w-md">
          Join us for two days of inspiring talks, workshops, and networking
          opportunities with industry leaders in technology and innovation.
          Learn about the latest trends in AI, blockchain, and digital
          transformation while connecting with peers from around the globe.
        </p>
        <EventHighlights />
      </div>
    </div>
  );
};

export default EventDetails;