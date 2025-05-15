import React from 'react';

const STATS_DATA = [
  { label: 'Total Events', value: 52, detail: 'Across all categories' },
  { label: 'Active Users', value: 1245, detail: 'total users' },
  { label: 'Total Attendees', value: 320, detail: 'Total registrations' },
];

const StatsCard = ({ showStatsDetails, setShowStatsDetails }) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mr-20 gap-4 place-items-center">
        {STATS_DATA.map((stat, i) => (
          <div
            key={i}
            className="bg-sub-dark rounded-xl p-5 kpi-card w-full max-w-xs flex flex-col items-center text-center"
          >
            <h2 className="text-sm text-white/60 uppercase tracking-wide">{stat.label}</h2>
            <p className="text-3xl font-bold text-[var(--primary-color)]">{stat.value}</p>
            {showStatsDetails && (
              <p className="text-sm text-white/70 mt-1">{stat.detail}</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowStatsDetails(!showStatsDetails)}
        className="absolute top-2 right-2 text-[var(--primary-color)] hover:text-[var(--border-accent)] text-sm font-medium transition-colors"
        aria-label={showStatsDetails ? 'Hide stats details' : 'Show stats details'}
      >
        {showStatsDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default StatsCard;