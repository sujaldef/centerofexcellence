import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BlogCard = ({ _id, poster, title, description, authorName, category, status, onPublish, onReject }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  console.log('BlogCard Props:', { _id, title, status });

  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Published';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const handleRejectConfirm = () => {
    if (!_id) {
      console.error('Missing blog ID:', _id);
      return;
    }
    onReject(_id);
    setIsRejectModalOpen(false);
  };

  const handlePublishConfirm = () => {
    if (!_id) {
      console.error('Missing blog ID:', _id);
      return;
    }
    onPublish(_id);
    setIsPublishModalOpen(false);
  };

  const isValidId = _id && typeof _id === 'string';

  const RejectConfirmationModal = () => (
    <>
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-md w-full">
            <h2 className="text-lg font-semibold text-white mb-4">Confirm Rejection</h2>
            <p className="text-sm text-gray mb-6">
              Are you sure you want to reject the blog <strong>{title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={handleRejectConfirm} className="btn-primary" disabled={!isValidId}>
                Confirm
              </button>
              <button onClick={() => setIsRejectModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const PublishConfirmationModal = () => (
    <>
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-md w-full">
            <h2 className="text-lg font-semibold text-white mb-4">Confirm Publish</h2>
            <p className="text-sm text-gray mb-6">
              Are you sure you want to publish the blog <strong>{title}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={handlePublishConfirm} className="btn-primary" disabled={!isValidId}>
                Confirm
              </button>
              <button onClick={() => setIsPublishModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-xl bg-sub-dark flex flex-row items-center p-4 gap-4 card"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-32 h-32 flex-shrink-0 relative">
          <img src={poster} alt={title} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-sub-dark)] via-transparent to-transparent opacity-70" />
          <div className="absolute top-2 left-2">
            <span className="text-sm bg-[var(--primary-color)] text-white px-2 py-1 rounded-full">{category || 'Uncategorized'}</span>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-sm bg-[var(--border-accent)] text-white px-2 py-1 rounded-full">{getStatusText()}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white truncate">{title || 'Untitled'}</h3>
            <p className="text-sm text-gray line-clamp-2">{description || 'No description available'}</p>
            <p className="text-sm text-gray mt-1">By {authorName || 'Unknown Author'}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Link
            to={isValidId ? `/admin/blogs-details/${_id}` : '#'}
            className={`btn-primary flex items-center justify-center gap-2 ${!isValidId ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (!isValidId) {
                console.error('Invalid blog ID for view:', _id);
                return false;
              }
            }}
          >
            <FiEye /> View
          </Link>
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="btn-primary flex items-center justify-center gap-2"
            disabled={!isValidId}
          >
            <FiCheck /> Publish
          </button>
          <button
            onClick={() => setIsRejectModalOpen(true)}
            className="btn-danger flex items-center justify-center gap-2"
            disabled={!isValidId}
          >
            <FiX /> Deny
          </button>
        </div>
      </motion.div>
      <RejectConfirmationModal />
      <PublishConfirmationModal />
    </>
  );
};

export default BlogCard;