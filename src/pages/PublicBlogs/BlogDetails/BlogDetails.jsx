import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../../../redux/slices/blogSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-gray-100 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!selectedBlog) return <p className="text-gray-100 text-center">Blog not found.</p>;

  return (
    <div className="min-h-screen bg-dark py-12 px-6 md:px-20">
      <div className="max-w-4xl flex justify-between items-center flex-col mx-auto">
        {/* Header */}
        <Link to="/PublicBlogs" className="btn-primary mb-6 w-[50%]">
          Back to Blogs
        </Link>
        <h1 className="text-big font-bold text-white mb-4">{selectedBlog.title}</h1>

        {/* Hero Image */}
        <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden card">
          <img
            src={selectedBlog.poster || '/default-image.jpg'}
            alt={selectedBlog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-sub-dark)] via-transparent to-transparent opacity-70" />
          <span className="absolute bottom-4 left-4 text-small bg-[var(--primary-color)] text-white px-3 py-1 rounded-full">
            {selectedBlog.category}
          </span>
        </div>

        {/* Author Info */}
        <div className="bg-sub-dark p-6 w-full rounded-xl card mb-6 flex items-center gap-4">
          <div>
            <h3 className="text-medium font-semibold text-white">By {selectedBlog.authorName}</h3>
            <p className="text-small text-gray-400">{selectedBlog.authorBio || 'No bio available.'}</p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-6 w-full rounded-xl text-white text-medium card prose prose-invert max-w-none">
          <h2 className="text-big font-semibold text-white mb-4">Blog Details</h2>
          <ReactMarkdown
            
            children={DOMPurify.sanitize(selectedBlog.description)}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
          {selectedBlog.venue && (
            <p className="text-big text-gray-400 mt-4">
              <strong>Venue:</strong> {selectedBlog.venue}
            </p>
          )}
          {selectedBlog.date && (
            <p className="text-big text-gray-400 mt-2">
              <strong>Date:</strong> {selectedBlog.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
