import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Components/Sidebar';
import WelcomeSection from './Components/WelcomeSection';
import EventStats from './Components/EventStats';
import UpcomingEvents from './Components/UpcomingEvents';
import SkillsInterests from './Components/SkillsInterests';

const Dashboard = ({ userName = 'Alex', userDescription = 'Computer Science Student | AI Enthusiast' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full" role="status">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]" aria-label="Loading"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <WelcomeSection
                userName={userName}
                userDescription={userDescription}
                onSearch={setSearchTerm}
              />
              <EventStats />
              <SkillsInterests />
              <UpcomingEvents searchTerm={searchTerm} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  userName: PropTypes.string,
  userDescription: PropTypes.string,
};

Dashboard.defaultProps = {
  userName: 'Alex',
  userDescription: 'Computer Science Student | AI Enthusiast',
};

export default Dashboard;