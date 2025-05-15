'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#01010f]">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-bold text-purple-600 text-center"
      >
        Coming Soon
      </motion.h1>
    </section>
  );
};

export default Projects;