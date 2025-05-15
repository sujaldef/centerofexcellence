import React from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/Header';
import UpdatesSection from './Components/UpdatesSection';
import OrganizersSection from './Components/OrganizersSection';

const Index = () => {
  const mockSpeakers = [
    { id: 1, name: 'Speaker 1', status: 'Confirmed', image: '/user.jpg', email: 'speaker1@example.com' },
    { id: 2, name: 'Speaker 2', status: 'Pending', image: '/user2.jpg', email: 'speaker2@example.com' },
    { id: 3, name: 'Speaker 3', status: 'Pending', image: '/user3.jpg', email: 'speaker3@example.com' },
  ];

  const mockUpdates = [
    { id: 1, text: 'Venue setup confirmed', pinned: false },
    { id: 2, text: 'Catering menu finalized', pinned: true },
    { id: 3, text: 'AV equipment checked', pinned: false },
  ];

  const mockOrganizers = [
    { id: 1, name: 'Organizer 1', email: 'org1@example.com', image: '/user2.jpg' },
    { id: 2, name: 'Organizer 2', email: 'org2@example.com', image: '/user2.jpg' },
    { id: 3, name: 'Organizer 3', email: 'org3@example.com', image: '/user2.jpg' },
  ];

  const handleClick = (label) => {
    toast.success(`${label} clicked!`, { theme: 'dark' });
  };

  return (
    <div className="min-h-screen bg-[#01010f] text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UpdatesSection updates={mockUpdates} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <OrganizersSection organizers={mockOrganizers} handleClick={handleClick} />
        </motion.div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default Index;