import React from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const EventMedia = ({ eventImage, thumbnail, handleImageChange, removeImage, setEventImage, setThumbnail }) => {
  // SVG for upload icon
  const UploadIcon = () => (
    <svg
      className="mx-auto mb-2 text-[var(--border-accent)]"
      width="40"
      height="40"
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

  if (!setEventImage || !setThumbnail) {
    return (
      <section className="bg-dark p-6 rounded-xl card border border-[var(--border-accent)]/50">
        <h3 className="text-lg font-semibold text-white mb-6">Event Media</h3>
        <p className="text-red-500">Error: Missing required setters for image updates.</p>
      </section>
    );
  }

  return (
    <section className="bg-dark p-6 rounded-xl card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Event Media</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: "Event Banner (720x320px)", setter: setEventImage, value: eventImage },
          { label: "Event Thumbnail (256x256px)", setter: setThumbnail, value: thumbnail },
        ].map(({ label, setter, value }, idx) => (
          <div
            key={idx}
            className="relative space-y-4 p-4 rounded-xl text-center border border-[var(--border-accent)]/50 bg-sub-dark"
          >
            <p className="mb-2 text-gray font-medium">{label}</p>
            {value ? (
              <div className="relative group">
                <img
                  src={value}
                  className="w-full max-h-48 object-cover rounded-xl mb-2 transition-transform duration-300 group-hover:scale-105"
                  alt={label}
                />
                <button
                  onClick={() => removeImage(setter)}
                  className="absolute top-2 right-2 btn-danger p-1.5 rounded-full"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ) : (
              <UploadIcon />
            )}
            <label className="btn-primary inline-block mx-40">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setter)}
                className="hidden"
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventMedia;