import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, subscribeToNewsletter, selectNewsletterState } from '../../../../../redux/slices/newsletterSlice';

const Newsletter = () => {
  const dispatch = useDispatch();
  const { email, status, message, error } = useSelector(selectNewsletterState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(subscribeToNewsletter(email));
  };

  return (
    <div className="relative w-full mb-20 py-10 flex items-center justify-center overflow-hidden bg-dark">
      <div className="relative z-20 max-w-[87%] mx-auto w-full px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-black/30 backdrop-blur-md bg-gradient-to-br from-gray-700/30 to-gray-900/30 border border-white/10 rounded-lg shadow-lg">
          <div className="w-full sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0 p-8">
            <h2 className="text-3xl font-bold mb-2 text-white">Don't Miss Out!</h2>
            <p className="text-lg mb-6 text-gray-100">
              Subscribe to receive our latest news and connect with us.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                className="p-3 rounded-md border border-white/20 w-full sm:w-64 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-2 sm:mt-0 px-6 py-3"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && <p className="mt-2 text-green-400">{message}</p>}
            {error && <p className="mt-2 text-red-400">{error}</p>}
          </div>
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-end p-8">
            <div className="relative">
              <img
                src="hero3.png"
                alt="Newsletter Image"
                className="w-full max-w-xs h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;