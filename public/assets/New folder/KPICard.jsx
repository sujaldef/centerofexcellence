import React from 'react';

const KPICard = ({ title, icon, desc }) => {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-gray-800 to-black text-white">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
};

export default KPICard;