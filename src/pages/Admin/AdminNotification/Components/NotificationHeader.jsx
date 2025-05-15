import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const NotificationHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold text-[#ffffff]">Notifications & Feedback</h1>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffffff]/60" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#000000]/50 border border-[#6A1B9A]/30 text-[#ffffff] placeholder-[#ffffff]/50 focus:outline-none focus:ring-2 focus:ring-[#AB47BC] transition-all duration-200"
            aria-label="Search notifications"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#000000]/50 border border-[#6A1B9A]/30 text-[#ffffff] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#AB47BC] text-sm transition-all duration-200"
          aria-label="Filter notifications"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="answered">Answered</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <style jsx>{`
        :root {
          --primary: #6A1B9A;
          --secondary: #AB47BC;
          --gradient: linear-gradient(90deg, #9C27B0 0%, #6A1B9A 100%);
          --gradient-bg: linear-gradient(90deg, #9C27B030 0%, #6A1B9A30 100%);
          --dark: #000000;
          --light: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default NotificationHeader;