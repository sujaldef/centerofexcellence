import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  subscribeToNewsletter,
  selectNewsletterState,
  clearMessage,
  clearError,
  resetNewsletterState,
} from '../../../../../redux/slices/newsletterSlice';

const Newsletter = () => {
  const dispatch = useDispatch();
  const { email, status, message, error } = useSelector(selectNewsletterState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      dispatch(clearError());
      dispatch(clearMessage());
      return; // Prevent submission if email is empty
    }
    dispatch(subscribeToNewsletter(email));
  };

  // Clear success message after 3 seconds and reset form
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetNewsletterState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  // Clear error message when the user starts typing again
  useEffect(() => {
    if (error && email) {
      dispatch(clearError());
    }
  }, [email, error, dispatch]);

  return (
    <div className="relative w-full h-[700px] flex items-end justify-center bg-dark">
      {/* Background Image */}
      <img
        src="newsletter.png" // Replace with your actual image path
        alt="Event"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Fade Overlay */}
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-[#10022B] via-[#10022bb2] to-transparent z-10" />

      {/* Content Box */}
      <div className="relative z-20 w-full max-w-4xl px-6 py-10 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">Don’t miss out!</h2>
        <p className="text-lg mb-6">
          Subscribe to receive our latest news and connect with us
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full sm:w-80 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#8D4EF7] hover:bg-[#a570ff] text-white px-6 py-3 rounded-md transition duration-300"
            aria-label="Subscribe to newsletter"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && <p className="mt-4 text-green-400">{message}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Newsletter;