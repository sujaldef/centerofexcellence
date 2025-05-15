import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../../../../redux/slices/blogSlice';

export default function BlogSection() {
  const [hovered, setHovered] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Filter published blogs
  const publishedBlogs = useMemo(() => blogs.filter((blog) => blog.published), [blogs]);

  const handleHover = useCallback((index) => setHovered(index), []);
  const handleHoverEnd = useCallback(() => setHovered(null), []);

  const handleClick = (id) => {
    navigate(`/PublicBlogs/${id}`);
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="py-16 px-4 bg-gray-950 text-gray-100 overflow-hidden relative"
      role="region"
      aria-label="Blog posts section"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">From the Blog</h2>

        {loading && <p className="text-center">Loading blogs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && publishedBlogs.length === 0 && (
          <p className="text-center">No published blogs available.</p>
        )}

        {!loading && publishedBlogs.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map((post, index) => (
              <div
                key={`post-${post._id}-${index}`}
                onClick={() => handleClick(post._id)}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleHoverEnd}
                className={`w-full transition-transform duration-300 ease-out ${
                  hovered !== null && hovered !== index ? 'scale-95 opacity-80' : ''
                }`}
              >
                <BlogCard
                  _id={post._id}
                  image={post.poster}
                  title={post.title}
                  description={post.description}
                  author={post.authorName}
                  date={new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  index={index}
                  hovered={hovered}
                  setHovered={handleHover}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleHover(index);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}