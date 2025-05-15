import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiCamera, FiMapPin, FiX, FiCheck } from 'react-icons/fi';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const WelcomeSection = ({
  userName = 'Alex',
  userEmail = 'alex@example.com',
  userAge = '25',
  userPhone = '+1 (555) 123-4567',
  userDescription = 'Computer Science Student | AI Enthusiast',
  onSearch,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [age, setAge] = useState(userAge);
  const [phone, setPhone] = useState(userPhone);
  const [description, setDescription] = useState(userDescription);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState('/public/user3.jpg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (onSearch) onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      className="p-6 bg-sub-dark text-white rounded-xl shadow-2xl animate-fadeIn"
      aria-label="Welcome Section"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative group">
          <img
            src={profileImage}
            alt={`${name}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border-2 border-primary-color cursor-pointer transition-transform "
            onClick={openModal}
          />
          <div className="shine-bg" />
          <div className="tooltip-wrapper">
            <button
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 w-8 h-8 text-primary-color rounded-full flex items-center justify-center"
              aria-label="Upload profile image"
            >
              <FiCamera size={16} />
            </button>
            <span className="tooltip">Upload Image</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {isEditMode ? (
                <input
                  value={name}
                  onChange={handleNameChange}
                  className="text-2xl font-semibold text-white p-2 bg-gray-800 rounded-md border border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color transition-all"
                  aria-label="Edit name"
                />
              ) : (
                <h1 className="text-2xl font-semibold text-white">{name}</h1>
              )}
            </div>
            <button
              onClick={toggleEditMode}
              className={`px-4 py-2 ${isEditMode ? 'btn-secondary' : 'btn-primary'}`}
              aria-label={isEditMode ? 'Cancel edit' : 'Edit profile'}
            >
              {isEditMode ? (
                <>
                  <FiX size={16} /> Cancel
                </>
              ) : (
                'Edit Profile'
              )}
            </button>
          </div>

          <div>
            {isEditMode ? (
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full p-2 text-white bg-gray-800 rounded-md border border-primary-color placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all"
                rows="3"
                placeholder="Enter your description"
                aria-label="Edit description"
              />
            ) : (
              <p className="text-gray">{description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isEditMode ? (
              <input
                value={email}
                onChange={handleEmailChange}
                className="p-2 text-white bg-gray-800 rounded-md border border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color transition-all"
                aria-label="Edit email"
              />
            ) : (
              <p className="text-gray flex items-center gap-2">
                <FiMapPin size={16} /> Email: {email}
              </p>
            )}
            {isEditMode ? (
              <input
                value={age}
                onChange={handleAgeChange}
                type="number"
                className="p-2 text-white bg-gray-800 rounded-md border border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color transition-all"
                aria-label="Edit age"
              />
            ) : (
              <p className="text-gray flex items-center gap-2">
                <FiMapPin size={16} /> Age: {age}
              </p>
            )}
            {isEditMode ? (
              <input
                value={phone}
                onChange={handlePhoneChange}
                type="tel"
                className="p-2 text-white bg-gray-800 rounded-md border border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color transition-all"
                aria-label="Edit phone"
              />
            ) : (
              <p className="text-gray flex items-center gap-2">
                <FiMapPin size={16} /> Phone: {phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {isEditMode && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 btn-primary flex items-center gap-2"
            aria-label="Save profile"
          >
            <FiCheck size={16} />
            Save
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-sub-dark p-6 rounded-xl max-w-md mx-auto mt-20 shadow-2xl animate-fadeIn"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Profile Image</h2>
        <div className="relative group">
          <img
            src={profileImage}
            alt="Profile preview"
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="shine-bg" />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleImageUpload}
            className="px-4 py-2 btn-primary flex items-center gap-2"
          >
            <FiCamera size={16} /> Change Image
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 btn-danger flex items-center gap-2"
          >
            <FiX size={16} /> Close
          </button>
        </div>
      </Modal>
    </section>
  );
};

WelcomeSection.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userAge: PropTypes.string,
  userPhone: PropTypes.string,
  userDescription: PropTypes.string,
  onSearch: PropTypes.func,
};

WelcomeSection.defaultProps = {
  userName: 'Alex',
  userEmail: 'alex@example.com',
  userAge: '25',
  userPhone: '+1 (555) 123-4567',
  userDescription: 'Computer Science Student | AI Enthusiast',
  onSearch: null,
};

export default WelcomeSection;