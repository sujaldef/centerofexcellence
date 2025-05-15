import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import BlogFilters from './Components/BlogFilters';
import UserBlogCard from './Components/UserBlogCard';
import BlogRequestsList from './Components/BlogRequestsList';
import BlogDetails from '../../Admin/BlogDetails/Components/BlogDetails';
import { fetchBlogs, clearError } from '../../../redux/slices/blogSlice';

const UserBlogSection = () => {
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
    <div className="flex min-h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-big font-bold text-white mb-6">Blogs</h1>
                <div className="p-4 rounded-xl bg-dark mb-6">
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
                      className={`btn-primary text-small ${view === 'all' ? '' : 'btn-secondary'}`}
                      aria-label="View all blogs"
                    >
                      All Blogs
                    </button>
                    <button
                      onClick={() => setView('requests')}
                      className={`btn-primary text-small ${view === 'requests' ? '' : 'btn-secondary'}`}
                      aria-label="View your blog requests"
                    >
                      My Requests
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
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

export default UserBlogSection;