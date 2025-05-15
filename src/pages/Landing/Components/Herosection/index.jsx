"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HeroSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 20, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 600]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-300, 200]),
    springConfig
  );

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 7);
  const thirdRow = products.slice(7, 10);

  return (
    <div
      ref={ref}
      className="h-[250vh] py-20 sm:py-32 overflow-hidden overflow-x-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d] bg-[#01010f]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="flex flex-col space-y-10 will-change-transform"
      >
        <HorizontalRow items={firstRow} translate={translateX} />
        <HorizontalRow items={secondRow} translate={translateXReverse} />
        <HorizontalRow items={thirdRow} translate={translateX} />
      </motion.div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-4 w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center space-y-2 text-4xl md:text-8xl font-bold text-white text-center"
      >
        <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
  47Billion
</span>
<span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
  Center of Excellence
</span>

      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-2xl text-base md:text-xl mt-8 text-gray-300 mx-auto"
      >
        Empowering innovation, building future leaders, and transforming
        industries through world-class learning and research.
      </motion.p>
    </div>
  );
};

const HorizontalRow = ({ items, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      className="flex flex-nowrap gap-6 sm:gap-10 px-4 will-change-transform"
    >
      {items.map((product) => (
        <ProductCard
          key={product.title + product.thumbnail}
          product={product}
        />
      ))}
    </motion.div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group h-64 sm:h-72 w-48 sm:w-64 md:w-80 relative shrink-0 cursor-pointer will-change-transform"
    >
      <a
        href={product.link}
        className="block group-hover:shadow-2xl transition-all"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-2xl"
        />
      </a>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 rounded-2xl transition-all" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 text-white text-base sm:text-lg font-semibold transition-all">
        {product.title}
      </h2>
    </motion.div>
  );
};

const products = [
  {
    title: "",
    link: "#",
    thumbnail: "/hero1.jpg",
  },
  {
    title: "Tech Roadies",
    link: "#",
    thumbnail: "/hero2.jpg",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero3.png",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero4.jpg",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero5.jpg",
  },
  {
    title: "Tech Roadies",
    link: "#",
    thumbnail: "/hero6.jpg",
  },
  {
    title: "Quasar 2.0 inaugration",
    link: "#",
    thumbnail: "/hero7.jpg",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero9.jpg",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero8.png",
  },
  {
    title: "",
    link: "#",
    thumbnail: "/hero10.jpg",
  },
];

export default HeroSection;
