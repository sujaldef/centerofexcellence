import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './Components/ProfileImage';
import ProfileForm from './Components/ProfileForm';
import SkillsInterests from './Components/SkillsInterests';
import { updateUser } from '../../../redux/slices/userSlice';

const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user || { user: null, loading: false, error: null });

  const [profileImage, setProfileImage] = useState(user?.profilePic || '/public/user3.jpg');
  const [name, setName] = useState(user?.username || '');
  const [description, setDescription] = useState(user?.description || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [skills, setSkills] = useState(user?.skills || []);
  const [interests, setInterests] = useState(user?.interests || []);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    console.log('CreateProfile user:', user);
    if (!user?._id) {
      setFormError('Please sign up or log in to create a profile.');
      navigate('/');
    } else if (user.description || user.skills?.length > 0 || user.interests?.length > 0) {
      navigate('/student/dashboard');
    }
  }, [user, navigate]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!user?._id) {
      setFormError('No authenticated user found. Please log in again.');
      return;
    }

    const userData = {
      username: name,
      description,
      phone,
      skills,
      interests,
      profilePic: profileImage,
    };

    try {
      await dispatch(updateUser({ userId: user._id, userData })).unwrap();
      navigate('/student/dashboard');
    } catch (err) {
      setFormError(error || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <form
        onSubmit={handleCreateProfile}
        className="w-full max-w-3xl bg-sub-dark rounded-xl shadow-2xl space-y-8 p-8"
      >
        <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
          Create Your Profile
        </h1>
        {formError && (
          <div className="text-red-500 text-center">{formError}</div>
        )}
        <div className="flex justify-center">
          <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
        </div>
        <ProfileForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          phone={phone}
          setPhone={setPhone}
        />
        <SkillsInterests
          initialSkills={skills}
          initialInterests={interests}
          setSkills={setSkills}
          setInterests={setInterests}
        />
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving Profile...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;