import React from 'react';

const TabButtons = ({ tabButtons, selectedTab, setSelectedTab }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 mb-6">
      {tabButtons.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold card ${
            selectedTab === tab.id ? 'btn-primary' : 'btn-secondary'
          }`}
          onClick={() => setSelectedTab(tab.id)}
          aria-label={`Show ${tab.label.toLowerCase()} events`}
        >
          <tab.icon size={16} className="mr-2" />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;