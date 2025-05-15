import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SearchAndFilters = ({ searchQuery, setSearchQuery, sortBy, setSortBy, filterType, setFilterType }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-sub-dark/50 border border-[var(--border-accent)]/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-200"
          aria-label="Search events"
        />
      </div>
      <div className="flex gap-3">
        <Link
          to="/admin/list-events"
          className="btn-primary"
          aria-label="Add new event"
        >
          <FiPlus /> Add Event
        </Link>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-sub-dark/50 border border-[var(--border-accent)]/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-small transition-all duration-200"
          aria-label="Sort events"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-sub-dark/50 border  text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-small transition-all duration-200"
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