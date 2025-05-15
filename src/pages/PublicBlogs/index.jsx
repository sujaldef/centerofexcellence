import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import BlogFilters from './Components/BlogFilters';
import UserBlogCard from './Components/UserBlogCard';
import BlogRequestsList from './Components/BlogRequestsList';

import BlogDetails from './BlogDetails/BlogDetails';
import { fetchBlogs, clearError } from '../../redux/slices/blogSlice';

const PublicBlogSection = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [view, setView] = useState('all'); // 'all' (published blogs) or 'requests' (user's blogs)

  const currentUserId = 'user123'; // Hardcoded for demo; replace with auth user ID

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Blog fetch error:', error);
      setTimeout(() => dispatch(clearError()), 5000); // Clear error after 5s
    }
  }, [error, dispatch]);

  const publishedBlogs = blogs.filter((blog) => blog.published && blog.status === 'accepted');
  const userBlogs = blogs.filter((blog) => blog.authorId === currentUserId);

  const filteredBlogs = publishedBlogs
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (categoryFilter ? blog.category === categoryFilter : true)
    )
    .sort((a, b) => {
      if (sortBy === 'date_newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'date_oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#01010f]">
      <div className="max-w-7xl mx-auto px-6 py-4 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-3xl font-bold text-white mb-4">Blogs</h1>
                <div className="rounded-xl bg-dark mb-4">
                  <BlogFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setView('all')}
                      className={`btn-primary text-sm ${view === 'all' ? '' : 'btn-secondary'}`}
                      aria-label="View all blogs"
                    >
                      All Blogs
                    </button>
                  </div>
                </div>
                {loading ? (
                  <p className="text-gray text-center">Loading blogs...</p>
                ) : error ? (
                  <p className="text-red-500 text-center">{error}</p>
                ) : view === 'all' ? (
                  filteredBlogs.length === 0 ? (
                    <p className="text-gray text-center">No published blogs found.</p>
                  ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredBlogs.map((blog) => (
                        <UserBlogCard
                          key={blog._id}
                          id={blog._id}
                          image={blog.poster}
                          title={blog.title}
                          description={blog.description}
                          author={blog.authorName}
                          category={blog.category}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <BlogRequestsList userBlogs={userBlogs} />
                )}
              </>
            }
          />
          <Route path="/details/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default PublicBlogSection;