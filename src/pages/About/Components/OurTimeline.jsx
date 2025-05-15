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
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      gsap.to(timelineRef.current, {
        x: () => -(timelineRef.current.scrollWidth - window.innerWidth / 2),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${timelineRef.current.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Fade-in animation for each item
      timelineItemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: 100,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'left 80%',
            end: 'center 80%',
            scrub: 1,
            containerAnimation: gsap.to(timelineRef.current, {
              x: () => -(timelineRef.current.scrollWidth - window.innerWidth / 2),
            }),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Fixed Sidebar with vertical text */}
      <div className="fixed top-0 left-0 h-screen w-[40%] flex items-center justify-center bg-[#0a0a1a] z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-white">OUR</h1>
          <h1 className="text-6xl font-bold text-white">TIMELINE</h1>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative ml-[40%] py-20">
        {/* Fixed Middle Line with Icon */}
        <div className="fixed top-1/2 left-[40%] right-0 transform -translate-y-1/2 flex items-center">
          <div className="h-[2px] bg-gray-600 w-full"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#0a0a1a] px-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="url(#grad)" strokeWidth="2"/>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FF69B4', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FF00FF', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Timeline Items */}
        <div ref={timelineRef} className="flex items-center space-x-32">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (timelineItemsRef.current[index] = el)}
              className={`flex flex-col items-center w-[400px] min-w-[400px] ${
                step.position === 'above' ? 'mb-60' : 'mt-80'
              }`}
            >
              <div className="flex items-center mb-6">
                <span className="text-7xl font-bold bg-clip-text text-purple-600">
                  {step.number}
                </span>
                <h2 className="text-4xl font-bold ml-6">{step.title}</h2>
              </div>
              <p className="text-gray-400 text-center mb-4">{step.description}</p>
              <p className="text-lg text-gray-500">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTimeline;