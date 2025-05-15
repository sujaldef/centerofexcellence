import React from 'react';
import SkillCheckbox from './SkillCheckbox';

const RegistrationForm = () => {
  const skills = [
    'AI',
    'Blockchain',
    'Cloud Computing',
    'Data Science',
    'DevOps',
    'Machine Learning',
  ];

  return (
    <div className="md:w-3/5 bg-black text-white p-10 flex items-center justify-center">
      <form className="w-full max-w-md space-y-6">
        <h2 className="text-4xl font-bold text-left text-white mb-4">
          Event Registration
        </h2>
        <p className="text-center text-white">
          Please fill in your details to register for the event
        </p>

        <div>
          <label className="block text-sm font-medium text-white">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">College / Organization</label>
          <input
            type="text"
            placeholder="Enter your organization name"
            className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Current Role</label>
          <select className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white">
            <option value="">Select your role</option>
            <option value="rockchain">Rockchain</option>
            <option value="cloud">Cloud Computing</option>
            <option value="data">Data Science</option>
            <option value="juurd">JUURD</option>
            <option value="devops">DevOps</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Skills / Interests</label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <SkillCheckbox key={skill} value={skill} />
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="form-checkbox text-[var(--primary)]"
          />
          <label htmlFor="terms" className="ml-2 text-white text-sm">
            I accept the Terms and Conditions
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            className="form-checkbox text-[var(--primary)]"
          />
          <label htmlFor="notifications" className="ml-2 text-white text-sm">
            I allow notifications, messages, and updates
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 btn-primary text-white"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;