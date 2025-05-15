import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    title: "Ment-AI Portal",
    date: "47Billion",
    image: "/project1.png",
    link: "/projects",
  },
  {
    title: "Asset Management Portal",
    date: "47Billion",
    image: "/project2.jpg",
    link: "/projects",
  },
  {
    title: "Candidate Portal",
    date: "47Billion",
    image: "/project3.png",
    link: "projects",
  },
];

export default function ProjectHighlights() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Estimate navbar height (e.g., 80px based on the image)
  const navbarHeight = 80;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#1a1a2a] flex flex-col items-center"
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-300 mt-20 mb-10">
        Project Highlights
      </h1>
      {/* Sticky Cards with adjusted top position */}
      <div className="sticky top-[80px] w-full flex justify-center items-center h-screen">
        {projects.map((project, idx) => {
          const perProject = 1 / projects.length;
          const start = idx * perProject;
          const end = start + perProject;

          let scale, opacity;

          if (idx < projects.length - 1) {
            // For all cards except the last: incoming scale 0.92 to 1, outgoing scale 1 to 0.5
            const outgoingEnd = Math.min(1, end + perProject);
            scale = useTransform(scrollYProgress, [start, end, outgoingEnd], [0.92, 1, 0.5]);
            opacity = useTransform(scrollYProgress, [start, end, outgoingEnd], [0, 1, 0]);
          } else {
            // For the last card: incoming scale 0.92 to 1, stays at 1
            scale = useTransform(scrollYProgress, [start, 1], [0.92, 1]);
            opacity = useTransform(scrollYProgress, [start, 1], [0, 1]);
          }

          // Incoming y animation: from 100% to 0%
          const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

          const zIndex = useTransform(scrollYProgress, (progress) => {
            const currentIndex = Math.floor(progress * projects.length);
            return currentIndex === idx ? 10 : 0;
          });

          return (
            <motion.div
              key={idx}
              style={{ y, scale, opacity, zIndex }}
              className="absolute w-[90%] md:w-[85%] lg:w-[86%] bg-[#c7acef] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col"
            >
              {/* Top Info */}
              <div className="flex justify-between items-center w-full mb-4">
                <span className="text-xs md:text-sm font-semibold text-black">
                  {project.date}
                </span>
                <h3 className="text-base md:text-xl lg:text-2xl font-bold text-center flex-1 text-black mx-6">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  className="text-xs md:text-sm underline text-black hover:text-purple-700 whitespace-nowrap"
                >
                  View detail
                </a>
              </div>

              {/* Image */}
              <div className="w-full flex justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-xl object-cover w-full h-[400px] md:h-[500px] lg:h-[550px]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}