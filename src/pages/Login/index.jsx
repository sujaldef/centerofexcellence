import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromToken } from '../../redux/slices/userSlice';
import axios from 'axios';

const Login = () => {
  const [formMode, setFormMode] = useState('Login');
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user || { loading: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formMode === 'Login') {
      if (!identifier || !password) {
        setError('Please fill in all fields');
        return;
      }
      try {
        const response = await axios.post('http://localhost:8000/users/login', {
          identifier,
          password,
        });
        const { access_token, user_id } = response.data;
        if (!access_token || !user_id) {
          throw new Error('Missing token or user ID in response');
        }
        localStorage.setItem('token', access_token);
        localStorage.setItem('userId', user_id);
       dispatch(setUserFromToken({ token: access_token, userId: user_id }));

// Redirect based on admin check
if (
  (identifier === '1' && password === '1') || // Login mode check
  (email === '1' && password === '1')         // Signup mode check
) {
  window.location.href = 'http://localhost:5174/admin/dashboard';

} else {
  navigate('/student/dashboard');
}

      } catch (err) {
        console.error('Login error:', err);
        console.log('Full error response:', err.response?.data);
        const errorMessage = err.response?.data?.detail
          ? Array.isArray(err.response.data.detail)
            ? err.response.data.detail.map(e => e.msg).join(', ')
            : err.response.data.detail
          : err.message || 'Login failed';
        setError(errorMessage);
      }
    } else {
      if (!username || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      try {
        const response = await axios.post('http://localhost:8000/users', {
          username,
          email,
          password,
        });
        const { access_token, user_id } = response.data;
        if (!access_token || !user_id) {
          throw new Error('Missing token or user ID in response');
        }
        localStorage.setItem('token', access_token);
        localStorage.setItem('userId', user_id);
        dispatch(setUserFromToken({ token: access_token, userId: user_id }));
        navigate('/student/dashboard');
      } catch (err) {
        console.error('Signup error:', err);
        console.log('Full error response:', err.response?.data);
        const errorMessage = err.response?.data?.detail
          ? Array.isArray(err.response.data.detail)
            ? err.response.data.detail.map(e => e.msg).join(', ')
            : err.response.data.detail
          : err.message || 'Sign up failed';
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="relative bg-sub-dark p-8 rounded-2xl shadow-lg border border-border-accent/50 backdrop-blur-md w-full max-w-md flex flex-col items-center space-y-6 z-10">
        <div className="flex gap-4">
          <button
            onClick={() => setFormMode('Login')}
            className={`btn-secondary ${
              formMode === 'Login'
                ? 'bg-[var(--primary-color)] text-white'
                : 'text-gray hover:bg-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setFormMode('Sign Up')}
            className={`btn-secondary ${
              formMode === 'Sign Up'
                ? 'bg-[var(--primary-color)] text-white'
                : 'text-gray hover:bg-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>
        <h2 className="text-big font-bold text-white tracking-tight">
          {formMode}
        </h2>
        {error && (
          <div className="text-red-500 text-small text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          {formMode === 'Sign Up' && (
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
          )}
          <div className="w-full bg-sub-dark border border-border-accent rounded-2xl overflow-hidden">
            <input
              type={formMode === 'Sign Up' ? 'email' : 'text'}
              placeholder={formMode === 'Sign Up' ? 'Email' : 'Email or Username'}
              value={formMode === 'Sign Up' ? email : identifier}
              onChange={(e) =>
                formMode === 'Sign Up'
                  ? setEmail(e.target.value)
                  : setIdentifier(e.target.value)
              }
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
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={loading}
          >
            {loading ? `${formMode}...` : formMode}
          </button>
        </form>
        <div className="w-full flex items-center justify-center gap-4">
          <hr className="w-1/3 border-t border-gray/50" />
          <span className="text-gray text-small">or</span>
          <hr className="w-1/3 border-t border-gray/50" />
        </div>
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