import React from 'react';

const QuickActions = ({ selectedFilter, setSelectedFilter }) => {
  const filters = [
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Past', value: 'past' },
    { label: 'Canceled', value: 'canceled' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setSelectedFilter(filter.value)}
          className={`btn-secondary text-small ${
            selectedFilter === filter.value
              ? 'btn-primary'
              : 'bg-secondary'
          }`}
          aria-label={`Filter by ${filter.label} events`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;