'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  {
    number: '01',
    title: 'Genesis: Innovation Takes Root (2022)',
    description: 'Founded by 47 Billion in 2022, our journey began with a vision to cultivate talent and innovation.',
    date: 'January 1, 2022',
    position: 'above',
  },
  {
    number: '02',
    title: 'First Office: Medicaps University (2023)',
    description: 'Our first physical office opened at Medicaps University in 2023.',
    date: 'April 15, 2025',
    position: 'below',
  },
  {
    number: '03',
    title: 'Impactful Projects: Driving Innovation',
    description: 'Significant and innovative projects were driven by our core team.',
    date: 'April 30, 2025',
    position: 'above',
  },
  {
    number: '04',
    title: 'Quasar 2.0: Hackathon Success',
    description: 'We proudly organized Quasar 2.0, establishing it as the largest hackathon in Central India.',
    date: 'May 15, 2025',
    position: 'below',
  },
];

const OurTimeline = () => {
  const sectionRef = useRef(null);
  const timelineWrapperRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Calculate the exact distance to scroll
      // We need to scroll the full width of the content minus the width of the visible window (the 60% on the right)
      const getScrollAmount = () => {
        const timelineWidth = timelineRef.current.scrollWidth;
        const wrapperWidth = timelineWrapperRef.current.clientWidth;
        return -(timelineWidth - wrapperWidth + 100); // +100 for some right-side padding breathing room
      };

      const tween = gsap.to(timelineRef.current, {
        x: getScrollAmount,
        ease: 'none',
      });

      // Horizontal scroll animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${timelineRef.current.scrollWidth}`, // Scroll duration based on content length
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize (crucial for big screens)
      });

      // Fade-in animation for each item
      timelineItemsRef.current.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.8, // Added slight scale for smoother entrance on big screens
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            containerAnimation: tween,
            start: 'left 90%', // Trigger slightly earlier so it doesn't feel empty
            end: 'center 60%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#0a0a1a] text-white overflow-hidden flex"
    >
      {/* SIDEBAR: Changed from fixed to absolute/relative. 
        Because the parent section is PINNED, this acts as fixed visual 
        but won't break out of the container on large screens.
      */}
      <div className="absolute top-0 left-0 h-full w-[40%] flex items-center justify-center bg-[#0a0a1a] z-10 border-r border-gray-800/30">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-white tracking-wider">OUR</h1>
          <h1 className="text-6xl font-bold text-white tracking-wider">TIMELINE</h1>
        </div>
      </div>

      {/* CONTENT WRAPPER: Occupies the right 60% 
      */}
      <div 
        ref={timelineWrapperRef}
        className="absolute top-0 right-0 h-full w-[60%] overflow-hidden"
      >
        {/* The Center Line - Positioned Absolute relative to the wrapper, not the screen */}
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-0">
           <div className="h-[2px] bg-gray-700 w-full"></div>
        </div>

        {/* The Icon - Fixed center of the wrapper */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-20 bg-[#0a0a1a] p-2 rounded-full border border-gray-800">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="url(#grad)" strokeWidth="2" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FF69B4', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FF00FF', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
        </div>

        {/* The Moving Timeline Strip */}
        <div 
          ref={timelineRef} 
          className="flex items-center h-full pl-20 pr-40 space-x-32 w-max"
        >
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (timelineItemsRef.current[index] = el)}
              className={`flex flex-col items-start w-[400px] min-w-[400px] relative z-10 ${
                step.position === 'above' ? '-mt-64' : 'mt-64'
              }`}
            >
              {/* Connected Dot to Line */}
              <div className={`absolute left-10 w-[2px] h-20 bg-gray-700 ${step.position === 'above' ? '-bottom-20' : '-top-20'}`}></div>
              
              <div className="flex items-center mb-4">
                <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  {step.number}
                </span>
                <h2 className="text-3xl font-bold ml-6 leading-tight">{step.title}</h2>
              </div>
              <p className="text-gray-400 mb-2 text-lg">{step.description}</p>
              <p className="text-sm font-mono text-cyan-400">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTimeline;