import React, { useEffect, useRef, memo, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Hero = memo(() => {
  const containerRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const images = [
    { src: '/hero1.jpg', top: '10%', left: '5%', factor: -0.4 },
    { src: '/hero2.jpg', top: '20%', right: '5%', factor: -0.3 },
    { src: '/hero3.png', bottom: '20%', left: '10%', factor: -0.35 },
    { src: '/hero4.jpg', bottom: '10%', right: '10%', factor: -0.45 },
    { src: '/hero5.jpg', top: '25%', left: '45%', factor: -0.2 },
    { src: '/hero6.jpg', bottom: '5%', right: '30%', factor: -0.3 },
  ];

  const floatingRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      floatingRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const { factor } = images[index];
        ref.style.transform = `translate3d(${mouse.x * window.innerWidth * factor}px, ${mouse.y * window.innerHeight * factor}px, 0)`;
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouse]);

  // Helper to generate random movement range
  const randomFloatAnimation = () => ({
    y: [0, Math.random() * 30 - 15, 0],
    x: [0, Math.random() * 30 - 15, 0],
    transition: {
      duration: 8 + Math.random() * 4, // random between 8-12 seconds
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  });

  return (
    <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a] text-center px-4">
      {/* Floating Images */}
      {images.map((img, index) => (
        <motion.img
          key={index}
          ref={(el) => floatingRefs.current[index] = el}
          src={img.src}
          alt="Floating"
          className="absolute rounded-xl object-cover will-change-transform opacity-70 shadow-xl"
          style={{
            width: '350px',
            height: '240px',
            top: img.top,
            bottom: img.bottom,
            left: img.left,
            right: img.right,
          }}
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: randomFloatAnimation(),
          }}
          loading="lazy"
        />
      ))}

      {/* Center Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-4 text-white relative z-20 drop-shadow-[0_2px_12px_rgba(147,51,234,0.7)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Where Potential Meets Opportunity
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-300 relative z-20 max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Discover the 47Billion Center of Excellence
      </motion.p>
    </div>
  );
});

Hero.propTypes = {};

export default Hero;
