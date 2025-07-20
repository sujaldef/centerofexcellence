// src/Components/EventHighlights.jsx
import React from 'react';
import { FaRegCalendarAlt, FaUsers, FaLightbulb, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const iconMap = {
  keynote: FaRegCalendarAlt,
  workshop: FaUsers,
  networking: FaLightbulb,
  showcase: FaGraduationCap,
  career: FaBriefcase,
};

const EventHighlights = ({ highlights }) => {
  return (
    <div className="mt-6 p-6 bg-[#01010f] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Event Highlights</h2>
      <ul className="text-sm list-none space-y-3">
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.type.toLowerCase()] || FaLightbulb;
            return (
              <li key={index} className="flex items-center">
                <Icon className="mr-2 text-[var(--primary)]" />
                {highlight.title || highlight.description}
              </li>
            );
          })
        ) : (
          <li className="text-gray-400">No highlights available</li>
        )}
      </ul>
    </div>
  );
};

export default EventHighlights;