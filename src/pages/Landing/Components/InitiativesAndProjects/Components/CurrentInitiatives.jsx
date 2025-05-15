"use client";

import React, { useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    image: "/initiatives1.png",
    title: "Donation Drive",
    description:
      "47 Billion COE is launching a donation drive to provide clothes, books, wheat, and rice to the underprivileged, aiming to improve education, nutrition, and overall well-being through strategic distribution and meaningful community support.",
  },
  {
    image: "/initiatives2.png",
    title: "Quasar 2.0",
    description:
      "Quasar Hackathon, Central India's biggest tech event, invites innovators to bridge the industry-academia skill gap by developing solutions that empower students with practical, job-ready skills for a future-ready workforce.",
  },
  {
    image: "/initiatives3.png",
    title: "Tech Roadies",
    description:
      "A thrilling non-coding challenge by GDG x STIC x 47 Billion at Medi-Caps University, testing creativity, strategy, and survival skills with fast-paced twists and mind-bending tasks!",
  },
  {
    image: "/initiatives4.png",
    title: "Internship Drive",
    description:
      "Our internship program offers real-world experience, helping students develop practical skills, gain industry exposure, and grow professionally.",
  },
  {
    image: "/initiatives5.png",
    title: "Internship Drive 2.0",
    description:
      "This internship program equips students with hands-on experience, expert mentorship, and personalized career support, fostering skill development and preparing them for impactful, industry-ready professional journeys.",
  },
];

const CurrentInitiatives = memo(() => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const sidebar = sidebarRef.current;

    // Only apply horizontal scroll animation on sm and above
    let trigger;
    if (window.innerWidth >= 640) { // Tailwind's sm breakpoint
      const totalScrollWidth = horizontal.scrollWidth;
      const viewportWidth = window.innerWidth;

      trigger = gsap.to(horizontal, {
        x: -(totalScrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // Letter-by-letter color animation
    const letters = sidebar.querySelectorAll(".sidebar-letter");
    gsap.fromTo(
      letters,
      { color: "#ffffff" },
      {
        color: "#9333ea",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerWidth >= 640 ? horizontal.scrollWidth : 0}`,
          scrub: true,
        },
        stagger: {
          each: 0.1,
          from: "start",
        },
      }
    );

    return () => {
      if (trigger) trigger.scrollTrigger?.kill();
    };
  }, []);

  // Helper to wrap each letter with spacing between words
  const wrapLetters = (text) =>
    text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-2">
        {word.split("").map((char, i) => (
          <span
            key={`${wordIndex}-${i}`}
            className="sidebar-letter"
            style={{ display: "inline-block", color: "#ffffff" }}
          >
            {char}
          </span>
        ))}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen sm:h-screen overflow-hidden overflow-x-hidden bg-[#0a0a1a] text-white"
    >
      {/* Fixed Sidebar */}
      <div
        ref={sidebarRef}
        className="absolute left-0 top-0 h-full w-[350px] sm:w-[470px] bg-[#0a0a1a] z-20 flex justify-center items-center"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center leading-tight ml-9">
          {wrapLetters("Our Current Initiatives")}
        </h1>
      </div>

      {/* Semi-Fading Bar on the Right */}
      <div
        className="absolute right-0 top-0 h-full w-[350px] sm:w-[450px] bg-gradient-to-r from-transparent to-[#0a0a1a] z-20"
      />

      {/* Horizontal Scroll Cards (Vertical on Mobile) */}
      <div
        ref={horizontalRef}
        className="flex flex-col sm:flex-row sm:space-x-12 pl-[374px] sm:pl-[424px] sm:pr-6 space-y-8 sm:space-y-0 sm:will-change-transform items-center sm:h-full px-6 sm:px-0"
      >
        {initiatives.map((initiative, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.1}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.01}
            className="relative w-full sm:w-[70vw] md:w-[40vw] lg:w-[30vw] h-[50vh] sm:h-[70vh] flex-shrink-0 bg-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden flex justify-center items-center"
          >
            {/* Image */}
            <motion.img
              src={initiative.image}
              alt={`Initiative ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/30 backdrop-blur-md py-2 px-4 rounded-md">
              <h2 className="text-lg sm:text-xl font-bold">{initiative.title}</h2>
            </div>

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/70 p-6 rounded-2xl flex flex-col justify-end space-y-4"
            >
              <p className="text-sm sm:text-base">{initiative.description}</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="p-2 bg-[#000000] rounded-full hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm font-medium"
                >
                  Participate Now
                </button>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="p-2 bg-transparent border border-white hover:bg-white hover:text-black rounded-full text-sm font-medium transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
});

export default CurrentInitiatives;