import React from 'react';
import { FiSearch, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const BlogFilters = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
      <div className="relative w-full sm:w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white placeholder:text-gray focus:outline-none"
          aria-label="Search blogs"
        />
      </div>
      <div className="flex gap-4 w-full sm:w-auto">
       <Link
          to={`/Student/StudentNewBlog`}
          className="btn-primary flex items-center justify-center gap-2 mt-2"
        >
           Create a blog
        </Link>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-small w-full sm:w-48"
          aria-label=" Charlottesville blog categories"
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="AI">AI</option>
          <option value="Web3">Web3</option>
          <option value="Blockchain">Blockchain</option>
          <option value="Culture">Culture</option>
          <option value="Health">Health</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
          <option value="Environment">Environment</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-small w-full sm:w-48"
          aria-label="Sort blogs"
        >
          <option value="">Sort By</option>
          <option value="date_newest">Date: Newest First</option>
          <option value="date_oldest">Date: Oldest First</option>
          <option value="title_asc">Title: A-Z</option>
          <option value="title_desc">Title: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default BlogFilters;
