import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import EventCarouselCard from './EventCarouselCard';

const OngoingEvents = () => {
  const [eventIndex, setEventIndex] = useState(1);

  const upcomingEvents = [
    {
      name: "AI Hackathon",
      venue: "Auditorium A",
      date: "April 20, 2025",
      image: "/event1.jpg",
    },
    {
      name: "Cloud Bootcamp",
      venue: "Hall B",
      date: "May 10, 2025",
      image: "/event2.jpg",
    },
    {
      name: "DevFest",
      venue: "Lab C",
      date: "June 5, 2025",
      image: "/event1.jpg",
    },
  ];

  const prevEvent = () => {
    setEventIndex(
      (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
    );
  };

  const nextEvent = () => {
    setEventIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  const getSideEvent = (offset) => {
    const index =
      (eventIndex + offset + upcomingEvents.length) % upcomingEvents.length;
    return upcomingEvents[index];
  };

  return (
    <div>
      <h2 className="text-center text-white text-5xl mt-20 mb-18">
        Ongoing Events
      </h2>
      <div className="relative text-white flex justify-center items-center px-4">
        <button
          onClick={prevEvent}
          className="absolute left-4 z-30 ml-65 scale-150 p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <div className="relative w-[950px] h-[500px]">
          <div className="absolute ml-20 w-[350px] h-[450px] rounded-xl overflow-hidden z-0 transform translate-x-[-50px] translate-y-[75px]">
            <img
              src={getSideEvent(-1).image}
              alt="Left Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-10" />
          </div>
          <EventCarouselCard event={upcomingEvents[eventIndex]} />
          <div className="absolute top-0 right-0 w-[350px] mr-20 h-[450px] rounded-xl overflow-hidden z-0 transform translate-x-[50px] translate-y-[75px]">
            <img
              src={getSideEvent(1).image}
              alt="Right Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-10" />
          </div>
        </div>
        <button
          onClick={nextEvent}
          className="absolute right-4 mr-65 z-30 scale-150 p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default OngoingEvents;