import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/event-section', label: 'Events' },
    { to: '/admin/blog-section', label: 'Blogs' },
  ];

  const handleNavClick = (to) => {
    if (location.pathname !== to) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-[#ffffff] bg-[var(--gradient)] p-2 rounded-lg md:hidden"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed top-0 left-0 w-64 bg-dark  min-h-screen p-6 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:min-h-screen`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#ffffff]">Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            className="text-[#ffffff] md:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item.to)}
              className={`py-2 px-4 rounded-lg text-left font-semibold text-sm transition-all duration-200 shadow-md flex items-center gap-2 ${
                location.pathname === item.to
                  ? 'bg-[#AB47BC] text-[#ffffff]'
                  : 'text-[#ffffff]/80 hover:bg-[#AB47BC]/20 hover:text-[#ffffff]'
              }`}
              aria-label={item.label}
            >
              <span
                className={`w-1 h-5 rounded-full ${
                  location.pathname === item.to ? 'bg-[#AB47BC]' : 'bg-transparent'
                }`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
       
      </div>
    </>
  );
};

export default Sidebar;