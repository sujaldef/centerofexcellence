import React from 'react';
import { Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogFilters = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortBy, setSortBy }) => {
  
  // Shared class for all inputs to ensure perfect alignment
  const inputBaseClass = "w-full bg-[#0a0a12] border border-white/10 text-gray-300 text-sm rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-sm hover:bg-white/5";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-3 mb-8"
    >
      {/* Search Input - Flexible Width */}
      <div className="relative w-full md:flex-1 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={14} className="text-gray-500 group-focus-within:text-purple-400 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${inputBaseClass} pl-9 pr-3 py-2`}
        />
      </div>

      {/* Filter & Sort - Compact Row */}
      <div className="flex gap-3 w-full md:w-auto">
        
        {/* Category Dropdown */}
        <div className="relative w-full md:w-40 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter size={14} className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`${inputBaseClass} pl-9 pr-8 py-2 appearance-none cursor-pointer`}
          >
            <option value="">All Topics</option>
            <option value="Tech">Tech</option>
            <option value="AI">AI</option>
            <option value="Web3">Web3</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Culture">Culture</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-600">
            <ChevronDown size={12} />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-40 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ArrowUpDown size={14} className="text-gray-500 group-focus-within:text-pink-400 transition-colors" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${inputBaseClass} pl-9 pr-8 py-2 appearance-none cursor-pointer`}
          >
            <option value="">Sort By</option>
            <option value="date_newest">Newest</option>
            <option value="date_oldest">Oldest</option>
            <option value="title_asc">A-Z</option>
          </select>
           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-600">
            <ChevronDown size={12} />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default BlogFilters;