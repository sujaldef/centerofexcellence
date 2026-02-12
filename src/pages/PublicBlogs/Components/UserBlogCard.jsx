import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, User, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';

const UserBlogCard = ({ id, image, title, description, author, category }) => {
  
  // Helper: Strip HTML tags for the clean text preview
  const createMarkup = (html) => {
    const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    const doc = new DOMParser().parseFromString(clean, 'text/html');
    return doc.body.textContent || "";
  };

  const plainTextDescription = createMarkup(description);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col h-full bg-[#0a0a12] border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent opacity-90" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-6 pt-2">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        {/* Description Preview (Line Clamped) */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {plainTextDescription}
        </p>

        {/* Footer Meta & Link */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
             <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-[10px]">
               {author?.charAt(0) || <User size={12}/>}
             </div>
             <span>{author}</span>
          </div>

          <Link
            to={`/PublicBlogs/${id}`}
            className="flex items-center gap-1 text-sm font-semibold text-white group-hover:text-purple-400 transition-colors"
          >
            Read
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default UserBlogCard;