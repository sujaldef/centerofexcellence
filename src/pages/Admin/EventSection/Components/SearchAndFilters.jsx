import React from 'react';
import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from 'react-icons/fi';

const SearchAndFilters = ({ searchQuery, setSearchQuery, sortBy, setSortBy, filterType, setFilterType, onAddEvent }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      <div className="relative w-full sm:w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white placeholder-text-gray focus:outline-none"
          aria-label="Search events"
        />
      </div>
      <div className="flex gap-3">
      <Link to="/admin/list-events" className="btn-primary" aria-label="Add new event">
  <FiPlus />
  Add Event
</Link>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-small"
          aria-label="Sort events"
        >
          <option value="">Sort By</option>
          <option value="date_newest">Date: Newest First</option>
          <option value="date_oldest">Date: Oldest First</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-small"
          aria-label="Filter event types"
        >
          <option value="">All Types</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;