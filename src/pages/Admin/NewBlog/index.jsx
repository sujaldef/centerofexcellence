import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../../redux/slices/blogSlice';
import { FiX, FiUpload, FiCheck, FiPlus } from 'react-icons/fi';

const NewBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    authorType: 'admin',
    authorId: '', // Assume this is set by auth context
    authorName: '',
    authorProfilePic: '',
    tags: [],
    poster: '',
    description: '',
    category: '',
    published: false,
    status: 'pending',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const predefinedTags = ['ML', 'AI', 'Tech', 'Web3', 'Blockchain'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        setFormData({ ...formData, poster: event.target.result });
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
          }
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        setFormData({ ...formData, poster: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagSelect = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleAddNewTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBlog(formData)).unwrap();
      navigate('/admin/blog-section');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blogs');
  };

  return (
    <div className="min-h-screen bg-dark p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-big font-bold text-white">Create New Blog</h1>
          <button
            onClick={handleCancel}
            className="text-gray hover:text-[var(--primary-color)] transition-colors duration-300"
          >
            <FiX size={28} />
          </button>
        </div>
        <div className="md:col-span-1">
          <div
            className="w-full h-48 bg-sub-dark rounded-xl p-4 border-2 border-dashed border-[var(--border-accent)] hover:border-[var(--primary-color)] transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden card"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="w-full">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-center text-gray text-small">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            ) : previewImage ? (
              <img
                src={previewImage}
                alt="Blog Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <FiUpload size={32} className="text-[var(--primary-color)] mb-2" />
                <p className="text-gray text-center text-small mb-2">
                  Drag and drop an image, or click to upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="btn-primary cursor-pointer text-small"
                >
                  Upload
                </label>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-small font-medium text-gray mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-300 placeholder-text-gray"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div>
            <label className="block text-small font-medium text-gray mb-1">
              Author
            </label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-300 placeholder-text-gray"
              placeholder="Enter author name"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
          <div>
            <label className="block text-small font-medium text-gray mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-300 placeholder-text-gray"
              required
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="AI">AI</option>
              <option value="Web3">Web3</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Culture">Culture</option>
              <option value="Health">Health</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              <option value="Environment">Environment</option>
            </select>
          </div>
          <div>
            <label className="block text-small font-medium text-gray mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-small"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`btn-secondary text-small ${
                    formData.tags.includes(tag) ? 'bg-[var(--primary-color)] text-white' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {showTagInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-300 placeholder-text-gray"
                  placeholder="Add new tag"
                />
                <button
                  onClick={handleAddNewTag}
                  className="btn-primary flex items-center text-small"
                >
                  <FiPlus />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowTagInput(true)}
                className="btn-primary flex items-center text-small"
              >
                <FiPlus className="mr-2" /> Add Tag
              </button>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-small font-medium text-gray mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-sub-dark border border-[var(--border-accent)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-300 placeholder-text-gray"
            rows="5"
            placeholder="Enter blog description"
            required
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary mr-4 flex items-center text-small"
          >
            <FiX className="mr-2" /> Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary flex items-center text-small"
          >
            <FiCheck className="mr-2" /> Create Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;