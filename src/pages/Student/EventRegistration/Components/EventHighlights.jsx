import React from 'react';
import { FaRegCalendarAlt, FaUsers, FaLightbulb, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const EventHighlights = () => {
  return (
    <div className="mt-6 p-6 bg-[#01010f] text-white  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Event Highlights</h2>
      <ul className="text-sm list-none space-y-3">
        <li className="flex items-center">
          <FaRegCalendarAlt className="mr-2 text-[var(--primary)]" /> 40+ Expert Speakers
        </li>
        <li className="flex items-center">
          <FaUsers className="mr-2 text-[var(--primary)]" /> Interactive Workshops
        </li>
        <li className="flex items-center">
          <FaLightbulb className="mr-2 text-[var(--primary)]" /> Networking Sessions
        </li>
        <li className="flex items-center">
          <FaGraduationCap className="mr-2 text-[var(--primary)]" /> Innovation Showcase
        </li>
        <li className="flex items-center">
          <FaBriefcase className="mr-2 text-[var(--primary)]" /> Career Fair
        </li>
      </ul>
    </div>
  );
};

export default EventHighlights;