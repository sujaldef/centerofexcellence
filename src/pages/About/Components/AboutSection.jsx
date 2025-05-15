import React, { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AboutSection = memo(() => (
  <motion.section
    className="py-16 px-6 bg-[#0a0a1a] relative"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About the 47 Billion COE</h2>
        <p className="text-lg text-gray-300 mb-4">
          The 47 Billion Center of Excellence (COE) is a collaborative initiative with 47Billion, dedicated to nurturing young talent and preparing them for careers in technology and innovation.
        </p>
        <p className="text-lg text-gray-300">
          Our mission is to provide a dynamic environment where students can thrive through industry knowledge sharing, internships, job opportunities, hackathons, and access to an innovation lab.
        </p>
      </div>
      <div className="flex items-center justify-end">
        <img
          src="/aboutSec.png"
          alt="COE Image"
          className="rounded-lg shadow-lg w-full max-w-md"
          loading="lazy"
        />
      </div>
    </div>
  </motion.section>
));

AboutSection.propTypes = {};

export default AboutSection;