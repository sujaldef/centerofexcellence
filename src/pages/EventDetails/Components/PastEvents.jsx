import React, { memo } from "react";

// Constant for past events data
const PAST_EVENTS = [
  {
    title: "MACHINE LEARN",
    tag: "AI Summit 2024",
    location: "Tech Center",
    date: "March 15-16, 2024",
    time: "09:00 AM - 06:00 PM",
    image: "/past1.png",
  },
  {
    title: "Web3 Conference",
    tag: "Web3 Conference",
    location: "Innovation Hub",
    date: "April 5-6, 2024",
    time: "10:00 AM - 05:00 PM",
    image: "/past1.png",
  },
  {
    title: "DevOps Summit",
    tag: "DevOps Summit",
    location: "Skyline Hall",
    date: "April 20-21, 2024",
    time: "09:30 AM - 04:30 PM",
    image: "/past1.png",
  },
  {
    title: "Web3 Conference",
    tag: "Web3 Conference",
    location: "Virtual Event",
    date: "April 5-6, 2024",
    time: "10:00 AM - 05:00 PM",
    image: "/past1.png",
  },
];

const PastEvents = () => {
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
          {PAST_EVENTS?.map((event, index) => (
            <div
              key={index}
              className="relative bg-[#000000] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(PastEvents);