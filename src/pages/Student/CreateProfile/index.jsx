import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ProfileImage from './Components/ProfileImage';
import ProfileForm from './Components/ProfileForm';
import SkillsInterests from './Components/SkillsInterests';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('/public/user3.jpg');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreateProfile = (e) => {
    e.preventDefault();
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center ">
      <form
        onSubmit={handleCreateProfile}
        className="w-full max-w-3xl bg-sub-dark rounded-xl shadow-2xl space-y-8"
      >
        <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
          Create Your Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center">
          <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
        </div>

        {/* Profile Form */}
        <ProfileForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          phone={phone}
          setPhone={setPhone}
        />

        {/* Skills and Interests */}
        <SkillsInterests />

        {/* Create Profile Button */}
        <Link
          type="submit"
          to="/student/dashboard"
          className="w-full btn-primary"
        >
          Create Profile
        </Link>
      </form>
    </div>
  );
};

export default CreateProfile;