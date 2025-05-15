import React, { useState } from 'react';
import { toast } from 'react-toastify';

// SVG for Upload Icon
const UploadIcon = () => (
  <svg
    className="text-[var(--border-accent)] w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

// SVG for Trash Icon
const TrashIcon = () => (
  <svg
    className="text-red-500 w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// SVG for Times Icon
const TimesIcon = () => (
  <svg
    className="text-red-500 w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpeakersOrganizers = ({ speakers, handleSpeakerChange, handleSpeakerImage, addSpeaker, deleteSpeaker }) => {
  const [selectedType, setSelectedType] = useState('');

  const highlightTypes = [
    'Speaker',
    'Chief Guest',
    'Keynote',
    'Announcements',
    'Workshop',
    'Discussion',
    'Custom',
  ];

  const getHeaderStyle = (type) => {
    // Handle undefined or invalid types
    if (!type) return 'speaker-header-custom';
    return `speaker-header-${type.toLowerCase().replace(' ', '-')}`;
  };

  const handleTypeSelect = (type) => {
    if (!type) return;
    addSpeaker(type);
    setSelectedType('');
  };

  const renderPersonFields = (speaker, idx) => (
    <div className="space-y-4">
      <div className="relative w-24 h-24 mx-auto group">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--border-accent)] bg-sub-dark flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name || 'Person'}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm text-gray">No Image</span>
          )}
        </div>
        {speaker.image && (
          <button
            onClick={() => handleSpeakerChange(idx, 'image', '')}
            className="absolute top-0 right-0 btn-danger p-1.5 rounded-full"
          >
            <TimesIcon />
          </button>
        )}
      </div>
      <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-[var(--border-accent)]">
        <UploadIcon /> Upload Photo
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleSpeakerImage(e, idx)}
        />
      </label>
      {['name', 'role', 'description', 'email'].map((field) => (
        <div key={field} className="relative">
          <input
            value={speaker[field] || ''}
            onChange={(e) => handleSpeakerChange(idx, field, e.target.value)}
            maxLength={field === 'description' ? 200 : field === 'email' ? 100 : undefined}
            type={field === 'email' ? 'email' : 'text'}
            className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
            placeholder={
              field === 'name'
                ? 'Full Name'
                : field === 'role'
                ? 'Role / Title'
                : field === 'description'
                ? 'Description'
                : 'Email Address'
            }
          />
          {field === 'description' && (
            <span className="absolute right-2 top-2 text-xs text-gray">
              {(speaker.description || '').length}/200
            </span>
          )}
          {field === 'email' && (
            <span className="absolute right-2 top-2 text-xs text-gray">
              {(speaker.email || '').length}/100
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const renderEventFields = (speaker, idx) => (
    <div className="space-y-4">
      <div className="relative">
        <input
          value={speaker.title || ''}
          onChange={(e) => handleSpeakerChange(idx, 'title', e.target.value)}
          className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
          placeholder="Event Title"
        />
      </div>
      <div className="relative">
        <textarea
          value={speaker.description || ''}
          onChange={(e) => handleSpeakerChange(idx, 'description', e.target.value)}
          maxLength={500}
          className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
          placeholder="Event Description"
          rows={4}
        />
        <span className="absolute right-2 bottom-2 text-xs text-gray">
          {(speaker.description || '').length}/500
        </span>
      </div>
    </div>
  );

  const renderCustomFields = (speaker, idx) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          value={speaker.customType || ''}
          onChange={(e) => handleSpeakerChange(idx, 'customType', e.target.value)}
          className="flex-1 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
          placeholder="Enter Custom Type"
        />
        <button
          onClick={() => {
            if (!speaker.customType.trim()) {
              toast.error('Please enter a custom type');
              return;
            }
            handleSpeakerChange(idx, 'type', speaker.customType.trim());
            toast.success('Custom type created');
          }}
          className="btn-primary"
        >
          Create
        </button>
      </div>
      {speaker.type !== 'Custom' && renderEventFields(speaker, idx)}
    </div>
  );

  return (
    <section className="bg-dark rounded-xl p-6 card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Highlights , Speakers & Organizers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            className="relative bg-sub-dark rounded-xl p-6 space-y-4 border border-[var(--border-accent)]/50"
          >
            <div
              className={`text-center text-lg font-bold py-2 rounded-t-xl ${getHeaderStyle(speaker.type)}`}
            >
              {speaker.type || 'Custom'}
            </div>
            {['Speaker', 'Chief Guest'].includes(speaker.type)
              ? renderPersonFields(speaker, idx)
              : speaker.type === 'Custom' || !speaker.type
              ? renderCustomFields(speaker, idx)
              : renderEventFields(speaker, idx)}
            <button
              onClick={() => {
                deleteSpeaker(idx);
                toast.success(`${speaker.type || 'Custom'} removed successfully`);
              }}
              className="absolute top-2 right-2 btn-danger p-1.5 rounded-full"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <select
          value={selectedType}
          onChange={(e) => handleTypeSelect(e.target.value)}
          className="bg-sub-dark text-white p-2 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200 w-full sm:w-auto"
        >
          <option value="">Select a Type</option>
          {highlightTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default SpeakersOrganizers;