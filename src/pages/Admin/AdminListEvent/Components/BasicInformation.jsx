import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BasicInformation = ({ formData, handleInputChange, errors }) => {
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);
  const [customTag, setCustomTag] = useState('');

  // SVG for Keyboard Icon
  const KeyboardIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <path d="M6 8h12M6 12h12M6 16h12M8 8v8M10 8v8M12 8v8M14 8v8M16 8v8" />
    </svg>
  );

  // SVG for Layer Group Icon
  const LayerGroupIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  // SVG for Calendar Icon
  const CalendarIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  // SVG for Map Marker Icon
  const MapMarkerIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  // SVG for Users Icon (for Holding Capacity)
  const UsersIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  // SVG for Tags Icon
  const TagsIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );

  const handleChangeWithToast = (e) => {
    handleInputChange(e);
  };

  const handleTagChange = (tag) => {
    const tags = Array.isArray(formData.tags) ? formData.tags : [];
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    handleInputChange({ target: { name: 'tags', value: updatedTags } });
  };

  const handleCustomTagSubmit = () => {
    if (customTag.trim() && !(Array.isArray(formData.tags) && formData.tags.includes(customTag.trim()))) {
      const updatedTags = [...(Array.isArray(formData.tags) ? formData.tags : []), customTag.trim()];
      handleInputChange({ target: { name: 'tags', value: updatedTags } });
      setCustomTag('');
      setShowCustomTagInput(false);
      toast.success('Custom tag added!');
    } else if (Array.isArray(formData.tags) && formData.tags.includes(customTag.trim())) {
      toast.error('Tag already exists!');
    }
  };

  const predefinedTags = ['AI', 'Blockchain', 'Web Development', 'Cybersecurity', 'DevOps'];

  return (
    <section className="bg-dark rounded-xl p-6 card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Basic Information</h3>

      <div className="space-y-6">
        {/* Name and Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <KeyboardIcon />
            <input
              name="name"
              value={formData.name}
              onChange={handleChangeWithToast}
              className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
              placeholder="Enter event name"
              aria-label="Event name"
            />
          </div>
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <LayerGroupIcon />
            <select
              name="category"
              value={formData.category}
              onChange={handleChangeWithToast}
              className="w-full p-3 bg-sub-dark text-white transition-all duration-200 appearance-none"
              aria-label="Event category"
            >
              <option value="">Select category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1">
          {errors.name && <p className="text-red-500 text-sm animate-fadeIn">{errors.name}</p>}
          {errors.category && <p className="text-red-500 text-sm animate-fadeIn">{errors.category}</p>}
        </div>

        {/* Type (Radio) */}
        <div className="flex items-center gap-6">
          <label className="flex items-center text-gray cursor-pointer">
            <input
              type="radio"
              name="type"
              value="Physical"
              checked={formData.type === 'Physical'}
              onChange={handleChangeWithToast}
              className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
              aria-label="Physical event"
            />
            Physical
          </label>
          <label className="flex items-center text-gray cursor-pointer">
            <input
              type="radio"
              name="type"
              value="Virtual"
              checked={formData.type === 'Virtual'}
              onChange={handleChangeWithToast}
              className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
              aria-label="Virtual event"
            />
            Virtual
          </label>
        </div>
        {errors.type && <p className="text-red-500 text-sm animate-fadeIn">{errors.type}</p>}

        {/* Date, Location, and Holding Capacity Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <CalendarIcon />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChangeWithToast}
              className="w-full p-3 bg-transparent text-white transition-all duration-200"
              aria-label="Event date"
            />
          </div>
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <MapMarkerIcon />
            <input
              name="location"
              value={formData.location}
              onChange={handleChangeWithToast}
              className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
              placeholder="Enter location or meeting link"
              aria-label="Event location or meeting link"
            />
          </div>
          {formData.type === 'Physical' && (
            <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
              <UsersIcon />
              <input
                type="number"
                name="holdingCapacity"
                value={formData.holdingCapacity || ''}
                onChange={handleChangeWithToast}
                min="1"
                className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
                placeholder="Enter holding capacity"
                aria-label="Event holding capacity"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-1">
          {errors.date && <p className="text-red-500 text-sm animate-fadeIn">{errors.date}</p>}
          {errors.location && <p className="text-red-500 text-sm animate-fadeIn">{errors.location}</p>}
          {formData.type === 'Physical' && errors.holdingCapacity && (
            <p className="text-red-500 text-sm animate-fadeIn">{errors.holdingCapacity}</p>
          )}
        </div>

        {/* Tags Row */}
        <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
          <TagsIcon />
          <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    (Array.isArray(formData.tags) && formData.tags.includes(tag))
                      ? 'bg-[var(--border-accent)] text-white'
                      : 'bg-gray-700 text-gray-300'
                  } hover:bg-[var(--border-accent)]/80 transition-all duration-200`}
                  aria-label={`Toggle ${tag} tag`}
                >
                  {tag}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowCustomTagInput(!showCustomTagInput)}
                className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300 hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                aria-label="Add custom tag"
              >
                + Custom Tag
              </button>
            </div>
            {showCustomTagInput && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="w-full p-2 bg-transparent text-white placeholder-gray border border-[var(--border-accent)]/50 rounded-xl"
                  placeholder="Enter custom tag"
                  aria-label="Custom tag input"
                />
                <button
                  type="button"
                  onClick={handleCustomTagSubmit}
                  className="px-3 py-1 bg-[var(--border-accent)] text-white rounded-xl hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                  aria-label="Submit custom tag"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
        {errors.tags && <p className="text-red-500 text-sm animate-fadeIn">{errors.tags}</p>}
      </div>
    </section>
  );
};

export default BasicInformation;