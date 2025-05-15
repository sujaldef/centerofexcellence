import React from 'react';
import { FiPhone } from 'react-icons/fi';

const ProfileForm = ({ name, setName, description, setDescription, phone, setPhone }) => {
  return (
    <>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="mt-2 w-full p-3 bg-[#1a1a1a] rounded-lg text-white border border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition duration-200"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about yourself"
          className="mt-2 w-full p-3 bg-[#1a1a1a] rounded-lg text-white border border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition duration-200"
          rows="4"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="text-sm font-medium text-gray flex items-center gap-2">
          <FiPhone size={16} color="var(--primary-color)" /> Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="mt-2 w-full p-3 bg-[#1a1a1a] rounded-lg text-white border border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition duration-200"
        />
      </div>
    </>
  );
};

export default ProfileForm;