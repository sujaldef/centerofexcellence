import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userId, loading } = useSelector((state) => state.user || { token: null, userId: null, loading: false });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const getNavLink = (basePath) => {
    const publicPath = basePath === "home" ? "/landing" : basePath === "blogs" ? "/publicblogs" : `/${basePath}`;
    if (loading) return '#';
    return token ? `/student/${basePath}` : publicPath;
  };

  const handleProfileClick = () => {
    setIsProfileOpen(false);
    if (token && userId) {
      navigate(`/student/dashboard`);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className="w-full text-gray-200 px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-gray-700/30 sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'linear-gradient(to bottom, #252555 0%, rgba(37, 37, 85, 0.8) 50%, rgba(37, 37, 85, 0.3) 100%)',
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(37, 37, 85, 0.3) 0%, transparent 100%)',
          zIndex: -1,
          height: '100px',
        }}
      />
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Link
          to={getNavLink("home")}
          className="text-2xl font-bold tracking-tight text-gray-100 hover:text-purple-300 transition duration-200"
        >
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to={getNavLink("home")} className="hover:text-purple-300 transition duration-200">
            Home
          </Link>
          <Link to={getNavLink("about")} className="hover:text-purple-300 transition duration-200">
            About
          </Link>
          <Link to={getNavLink("projects")} className="hover:text-purple-300 transition duration-200">
            Projects
          </Link>
          <Link to={getNavLink("blogs")} className="hover:text-purple-300 transition duration-200">
            Blogs
          </Link>
          <Link to={getNavLink("contact")} className="hover:text-purple-300 transition duration-200">
            Contact
          </Link>
          <div className="relative ml-4" ref={profileRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition duration-200"
              aria-label="Profile menu"
            >
              <img src="/user3.jpg" alt="User profile" className="w-6 h-6 rounded-full object-cover" />
              <span className="sr-only">User Profile</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-2 mt-2 w-48 bg-[#252555] rounded-xl border border-gray-700/50 shadow-lg">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2f2f6b] hover:text-purple-300 transition duration-200 rounded-t-xl"
                >
                  Profile
                </button>
                {token && userId && (
                  <Link
                    to={`/student/create-profile`}
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#2f2f6b] hover:text-purple-300 transition duration-200"
                  >
                    Settings
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (token) {
                      dispatch(logout());
                      localStorage.removeItem(`profilePromptShown_${userId}`);
                      navigate("/login");
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2f2f6b] hover:text-purple-300 transition duration-200 rounded-b-xl"
                >
                  {token ? "Logout" : "Login"}
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden text-gray-200 hover:text-purple-300 transition duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden mt-4 rounded-xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-gray-700/40 backdrop-blur-md"
          style={{
            background: 'linear-gradient(to bottom, #252555 0%, rgba(37, 37, 85, 0.8) 100%)',
          }}
        >
          <div className="flex flex-col space-y-4 text-sm font-medium">
            <Link
              to={getNavLink("home")}
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to={getNavLink("about")}
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to={getNavLink("projects")}
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Projects
            </Link>
            <Link
              to={getNavLink("blogs")}
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Blogs
            </Link>
            <Link
              to={getNavLink("contact")}
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                toggleMobileMenu();
                handleProfileClick();
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-gray-100 px-4 py-2 rounded-xl text-center hover:from-purple-500 hover:to-purple-700 transition duration-200 shadow-md"
            >
              Profile
            </button>
            {token && userId && (
              <Link
                to={`/student/create-profile`}
                className="hover:text-purple-300 transition duration-200"
                onClick={toggleMobileMenu}
              >
                Settings
              </Link>
            )}
            <button
              onClick={() => {
                toggleMobileMenu();
                if (token) {
                  dispatch(logout());
                  localStorage.removeItem(`profilePromptShown_${userId}`);
                  navigate("/login");
                } else {
                  navigate("/login");
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-gray-100 px-4 py-2 rounded-xl text-center hover:from-purple-500 hover:to-purple-700 transition duration-200 shadow-md"
            >
              {token ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;