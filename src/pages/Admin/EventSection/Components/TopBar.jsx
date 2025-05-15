import React from 'react';
import { BsBell, BsSortDown, BsFilter } from 'react-icons/bs';

const TopBar = ({
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  sortOption,
  setSortOption,
  toggleNotifications,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 rounded-xl bg-dark card">
      <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 rounded-lg bg-sub-dark text-gray border border-[var(--border-accent)] focus:outline-none w-full sm:w-64"
          disabled
          title="Use the search bar below for event searching"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <BsFilter className="text-[var(--primary-color)] text-lg" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded-lg bg-sub-dark text-gray border border-[var(--border-accent)] focus:outline-none text-small"
            aria-label="Filter by category"
          >
            <option value="">Category</option>
            <option value="AI">AI</option>
            <option value="Web3">Web3</option>
            <option value="DevOps">DevOps</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <BsSortDown className="text-[var(--primary-color)] text-lg" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-lg bg-sub-dark text-gray border border-[var(--border-accent)] focus:outline-none text-small"
            aria-label="Sort events"
          >
            <option value="">Sort By</option>
            <option value="date_newest">Date: Newest First</option>
            <option value="date_oldest">Date: Oldest First</option>
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
            <option value="status_upcoming">Status: Upcoming</option>
            <option value="status_ongoing">Status: Ongoing</option>
            <option value="status_past">Status: Past</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <BsFilter className="text-[var(--primary-color)] text-lg" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded-lg bg-sub-dark text-gray border border-[var(--border-accent)] focus:outline-none text-small"
            aria-label="Filter by event type"
          >
            <option value="">Type</option>
            <option value="In-Person">In-Person</option>
            <option value="Virtual">Virtual</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>
        <BsBell
          onClick={toggleNotifications}
          className="text-[var(--primary-color)] text-xl cursor-pointer"
          aria-label="Toggle notifications"
        />
      </div>
    </div>
  );
};

export default TopBar;