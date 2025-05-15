import { motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';

const BlogCard = ({ _id, image, title, description, author, date, index, hovered, setHovered }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const decodeAndShow = async () => {
      try {
        if (img.complete) {
          await img.decode();
        } else {
          img.onload = async () => {
            try {
              await img.decode();
              setIsLoaded(true);
            } catch (err) {
              console.error('Decode failed:', err);
              setIsLoaded(true); // Fallback to show image anyway
            }
          };
          return;
        }
        setIsLoaded(true);
      } catch (err) {
        console.error('Image decode error:', err);
        setIsLoaded(true); // Fallback
      }
    };

    decodeAndShow();
  }, [image]);

  // Sanitize the description HTML
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg bg-[#1a1a2e] border-2 border-[#333] dark:border-[#555] transition-transform"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          ref={imgRef}
          src={image || 'https://via.placeholder.com/300x200'}
          alt={title}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          draggable={false}
          loading="lazy"
        />
      </div>

      <div className="p-5 space-y-3 text-center">
        <h3 className="text-xl font-bold text-gray-100 line-clamp-2">{title}</h3>
        <div
          className="text-sm text-gray-400"
          style={{
            maxHeight: '3.75em', // Approximate height for 3 lines (text-sm: ~0.875rem, line-height: ~1.25rem)
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            lineHeight: '1.25rem', // Consistent line height
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
        <div className="text-xs text-gray-500 flex justify-center space-x-2">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(BlogCard);