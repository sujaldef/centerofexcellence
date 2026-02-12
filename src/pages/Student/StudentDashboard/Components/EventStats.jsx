import React from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiCheckCircle, FiActivity } from 'react-icons/fi';

const STATS_DATA = [
  { 
    id: 'registered',
    icon: FiCalendar, 
    value: "12", 
    label: "Events Registered", 
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  { 
    id: 'attended',
    icon: FiCheckCircle, 
    value: "8", 
    label: "Events Attended", 
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  { 
    id: 'active',
    icon: FiActivity, 
    value: "3", 
    label: "Active Applications", 
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

const EventStats = () => {
  return (
    <section className="px-6 mb-8 w-full max-w-7xl mx-auto" aria-label="Event Statistics">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS_DATA.map((stat) => (
          <div
            key={stat.id}
            className="group relative bg-[#0a0a1a] border border-white/10 rounded-xl p-6 flex items-center gap-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f1f]"
          >
            {/* Background Glow on Hover */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${stat.bg.replace('/10', '/50')}`} />

            {/* Icon Box */}
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} border border-white/5`}>
              <stat.icon size={24} />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white font-mono tracking-tight leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventStats;