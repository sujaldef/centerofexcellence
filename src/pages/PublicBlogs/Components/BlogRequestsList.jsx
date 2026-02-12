import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, FileText } from 'lucide-react';

const BlogRequestsList = ({ userBlogs }) => {
  
  const getStatusConfig = (status) => {
    switch (status) {
      case 'accepted':
        return { 
          text: 'Published', 
          color: 'text-green-400', 
          bg: 'bg-green-500/10', 
          border: 'border-green-500/20',
          icon: <CheckCircle2 size={16} /> 
        };
      case 'pending':
        return { 
          text: 'In Review', 
          color: 'text-yellow-400', 
          bg: 'bg-yellow-500/10', 
          border: 'border-yellow-500/20',
          icon: <Clock size={16} /> 
        };
      case 'rejected':
        return { 
          text: 'Rejected', 
          color: 'text-red-400', 
          bg: 'bg-red-500/10', 
          border: 'border-red-500/20',
          icon: <XCircle size={16} /> 
        };
      default:
        return { text: 'Unknown', color: 'text-gray-400', bg: 'bg-gray-500/10', icon: null };
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (userBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-white/5 rounded-2xl bg-white/5 text-center">
        <div className="p-4 bg-white/5 rounded-full mb-4">
            <FileText size={32} className="text-gray-600" />
        </div>
        <p className="text-gray-400">You haven't submitted any blogs yet.</p>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
      {userBlogs.map((blog) => {
        const status = getStatusConfig(blog.status);
        return (
          <motion.div
            key={blog._id}
            variants={item}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-[#0a0a12] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4 sm:mb-0">
              <div className={`p-3 rounded-lg bg-gradient-to-br from-gray-800 to-black border border-white/5`}>
                 <span className="text-xl">📄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  {blog.category}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${status.bg} ${status.border} ${status.color}`}>
              {status.icon}
              <span className="text-xs font-bold uppercase tracking-wider">{status.text}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default BlogRequestsList;