
import React from 'react';

const SearchFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 p-2 bg-sub-dark backdrop-blur-sm text-white rounded-lg border border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        aria-label="Search events by title or category"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="flex-1 p-2 bg-[var(--primary-color)] bg-opacity-20 backdrop-blur-md text-white rounded-lg border border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] appearance-none cursor-pointer hover:bg-opacity-30"
        aria-label="Filter events by category"
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat} className="bg-dark text-white">
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;
