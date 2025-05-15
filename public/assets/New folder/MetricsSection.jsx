import React from 'react';
import { FaLaptopCode, FaUsers, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import MetricCard from './MetricCard';

const MetricsSection = () => {
  const metrics = [
    { icon: <FaLaptopCode />, label: "Projects", stat: "120+" },
    { icon: <FaUsers />, label: "Participants", stat: "3000+" },
    { icon: <FaCalendarAlt />, label: "Events", stat: "15+" },
    { icon: <FaTrophy />, label: "Awards", stat: "50+" },
  ];

  return (
    <div className="py-10" style={{ background: 'var(--gradient-bg)' }}>
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-20 gap-10 text-white text-center">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            label={metric.label}
            stat={metric.stat}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsSection;