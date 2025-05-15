import React from 'react';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const UserBlogCard = ({ id, image, title, description, author, category }) => {
  // Helper function to strip HTML tags and truncate text (kept for reference, not used)
  const stripHtmlAndTruncate = (html, maxLength = 100) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Sanitize the HTML description
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-sub-dark flex flex-col p-4 gap-4 card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-48 relative">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-sub-dark)] via-transparent to-transparent opacity-70" />
        <div className="absolute top-2 left-2">
          <span className="text-small bg-[var(--primary-color)] text-white px-2 py-1 rounded-full">{category}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-medium font-semibold text-white truncate">{title}</h3>
          <div
            className="text-small text-gray description-preview"
            style={{
              maxHeight: '2.5em', // Approximate height for 2 lines (text-small: 0.875rem, line-height: ~1.25rem)
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '1.25rem', // Ensure consistent line height
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
          <p className="text-small text-gray mt-1">By {author}</p>
        </div>
        <Link
          to={`/PublicBlogs/${id}`}
          className="btn-primary flex items-center justify-center gap-2 mt-2"
        >
          <FiEye /> View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default UserBlogCard;