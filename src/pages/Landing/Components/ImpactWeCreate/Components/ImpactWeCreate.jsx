'use client';

import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const impacts = [
  {
    title: "Skills to Success",
    description: "47Billion COE empowers innovators with real-world experience for career and personal growth.",
    highlights: [
      "Real-world experience for career growth",
      "Practical learning with hands-on projects",
      "Industry exposure to enhance skills",
    ],
    img: "/impact1.png",
  },
  {
    title: "Empowering Future Talent",
    description: "Quasar: Central India's largest hackathon, fostering job-ready solutions and bridging the industry-academia gap.",
    highlights: [
      "201 teams from 100+ colleges across 13 states",
      "Focused on bridging the industry-academia skill gap",
      "Empowered students to develop job-ready solutions",
    ],
    img: "/impact2.png",
  },
  {
    title: "Hands Together",
    description: "47B COE Donation Drive: Distributed resources for nutrition, education, and warmth to support vulnerable communities.",
    highlights: [
      "Met basic needs with food, books, and clothing donations.",
      "Delivered immediate relief to vulnerable individuals.",
      "Fostered social responsibility through community support.",
    ],
    img: "/impact3.jpg",
  },
];

const ImpactWeCreate = memo(() => {
  const containerRef = useRef();
  const cardRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const highlightRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${impacts.length * 250}%`,
          scrub: true,
          pin: true,
        },
      });

      impacts.forEach((_, i) => {
        const split = new SplitType(titleRefs.current[i], { types: 'chars' });

        timeline
          .from(cardRefs.current[i], {
            scale: 0.8,
            opacity: 0,
            zIndex: 0,
            duration: 1,
            ease: 'power2.out',
          })
          .to(cardRefs.current[i], {
            scale: 1,
            opacity: 1,
            zIndex: 10,
            duration: 1,
            ease: 'power2.out',
          })
          .from(split.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 1,
            ease: 'power2.out',
          }, "-=0.5")
          .from(descRefs.current[i], {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out',
          }, "-=0.4")
          .from(highlightRefs.current[i].children, {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
          }, "-=0.4")
          .to(cardRefs.current[i], {
            scale: 0.8,
            opacity: 0,
            zIndex: 0,
            duration: 1,
            ease: 'power2.inOut',
          });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cardStyle = "relative w-[85vw] md:w-[83vw] h-[85vh] bg-gradient-to-r from-[#1f1f38] via-[#2c2c54] to-[#1f1f38] rounded-3xl shadow-2xl overflow-hidden border border-purple-400/20 backdrop-blur-md flex flex-col";
  const textStyle = "flex flex-col items-center text-center p-6 space-y-6 w-full";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a1a] text-white flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/grid-texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold z-10">Impact We Create</h1>

      <div className="absolute top-[10vh] left-0 right-0 bottom-0 flex flex-col items-center justify-center">
        {impacts.map((impact, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
          >
            <Tilt
              glareEnable={false}
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              perspective={2000}
              transitionSpeed={1500}
              scale={1.005}
              className={cardStyle}
            >
              {/* Image: Now takes 40% of the height */}
              <motion.div
                className="w-full flex-none h-[30%] overflow-hidden rounded-t-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
              >
                <img
                  src={impact.img}
                  alt="Impact Banner"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Text Content */}
              <div className={textStyle}>
                <h2
                  ref={(el) => (titleRefs.current[index] = el)}
                  className="text-4xl font-bold leading-tight"
                >
                  {impact.title}
                </h2>

                <p
                  ref={(el) => (descRefs.current[index] = el)}
                  className="text-lg text-gray-300 max-w-xl"
                >
                  {impact.description}
                </p>

                <div
                  ref={(el) => (highlightRefs.current[index] = el)}
                  className="text-gray-400 text-lg space-y-1"
                >
                  {impact.highlights.map((highlight, i) => (
                    <p key={i}>{highlight}</p>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  <button
                    className="px-3 py-2 text-sm rounded-full font-semibold bg-[#AB47BC] text-white shadow-md hover:bg-gradient-to-r hover:from-[#8E24AA] hover:to-[#4A148C] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC] cursor-pointer"
                  >
                    Join Us
                  </button>
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ImpactWeCreate;
