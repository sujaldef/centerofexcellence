import React, { useRef } from 'react';
import { FiCamera } from 'react-icons/fi';

const ProfileImage = ({ profileImage, setProfileImage }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <img
        src={profileImage}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-2 border-[var(--border-accent)] cursor-pointer transition-transform hover:scale-105"
      />
      <button
        onClick={handleImageUpload}
        type="button"
        className="absolute bottom-0 right-0 w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center hover:bg-[#8E24AA] transition-colors"
        aria-label="Upload profile image"
      >
        <FiCamera size={18} color="white" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;