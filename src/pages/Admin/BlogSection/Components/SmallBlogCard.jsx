import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SmallBlogCard = ({ _id, poster, title, description, authorName, category, status, onUnpublish, onDelete, onEdit, onPublish }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishAction, setPublishAction] = useState(null);

  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Published';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return '';
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(_id);
    setIsDeleteModalOpen(false);
  };

  const handleTogglePublish = () => {
    setPublishAction(status === 'accepted' ? 'unpublish' : 'publish');
    setIsPublishModalOpen(true);
  };

  const handlePublishConfirm = () => {
    if (publishAction === 'publish') {
      onPublish(_id);
    } else if (publishAction === 'unpublish') {
      onUnpublish(_id);
    }
    setIsPublishModalOpen(false);
  };

  const DeleteConfirmationModal = () => (
    <>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-md w-full">
            <h2 className="text-lg font-semibold text-white mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray mb-6">
              Are you sure you want to delete the blog <strong>{title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={handleDeleteConfirm} className="btn-primary">
                Confirm
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="btn-secondary">
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
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-sub-dark p-6 rounded-xl card max-w-md w-full">
            <h2 className="text-lg font-semibold text-white mb-4">
              Confirm {publishAction === 'publish' ? 'Publish' : 'Unpublish'}
            </h2>
            <p className="text-sm text-gray mb-6">
              Are you sure you want to {publishAction === 'publish' ? 'publish' : 'unpublish'} the blog{' '}
              <strong>{title}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={handlePublishConfirm} className="btn-primary">
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
        className="relative overflow-hidden rounded-xl bg-sub-dark p-4 flex flex-col gap-4 card"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-32">
          <img src={poster} alt={title} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-sub-dark)] via-transparent to-transparent opacity-70" />
          <div className="absolute top-2 left-2">
            <span className="text-sm bg-[var(--primary-color)] text-white px-2 py-1 rounded-full">{category}</span>
          </div>
          <div className="absolute top-2 right-2">
            <button
              onClick={handleTogglePublish}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${
                status === 'accepted' ? 'bg-[var(--primary-color)]' : 'bg-gray-600'
              }`}
              aria-label={status === 'accepted' ? 'Unpublish blog' : 'Publish blog'}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ${
                  status === 'accepted' ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-sm bg-[var(--border-accent)] text-white px-2 py-1 rounded-full">{getStatusText()}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
            <p className="text-sm text-gray line-clamp-2">{description}</p>
            <p className="text-sm text-gray mt-1">By {authorName}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Link to={`/admin/blog-details/${_id}`} className="btn-primary flex items-center justify-center gap-2">
              <FiEye /> View
            </Link>
            <Link to={`/admin/edit-blog/${_id}`} className="btn-primary flex items-center justify-center gap-2">
              <FiEdit /> Edit
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="btn-danger flex items-center justify-center gap-2"
            >
              <FiTrash /> Delete
            </button>
          </div>
        </div>
      </motion.div>
      <DeleteConfirmationModal />
      <PublishConfirmationModal />
    </>
  );
};

export default SmallBlogCard;