import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import WelcomeSection from './Components/WelcomeSection';
import EventStats from './Components/EventStats';
import UpcomingEvents from './Components/UpcomingEvents';
import SkillsInterests from './Components/SkillsInterests';
import { fetchUserById, setUserFromToken, logout } from '../../../redux/slices/userSlice';
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi';

Modal.setAppElement('#root');

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userId, loading: userLoading, error: userError, token } = useSelector((state) => state.user || { user: null, userId: null, loading: false, error: null, token: null });

  useEffect(() => {
    // Restore userId and token from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    console.log('Initial check - stored userId:', storedUserId, 'stored token:', storedToken ? 'present' : 'missing');

    if (!storedUserId || !storedToken || !/^[0-9a-fA-F]{24}$/.test(storedUserId)) {
      console.error('Invalid or missing userId/token in localStorage:', storedUserId, storedToken);
      setErrorMessage('Please log in again.');
      dispatch(logout());
      navigate('/login');
      return;
    }

    // Restore userId and token to Redux
    if (!userId || !token) {
      console.log('Restoring userId/token to Redux from localStorage');
      dispatch(setUserFromToken({ userId: storedUserId, token: storedToken }));
    }

    // Fetch user data
    console.log('Dispatching fetchUserById with userId:', storedUserId);
    dispatch(fetchUserById(storedUserId)).then((result) => {
      if (result.meta.requestStatus === 'rejected') {
        console.error('Failed to fetch user:', result.error);
        setErrorMessage(result.payload || 'Failed to load user data. Please log in again.');
        if (result.payload?.includes('Token') || result.payload?.includes('Unauthorized')) {
          dispatch(logout());
          navigate('/login');
        }
      } else {
        console.log('User data fetched successfully:', result.payload);
      }
      setIsLoading(false);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!userLoading && user !== null && !isLoading) {
      console.log('User state after fetch:', user);
      // Check for incomplete profile
      const isProfileIncomplete = (
        user.description === null &&
        user.age === null &&
        user.phone === null &&
        !user.skills?.length &&
        !user.interests?.length
      );
      console.log('Is profile incomplete?', isProfileIncomplete, 'Prompt shown before?', localStorage.getItem(`profilePromptShown_${userId}`));
      if (isProfileIncomplete && !localStorage.getItem(`profilePromptShown_${userId}`)) {
        console.log('Showing profile prompt');
        setIsPromptOpen(true);
        localStorage.setItem(`profilePromptShown_${userId}`, 'true');
      }
    }
  }, [user, userLoading, isLoading, userId]);

  const handleClosePrompt = () => {
    console.log('Closing profile prompt');
    setIsPromptOpen(false);
    localStorage.setItem(`profilePromptShown_${userId}`, 'true');
  };

  if (!userId || !token) {
    console.log('Rendering null due to missing userId or token');
    return null;
  }

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {(isLoading || userLoading) ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : errorMessage || userError ? (
            <div className="p-4 text-center text-red-400">{errorMessage || userError}</div>
          ) : (
            <div className="space-y-6">
              <WelcomeSection
                userName={user?.username || 'Your username'}
                userEmail={user?.email || 'Your email'}
                userAge={user?.age?.toString() || ''}
                userPhone={user?.phone || ''}
                userDescription={user?.description || ''}
                profileImage={user?.profilePic || '/public/user3.jpg'}
                userId={userId}
              />
              <EventStats />
              <SkillsInterests
                initialSkills={user?.skills || []}
                initialInterests={user?.interests || []}
                userId={userId}
              />
              <UpcomingEvents searchTerm={searchTerm} />
            </div>
          )}
        </main>
      </div>
      <Modal
        isOpen={isPromptOpen}
        onRequestClose={handleClosePrompt}
        className="bg-sub-dark p-6 rounded-xl max-w-md mx-auto mt-20 shadow-2xl animate-fadeIn"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FiAlertCircle size={24} /> Complete Your Profile
        </h2>
        <p className="text-gray-300 mb-4">
          Your profile is incomplete. Please add your description, age, phone number, skills, and interests to get started!
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleClosePrompt}
            className="px-4 py-2 btn-primary"
            aria-label="Close prompt"
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;