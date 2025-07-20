// src/components/admin/BlogSection.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, publishBlog, rejectBlog, unpublishBlog, deleteBlog } from '../../../redux/slices/blogSlice';
import { toast } from 'react-toastify';
import Sidebar from '../AdminDashboard/Components/Sidebar';
import SmallBlogCard from './Components/SmallBlogCard';
import BlogCard from './Components/BlogCard';

const BlogSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [view, setView] = useState('all');

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Debug: Log blogs to check _id and authorType values
  useEffect(() => {
    console.log('Blogs:', blogs);
  }, [blogs]);

  // Toast error messages
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePublish = (id) => {
    if (!id) {
      console.error('Missing blog ID:', id);
      toast.error('Invalid blog ID');
      return;
    }
    dispatch(publishBlog(id));
  };

  const handleReject = (id) => {
    if (!id) {
      console.error('Missing blog ID:', id);
      toast.error('Invalid blog ID');
      return;
    }
    dispatch(rejectBlog(id));
  };

  const handleUnpublish = (id) => {
    if (!id) {
      console.error('Missing blog ID:', id);
      toast.error('Invalid blog ID');
      return;
    }
    dispatch(unpublishBlog(id));
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error('Missing blog ID:', id);
      toast.error('Invalid blog ID');
      return;
    }
    dispatch(deleteBlog(id));
  };

  const filteredBlogs = blogs
    .filter(blog =>
      blog._id && // Ensure _id exists
      (
        view === 'requests'
          ? blog.status === 'pending' && blog.authorType === 'student' // Pending student blogs
          : (
              blog.authorType === 'admin' || // All admin blogs
              (blog.authorType === 'student' && blog.status === 'accepted') // Accepted student blogs
            )
      ) &&
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
        <h1 className="text-3xl font-bold text-white mb-6">Blog Management</h1>
        <div className="p-4 rounded-xl bg-sub-dark mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                type="text"
                placeholder={`Search ${view === 'all' ? 'blogs' : 'student blog requests'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white placeholder-gray-500 focus:outline-none"
                aria-label={`Search ${view === 'all' ? 'blogs' : 'student blog requests'}`}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-sm"
                aria-label="Sort blogs"
              >
                <option value="">Sort By</option>
                <option value="date_newest">Date: Newest First</option>
                <option value="date_oldest">Date: Oldest First</option>
                <option value="title_asc">Title: A-Z</option>
                <option value="title_desc">Title: Z-A</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-sub-dark border border-[var(--border-accent)] text-white rounded-lg px-3 py-2 focus:outline-none text-sm"
                aria-label="Filter blog categories"
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
              <div className="flex gap-2">
                <button
                  onClick={() => setView('all')}
                  className={`btn-primary text-sm ${view === 'all' ? '' : 'bg-[var(--border-accent)]'}`}
                  aria-label="View all blogs"
                >
                  All Blogs
                </button>
                <button
                  onClick={() => setView('requests')}
                  className={`btn-primary text-sm ${view === 'requests' ? '' : 'bg-[var(--border-accent)]'}`}
                  aria-label="View student blog requests"
                >
                  Student Blog Requests
                </button>
              </div>
              <Link
                to="/admin/new-blog"
                className="btn-primary flex items-center gap-2 text-sm"
                aria-label="Add new blog"
              >
                <FiPlus /> Add Blog
              </Link>
            </div>
          </div>
        </div>
        {filteredBlogs.length === 0 ? (
          <p className="text-gray text-center">
            {view === 'requests' ? 'No pending student blog requests.' : 'No blogs found.'}
          </p>
        ) : (
          <div className={`grid gap-6 ${view === 'all' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredBlogs.map(blog => (
              view === 'all' ? (
                <SmallBlogCard
                  key={blog._id}
                  _id={blog._id}
                  poster={blog.poster}
                  title={blog.title}
                  description={blog.description}
                  authorName={blog.authorName}
                  authorType={blog.authorType}
                  category={blog.category}
                  status={blog.status}
                  onUnpublish={handleUnpublish}
                  onDelete={handleDelete}
                  onEdit={() => {
                    if (!blog._id) {
                      console.error('Missing blog ID for edit:', blog);
                      toast.error('Invalid blog ID');
                      return;
                    }
                    navigate(`/admin/blogs/edit/${blog._id}`);
                  }}
                  onPublish={handlePublish}
                />
              ) : (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  poster={blog.poster}
                  title={blog.title}
                  description={blog.description}
                  authorName={blog.authorName}
                  authorType={blog.authorType}
                  category={blog.category}
                  status={blog.status}
                  onPublish={handlePublish}
                  onReject={handleReject}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;