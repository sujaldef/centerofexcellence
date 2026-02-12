import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FiCamera, FiMail, FiPhone, FiCalendar, FiUser, FiEdit2, FiCheck, FiX, FiActivity } from 'react-icons/fi';
import { updateUser } from '../../../../redux/slices/userSlice';

const WelcomeSection = ({
  userName,
  userEmail,
  userAge,
  userPhone,
  userDescription,
  profileImage,
  userId,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Local State
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    age: userAge || '',
    phone: userPhone || '',
    description: userDescription || '',
    profileImage: profileImage || '', // Fallback image if needed
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sync props to state if they change externally
  useEffect(() => {
    setFormData({
      age: userAge || '',
      phone: userPhone || '',
      description: userDescription || '',
      profileImage: profileImage || '',
    });
  }, [userAge, userPhone, userDescription, profileImage]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, profileImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setError('Invalid file format. Please upload an image.');
    }
  };

  const validate = () => {
    if (formData.age && (isNaN(formData.age) || parseInt(formData.age) <= 0)) return 'Age must be valid.';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) return 'Phone must be 10 digits.';
    return null;
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!userId) {
      setError('User ID missing.');
      return;
    }

    try {
      await dispatch(updateUser({ 
        userId, 
        userData: {
          age: formData.age,
          phone: formData.phone,
          description: formData.description,
          profilePic: formData.profileImage
        } 
      })).unwrap();
      
      setSuccess('Profile updated.');
      setIsEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save changes.');
    }
  };

  const handleCancel = () => {
    // Revert state
    setFormData({
      age: userAge || '',
      phone: userPhone || '',
      description: userDescription || '',
      profileImage: profileImage || '',
    });
    setError('');
    setIsEditMode(false);
  };

  return (
    <section className="relative w-full p-6 md:p-8 shadow-2xl overflow-hidden mb-6">
      
      {/* Background Decor (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header / Actions */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
           <h2 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">User Profile</h2>
           <h1 className="text-2xl font-bold text-white tracking-tight">{userName}</h1>
        </div>
        
        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <button 
                onClick={handleCancel}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Cancel"
              >
                <FiX size={18} />
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FiCheck size={18} /> Save
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditMode(true)}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 transition-colors"
              title="Edit Profile"
            >
              <FiEdit2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 relative z-10">
        
        {/* Left: Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group w-32 h-32 rounded-full p-1 border border-white/10 bg-black/50">
            <img 
              src={formData.profileImage} 
              alt={userName} 
              className="w-full h-full rounded-full object-cover"
            />
            {/* Image Overlay (Only visible in edit mode OR hover) */}
            <div 
              onClick={() => isEditMode && fileInputRef.current.click()}
              className={`absolute inset-0 rounded-full bg-black/60 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <FiCamera className="text-white opacity-80" size={24} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageUpload} 
              accept="image/*"
              disabled={!isEditMode}
            />
          </div>
          <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono tracking-wider uppercase">
            Member
          </div>
        </div>

        {/* Right: Info & Bio */}
        <div className="flex flex-col gap-6">
          
          {/* Notifications */}
          {(error || success) && (
            <div className={`text-sm px-4 py-2 rounded border ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
              {error || success}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatItem 
              icon={FiMail} 
              label="Email" 
              value={userEmail} 
              isEditable={false} 
            />
            <StatItem 
              icon={FiPhone} 
              label="Phone" 
              value={formData.phone} 
              name="phone"
              isEditable={isEditMode} 
              onChange={handleChange}
              placeholder="+91 00000 00000"
            />
            <StatItem 
              icon={FiCalendar} 
              label="Age" 
              value={formData.age} 
              name="age"
              isEditable={isEditMode} 
              onChange={handleChange}
              placeholder="e.g. 21"
            />
             <StatItem 
              icon={FiActivity} 
              label="User ID" 
              value={userId ? `...${userId.slice(-6)}` : 'N/A'} 
              isEditable={false} 
              mono
            />
          </div>

          {/* Bio Section */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
              <FiUser size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">About Me</span>
            </div>
            {isEditMode ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us a bit about yourself..."
                className="w-full bg-[#151520] text-gray-200 text-sm p-4 rounded-lg border border-white/10 focus:border-purple-500/50 focus:outline-none resize-none transition-all placeholder-gray-600"
              />
            ) : (
              <p className="text-gray-400 text-sm leading-relaxed">
                {formData.description || "No description provided yet."}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

/* --- SUB-COMPONENTS for cleaner code --- */

const StatItem = ({ icon: Icon, label, value, isEditable, onChange, name, placeholder, mono }) => (
  <div className="bg-[#151520] p-3 rounded-lg border border-white/5 flex items-center gap-4">
    <div className="p-2 rounded bg-white/5 text-gray-400">
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">{label}</p>
      {isEditable ? (
        <input 
          type="text" 
          name={name}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-gray-700 text-white text-sm pb-0.5 focus:border-purple-500 focus:outline-none placeholder-gray-700"
        />
      ) : (
        <p className={`text-sm text-gray-200 truncate ${mono ? 'font-mono' : ''}`}>
          {value || <span className="text-gray-700 italic">Not set</span>}
        </p>
      )}
    </div>
  </div>
);

WelcomeSection.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userPhone: PropTypes.string,
  userDescription: PropTypes.string,
  profileImage: PropTypes.string,
  userId: PropTypes.string,
};

WelcomeSection.defaultProps = {
  userName: 'Guest User',
  userEmail: 'No email',
  profileImage: '', // Ensure you have a default placeholder in your parent or here
};

export default WelcomeSection;