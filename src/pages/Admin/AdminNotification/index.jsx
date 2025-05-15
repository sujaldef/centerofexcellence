import React from 'react';
import Sidebar from '../AdminDashboard/Components/Sidebar';
import NotificationHeader from './components/NotificationHeader';
import QuestionList from './components/QuestionList';
import SuggestionList from './components/SuggestionList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNotifications = () => {
  return (
    <div className="min-h-screen bg-[#01010f] text-gray-100 flex font-sans">
      
      <Sidebar />
      <div className="flex-1 p-8 space-y-6">
        <NotificationHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuestionList />
          <SuggestionList />
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;