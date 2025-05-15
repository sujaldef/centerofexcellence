import React from 'react';

const StatCard = ({ label, value, trend }) => {
  return (
    <div className="bg-sub-dark p-6 rounded-xl shadow-xl border border-[var(--border-accent)]/20 card">
      <p className="text-sm text-gray">{label}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};

export default StatCard;