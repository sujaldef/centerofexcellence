// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Shared Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Public Pages
import Login from './pages/Login/index';
import Landing from './pages/Landing/index';
import AdminNotifications from './pages/Admin/AdminNotification';
import AboutUs from './pages/About/index';
import Projects from './pages/Projects/Index';
import PublicBlogs from './pages/PublicBlogs/index';
import BlogDetail from './pages/PublicBlogs/BlogDetails/BlogDetails';
import Contact from './pages/Contact/Index';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard/index';
import AdminListEvent from './pages/Admin/AdminListEvent/index';
import AdminManageEvent from './pages/Admin/AdminManageEvent/index';
import BlogSection from './pages/Admin/BlogSection/index';
import EventSection from './pages/Admin/EventSection/index';
import NewBlog from './pages/Admin/NewBlog';
import EditBlog from './pages/Admin/EditBlog/index';

// Event Detail Page
import EventDetail from './pages/EventDetails/index';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard/index';
import EventRegistration from './pages/Student/EventRegistration/index';
import Events from './pages/Student/Events/index';
import Blogs from './pages/Student/Blogs/index';
import BlogDetails from './pages/Admin/BlogDetails/Components/BlogDetails';

import CreateProfile from './pages/Student/CreateProfile';

const App = () => {
  useEffect(() => {
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const cursor = { x: width / 2, y: height / 2 };
    const particles = [];

    const handleMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        particles.push({
          x: cursor.x,
          y: cursor.y,
          alpha: 1,
          radius: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; // white color
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();

        if (p.alpha <= 0) particles.splice(index, 1);
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-dark">
      {/* Particle canvas */}
      <canvas
        id="trail-canvas"
        className="fixed top-0 left-0 w-full h-full z-[9998] pointer-events-none"
      ></canvas>

      {/* Optional custom cursor */}
      <div className="custom-cursor fixed rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] transition-all duration-300 ease-out"></div>
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/PublicBlogs" element={<PublicBlogs />} />
          <Route path="/Publicblogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/list-events" element={<AdminListEvent />} />
          <Route path="/admin/Notifications" element={<AdminNotifications />} />
          <Route path="/admin/manage-events" element={<AdminManageEvent />} />
          <Route path="/admin/blog-section" element={<BlogSection />} />
          <Route path="/admin/blog-details" element={<BlogDetails />} />
          <Route path="/admin/event-section" element={<EventSection />} />
          <Route path="/admin/new-blog" element={<NewBlog />} />
          <Route path="/admin/edit-blog" element={<EditBlog />} />

          {/* Event Details */}
          <Route path="/event-detail" element={<EventDetail />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/event-registration" element={<EventRegistration />} />
          <Route path="/student/events" element={<Events />} />
          <Route path="/student/create-profile" element={<CreateProfile />} />
          <Route path="/student/Blogs" element={<Blogs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;