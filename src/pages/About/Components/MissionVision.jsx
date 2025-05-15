'use client';

import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = memo(() => {
  const containerRef = useRef();
  const missionRef = useRef();
  const visionRef = useRef();

  useEffect(() => {
    // Enable smooth scrolling normalization
    ScrollTrigger.normalizeScroll(true);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // Reduced end for faster completion
          scrub: 0.5, // Smoother scrub value
          pin: true,
          anticipatePin: 1, // Prepares pinning earlier
        },
      });

      timeline
        .fromTo(
          [missionRef.current, visionRef.current],
          { scale: 1.1, opacity: 0, willChange: 'transform, opacity' },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
        .to(
          [missionRef.current, visionRef.current],
          { scale: 0.9, opacity: 0, duration: 0.6, ease: 'power2.inOut' }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Memoized Tilt props to prevent re-renders
  const tiltProps = {
    glareEnable: true,
    glareMaxOpacity: 0.15,
    tiltMaxAngleX: 8,
    tiltMaxAngleY: 8,
    scale: 1.01,
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a1a] bg-[url('/grid-texture.png')] bg-cover bg-center bg-repeat text-white flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Glowing Background Blobs */}
      <div className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl top-1/3 left-20"></div>
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl bottom-20 right-20"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-center space-x-8">
        {/* Mission Card */}
        <div ref={missionRef}>
          <Tilt
            {...tiltProps}
            className="relative w-[620px] h-[80vh] bg-gradient-to-r from-[#1f1f38] via-[#2cclidean2c54] to-[#1f1f38] rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left border border-purple-400/20 backdrop-blur-md overflow-hidden will-change-transform"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6 p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4"
              >
                <h2 className="text-5xl font-bold leading-tight">Our Mission</h2>
              </motion.div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                To foster innovation, bridge academia and industry, and empower students with cutting-edge skills to build a better future.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
              <motion.img
                src="/mission.png"
                alt="Mission Illustration"
                className="w-72 h-72 object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, repeatType: "reverse", ease: "easeInOut" }}
                loading="lazy"
              />
            </div>
          </Tilt>
        </div>

        {/* Vision Card */}
        <div ref={visionRef}>
          <Tilt
            {...tiltProps}
            className="relative w-[620px] h-[80vh] bg-gradient-to-r from-[#1f1f38] via-[#2c2c54] to-[#1f1f38] rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left border border-purple-400/20 backdrop-blur-md overflow-hidden will-change-transform"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6 p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4"
              >
                <h2 className="text-5xl font-bold leading-tight">Our Vision</h2>
              </motion.div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                To shape individuals into impactful leaders by cultivating growth mindsets, enriching thought, and enhancing inherent qualities for a better future.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
              <motion.img
                src="/vision.png"
                alt="Vision Illustration"
                className="w-72 h-72 object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, repeatType: "reverse", ease: "easeInOut" }}
                loading="lazy"
              />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
});

export default MissionVision;