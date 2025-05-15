// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const Login = () => {
  const [userType, setUserType] = useState('User');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType === 'User') {
      navigate('/student/create-profile');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center  justify-center px-4">
      <div className="relative bg-sub-dark p-8 rounded-2xl shadow-lg border border-border-accent/50 backdrop-blur-md w-full max-w-md flex flex-col items-center space-y-6 z-10">
        
        {/* Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setUserType('User')}
            className={`btn-secondary ${userType === 'User' ? 'bg-[var(--primary-color)]   text-white' : 'text-gray hover:bg-gray-700 '}`}
          >
            User
          </button>
          <button
            onClick={() => setUserType('Admin')}
            className={`btn-secondary ${userType === 'Admin' ? 'bg-[var(--primary-color)] text-white' : 'text-gray hover:bg-gray-700'}`}
          >
            Admin
          </button>
        </div>

        {/* Title */}
        <h2 className="text-big font-bold text-white tracking-tight">{userType} Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col space-y-6">
          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full px-4 py-2 bg-transparent text-small text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-border-accent"
              required
            />
          </div>

          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-transparent text-small text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-border-accent"
              required
            />
          </div>

          {/* Login and Sign Up Buttons */}
          <div className="w-full flex justify-between gap-4">
            <button type="submit" className="w-[48%] btn-primary">
              Login
            </button>
            <button type="button" className="w-[48%] btn-primary">
              Sign Up
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center justify-center gap-4">
          <hr className="w-1/3 border-t border-gray/50" />
          <span className="text-gray text-small">or</span>
          <hr className="w-1/3 border-t border-gray/50" />
        </div>

        {/* Google Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-sub-dark border border-gray/40 text-white hover:bg-gray-700/80 shadow-md text-small transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-accent"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </motion.button>
        
      </div>
    </div>
  );
};

export default Login;
