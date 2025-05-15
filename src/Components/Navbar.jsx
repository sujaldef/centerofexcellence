import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png"
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  return (
    <nav className="w-full bg-[#01010f] text-gray-200 px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-gray-700/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-100 hover:text-purple-300 transition duration-200">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/landing" className="hover:text-purple-300 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-purple-300 transition duration-200">About</Link>
          <Link to="/projects" className="hover:text-purple-300 transition duration-200">Projects</Link>
          <Link to="/PublicBlogs" className="hover:text-purple-300 transition duration-200">Blogs</Link>
          <Link to="/contact" className="hover:text-purple-300 transition duration-200">Contact</Link>

          {/* Profile Dropdown */}
          <div className="relative ml-4" ref={profileRef}>
          <button
  onClick={toggleProfileDropdown}
  className="flex items-center gap-2 text-white hover:text-[var(--primary-color)] transition duration-200"
  aria-label="Profile menu"
>
  <img
    src="/user3.jpg"
    alt="User profile"
    className="w-6 h-6 rounded-full object-cover"
  />
  <span className="sr-only">User Profile</span>
</button>
            {isProfileOpen && (
              <div className="absolute right-2 mt-2 w-48 bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 card">
                <Link
                  to="/student/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-[var(--border-accent)]/20 hover:text-[var(--primary-color)] transition duration-200 rounded-t-xl"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-[var(--border-accent)]/20 hover:text-[var(--primary-color)] transition duration-200"
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-[var(--border-accent)]/20 hover:text-[var(--primary-color)] transition duration-200 rounded-b-xl"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200 hover:text-purple-300 transition duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden mt-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-gray-700/40 backdrop-blur-md"
        >
          <div className="flex flex-col space-y-4 text-sm font-medium">
            <Link
              to="/landing"
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/projects"
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="hover:text-purple-300 transition duration-200"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-gray-100 px-4 py-2 rounded-xl text-center hover:from-purple-500 hover:to-purple-700 transition duration-200 shadow-md"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
