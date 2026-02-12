import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../../../redux/slices/blogSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import { ArrowLeft, MapPin, Calendar, User, Tag } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  const sanitizedContent = useMemo(() => {
    if (!selectedBlog?.description) return '';
    return DOMPurify.sanitize(selectedBlog.description);
  }, [selectedBlog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex justify-center pt-20">
        <div className="animate-pulse w-full max-w-3xl px-6">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-800 rounded-xl mb-6"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!selectedBlog) return null;

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 font-sans pb-20">
      
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-800 bg-[#111]/95 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link 
            to="/PublicBlogs" 
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-8">
        
        {/* Header Section: Title & Meta */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
             <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit">
               <Tag size={12} className="mr-1"/> {selectedBlog.category}
             </span>
             {selectedBlog.date && (
               <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit">
                 <Calendar size={12} className="mr-1"/> {selectedBlog.date}
               </span>
             )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {selectedBlog.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                {selectedBlog.authorName?.charAt(0) || <User size={14} />}
              </div>
              <span className="text-white">{selectedBlog.authorName}</span>
            </div>
            {selectedBlog.venue && (
              <>
                <span className="text-gray-600">•</span>
                <span className="flex items-center text-gray-400">
                  <MapPin size={14} className="mr-1" /> {selectedBlog.venue}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Compact Banner Image */}
        {/* We use h-64 (256px) or md:h-80 (320px) to keep it from being "too big" */}
        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 border border-gray-800">
          <img
            src={selectedBlog.poster || '/default-image.jpg'}
            alt={selectedBlog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400
          prose-img:rounded-lg">
          <ReactMarkdown
            children={sanitizedContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </article>

      </div>
    </div>
  );
};

export default BlogDetails;