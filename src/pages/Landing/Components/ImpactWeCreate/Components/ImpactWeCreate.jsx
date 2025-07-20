import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const impacts = [
  {
    title: "Skills to Success",
    description: "47Billion COE empowers innovators with real-world experience for career and personal growth.",
    highlights: [
      "Real-world experience for career growth",
      "Practical learning with hands-on projects",
      "Industry exposure to enhance skills",
    ],
    img1: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    img2: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Empowering Future Talent",
    description: "Quasar: Central India's largest hackathon, fostering job-ready solutions and bridging the industry-academia gap.",
    highlights: [
      "201 teams from 100+ colleges across 13 states",
      "Focused on bridging the industry-academia skill gap",
      "Empowered students to develop job-ready solutions",
    ],
    img1: "hero1.jpg",
  },
  {
    title: "Hands Together",
    description: "47B COE Donation Drive: Distributed resources for nutrition, education, and warmth to support vulnerable communities.",
    highlights: [
      "Met basic needs with food, books, and clothing donations.",
      "Delivered immediate relief to vulnerable individuals.",
      "Fostered social responsibility through community support.",
    ],
    img1: "hero6.jpg",
    img2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

// Animation variants for bubbles
const bubbleVariants = {
  float: {
    y: [0, -20, 10, -15, 5, 0],
    x: [0, 10, -5, 15, -10, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};


// Animation variants for images
const imageVariants = {
  initial: {
    scale: 1,
    rotate: -6,
    zIndex: 10,
  },
  hover: {
    scale: 1.1,
    rotate: 0,
    zIndex: 20,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const secondImageVariants = {
  initial: {
    scale: 1,
    rotate: 6,
    zIndex: 10,
  },
  hover: {
    scale: 1.1,
    rotate: 0,
    zIndex: 20,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const ImpactWeCreate = () => {
  return (
    <section className="w-full mt-15 mb-20 bg-dark text-white py-16">
      <div className="max-w-7xl gap-30 mx-auto flex flex-col items-center space-y-40 px-6">
        {impacts.map((impact, index) => {
          const isEven = index % 2 === 0;
          const showBigBubbles = index === 0 || index === 2;
          const hasTwoPhotos = index === 0 || index === 2;
          const adjustedGap = hasTwoPhotos ? 'gap-40' : 'gap-10';

          return (
            <div
              key={index}
              className={`relative w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between ${adjustedGap}`}
            >
              {/* Background Bubbles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {showBigBubbles ? (
                  <>
                    <motion.div
                      className="absolute w-[450px] h-[450px] bg-gradient-to-r from-[#AB47BC]/20 to-[#4A148C]/20 rounded-full -translate-x-[20%] translate-y-[10%]"
                      variants={bubbleVariants}
                      animate="float"
                    ></motion.div>
                    <motion.div
                      className="absolute w-[300px] h-[300px] bg-gradient-to-r from-[#AB47BC]/30 to-[#4A148C]/30 rounded-full translate-x-[10%] -translate-y-[20%]"
                      variants={bubbleVariants}
                      animate="float"
                    ></motion.div>
                  </>
                ) : (
                  <motion.div
                    className="absolute w-[200px] h-[200px] bg-gradient-to-r from-[#AB47BC]/20 to-[#4A148C]/20 rounded-full translate-x-[10%] translate-y-[10%]"
                    variants={bubbleVariants}
                    animate="float"
                  ></motion.div>
                )}
              </div>

              {/* Image(s) */}
              <div className="relative w-full lg:w-1/2 flex justify-center">
                <div className="relative">
                  <motion.img
                    src={impact.img1}
                    alt={`${impact.title} - 1`}
                    className="w-72 h-72 object-cover rounded-lg shadow-lg"
                    variants={imageVariants}
                    initial="initial"
                    whileHover="hover"
                  />
                  {hasTwoPhotos && (
                    <motion.img
                      src={impact.img2}
                      alt={`${impact.title} - 2`}
                      className="absolute top-40 left-48 w-72 h-72 object-cover rounded-lg shadow-lg"
                      variants={secondImageVariants}
                      initial="initial"
                      whileHover="hover"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 px-4">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">{impact.title}</h2>
                <p className="text-lg text-gray-300 max-w-md">{impact.description}</p>
                <ul className="text-gray-400 text-lg space-y-2">
                  {impact.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
                <button className="px-6 py-3 text-sm z-20 rounded-full font-semibold bg-[#8D4EF7] hover:bg-[#a570ff]">
                  Join Us
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImpactWeCreate;