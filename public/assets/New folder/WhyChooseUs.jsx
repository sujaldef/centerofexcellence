import React from 'react';
import { FaLaptopCode, FaUsers, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import KPICard from './KPICard';

const WhyChooseUs = () => {
  const kpis = [
    {
      title: "Job Opportunity",
      icon: <FaLaptopCode className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Access top job openings through our network.",
    },
    {
      title: "Expert Speakers",
      icon: <FaUsers className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Learn from industry leaders and pioneers.",
    },
    {
      title: "Internship Programs",
      icon: <FaCalendarAlt className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Gain hands-on experience via internships.",
    },
    {
      title: "Community",
      icon: <FaTrophy className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Be a part of a supportive tech community.",
    },
    {
      title: "Industrial Partnering",
      icon: <FaLaptopCode className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Collaborate with industry-aligned partners.",
    },
    {
      title: "Work Culture",
      icon: <FaUsers className="text-[#6A1B9A] w-8 h-8" />,
      desc: "Thrive in an innovative and inclusive environment.",
    },
  ];

  return (
    <div className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-850 rounded-xl p-10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-gray-700/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-30 rounded-xl"></div>
            <div className="flex items-center gap-4">
              <div>{kpi.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-white">{kpi.title}</h3>
                <p className="text-sm text-gray-400">{kpi.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
