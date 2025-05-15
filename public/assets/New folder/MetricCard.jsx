import React from 'react';

const MetricCard = ({ icon, label, stat }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl mb-2">{icon}</div>
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-xl font-bold">{stat}</p>
    </div>
  );
};

export default MetricCard;