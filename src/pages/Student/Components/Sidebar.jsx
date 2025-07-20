import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiBookOpen, FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user || { userId: null });

  if (!userId) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { path: '/student/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/student/events', label: 'Events', icon: FiList },
    { path: '/student/blogs', label: 'Blogs', icon: FiBookOpen },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(`profilePromptShown_${userId}`);
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#01010f] text-white p-6 shadow-2xl border-r border-gray-700/30 backdrop-blur-lg">
      <div className="mb-8 flex items-center gap-3"></div>
      <nav>
        <ul className="space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <li
                key={path}
                className={`relative group rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#AB47BC] text-white shadow-md'
                    : 'text-gray-200 hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:text-white hover:scale-105'
                }`}
              >
                <Link
                  to={path}
                  className="flex items-center p-3 w-full cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="mr-3" size={20} aria-hidden="true" />
                  <span className="text-sm font-semibold">{label}</span>
                </Link>
                <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {label}
                </span>
              </li>
            );
          })}
          <li
            className="relative group rounded-xl transition-all duration-200 text-gray-200 hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:text-white hover:scale-105 mt-4"
          >
            <button
              onClick={handleLogout}
              className="flex items-center p-3 w-full cursor-pointer"
              aria-label="Logout"
            >
              <FiLogOut className="mr-3" size={20} aria-hidden="true" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
            <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;