import React from "react";
import { FaPenFancy, FaQuoteLeft } from "react-icons/fa";

const EventDescription = ({ formData, handleInputChange, errors }) => {
  const maxDescChars = 500;
  const maxTaglineChars = 100;

  return (
    <section className="bg-dark p-6 rounded-xl card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Event Description</h3>

      <div className="space-y-6">
        {/* Tagline Input */}
        <div className="relative bg-sub-dark rounded-xl flex items-center p-4 border border-[var(--border-accent)]/50">
          <FaQuoteLeft className="text-[var(--border-accent)] w-5 h-5 mr-3" />
          <div className="w-full">
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ""}
              onChange={handleInputChange}
              maxLength={maxTaglineChars}
              className={`w-full bg-sub-dark p-3 rounded-xl text-white placeholder-gray border ${
                errors.tagline ? "border-red-500" : "border-[var(--border-accent)]/50"
              } focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200`}
              placeholder="Enter a catchy tagline for your event..."
              aria-label="Event tagline"
            />
            <div className="flex justify-between mt-2 text-sm text-gray">
              {errors.tagline ? (
                <p className="text-red-500">{errors.tagline}</p>
              ) : (
                <span>A short, catchy phrase for your event.</span>
              )}
              <span>
                {(formData.tagline || "").length}/{maxTaglineChars}
              </span>
            </div>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="relative bg-sub-dark rounded-xl flex items-start p-4 border border-[var(--border-accent)]/50">
          <FaPenFancy className="text-[var(--border-accent)] w-5 h-5 mt-2 mr-3" />
          <div className="w-full">
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              maxLength={maxDescChars}
              className={`w-full bg-sub-dark p-3 rounded-xl text-white placeholder-gray border ${
                errors.description ? "border-red-500" : "border-[var(--border-accent)]/50"
              } focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200 h-32 resize-y`}
              placeholder="Write your event description here..."
              aria-label="Event description"
            />
            <div className="flex justify-between mt-2 text-sm text-gray">
              {errors.description ? (
                <p className="text-red-500">{errors.description}</p>
              ) : (
                <span>Briefly describe your event for participants.</span>
              )}
              <span>
                {(formData.description || "").length}/{maxDescChars}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDescription;