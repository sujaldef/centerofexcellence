import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/users', {
        username,
        email,
        password,
      });
      // After successful signup, navigate to create-profile
      navigate('/student/create-profile');
    } catch (err) {
      setError(err.response?.data?.detail || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="relative bg-sub-dark p-8 rounded-2xl shadow-lg border border-border-accent/50 backdrop-blur-md w-full max-w-md flex flex-col items-center space-y-6 z-10">
        <h2 className="text-big font-bold text-white tracking-tight">Sign Up</h2>

        {error && (
          <div className="text-red-500 text-small text-center">{error}</div>
        )}

        <form onSubmit={handleSignUp} className="w-full flex flex-col space-y-6">
          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-transparent text-small text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-border-accent"
              required
            />
          </div>

          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-transparent text-small text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-border-accent"
              required
            />
          </div>

          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-transparent text-small text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-border-accent"
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;