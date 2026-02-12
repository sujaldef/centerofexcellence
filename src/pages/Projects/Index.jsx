'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  BarChart3, 
  Layers, 
  Briefcase,
  Code2,
  Database
} from 'lucide-react';

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "CareerPath",
    subtitle: "EdTech Dashboard & Analytics",
    image: "/project1.png", // Ensure this path is correct
    description: "A comprehensive learning management dashboard designed to bridge the gap between students and mentors. Features real-time activity tracking, student-mentor matching, and detailed performance analytics.",
    tags: ["React", "Redux", "Data Viz", "Dark Mode"],
    stats: [
      { label: "Total Students", value: "15,440" },
      { label: "Active Mentors", value: "440" },
      { label: "Engagement", value: "+40%" },
    ],
    theme: "from-blue-600 to-cyan-500",
    icon: <BarChart3 size={20} />,
  },
  {
    id: 2,
    title: "AssetHR",
    subtitle: "Enterprise Asset Management",
    image: "/project2.jpg", // Ensure this path is correct
    description: "A centralized HR tool for tracking corporate assets. Streamlines the lifecycle of hardware and stationary from procurement to assignment. Features automated request handling and value depreciation calculation.",
    tags: ["Next.js", "Tailwind", "PostgreSQL", "Light UI"],
    stats: [
      { label: "Total Asset Value", value: "$2.4M" },
      { label: "Active Assets", value: "892" },
      { label: "Utilization", value: "78%" },
    ],
    theme: "from-emerald-500 to-teal-400",
    icon: <Layers size={20} />,
  },
  {
    id: 3,
    title: "TechSolutions",
    subtitle: "Job Recruitment Platform",
    image: "/project3.png", // Ensure this path is correct
    description: "A modern job board connecting tech talent with top companies. Features include advanced filtering by role/salary, one-click applications, and a seamless employer dashboard for candidate management.",
    tags: ["MERN Stack", "Framer Motion", "Auth0", "Filtering"],
    stats: [
      { label: "Open Roles", value: "120+" },
      { label: "Avg Salary", value: "$135k" },
      { label: "Placement", value: "Rapid" },
    ],
    theme: "from-purple-600 to-indigo-500",
    icon: <Briefcase size={20} />,
  },
];

// --- SUB-COMPONENTS ---
const TechBadge = ({ text, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 cursor-default hover:bg-white/10 transition-colors"
  >
    {text}
  </motion.span>
);

const StatBox = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xl font-bold text-white tracking-tight">{value}</span>
    <span className="text-xs text-gray-500 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-32 w-full max-w-7xl mx-auto"
    >
      {/* Background Glow Effect */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r ${project.theme} opacity-[0.03] blur-3xl rounded-full -z-10`} />

      <div className={`flex flex-col lg:flex-row items-start gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* IMAGE SECTION */}
        <div className="w-full lg:w-3/5 group">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0a0a12]"
          >
            {/* Mockup Browser Header */}
            <div className="h-8 bg-[#1a1a24] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-4 h-4 w-64 bg-white/5 rounded-full" />
            </div>
            
            {/* The Project Image - Display Full Height */}
            <div className="w-full h-auto">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto block" 
              />
            </div>
          </motion.div>
        </div>

        {/* CONTENT SECTION */}
        <div className="w-full lg:w-2/5 space-y-8 px-4 lg:px-0 lg:sticky lg:top-32">
          
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${project.theme} bg-opacity-10`}>
                <div className="text-white bg-black/20 p-1 rounded">
                  {project.icon}
                </div>
              </div>
              <h3 className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.theme}`}>
                FEATURED PROJECT
              </h3>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-xl text-gray-400 font-light">
              {project.subtitle}
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg border-l-2 border-white/10 pl-6">
            {project.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/5">
            {project.stats.map((stat, i) => (
              <StatBox key={i} label={stat.label} value={stat.value} />
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <TechBadge key={i} text={tag} delay={i * 0.1} />
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#01010f] overflow-hidden selection:bg-purple-500/30">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* HERO HEADER */}
        <div className="mb-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Selected Works 2024
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-8"
          >
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Masterpieces.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed max-w-2xl"
          >
            A curated selection of web applications focusing on data visualization, 
            enterprise management, and recruitment solutions. Built with precision, 
            designed for impact.
          </motion.p>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* FOOTER TEXT ONLY */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10" />
          <h2 className="text-4xl font-bold text-white mb-6">Have an idea in mind?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
           Work with us </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;