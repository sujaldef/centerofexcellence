// src/AboutUs.js
import React from 'react';
import Hero from './Components/Hero';
import AboutSection from './Components/AboutSection';
import OurTimeline from './Components/OurTimeline';

import PropTypes from 'prop-types';
import MissionVision from './Components/MissionVision'


const AboutUs = () => {
  return (
    <div className="relative bg-[#0a0a1a] text-white min-h-screen overflow-hidden">
      
      {/* Particle Background */}
      

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <OurTimeline />
        {/* Add the Mission and Vision section */}
        <MissionVision />
      
       
        
      </div>
    </div>
  );
};

AboutUs.propTypes = {};

export default AboutUs;
