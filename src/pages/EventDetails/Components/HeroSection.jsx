import React, { memo } from "react";

// Constant for hero section data
const HERO_DATA = {
  title: "The Ultimate Platform for Planning and Promoting Successful Events",
  subtitle: "Get Inside in The Philosopher's Mind",
  buttonText: "Register Now",
  backgroundImage: "/bgimage.eventdes.png",
};

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center text-white flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${HERO_DATA.backgroundImage})`,
      }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{HERO_DATA.title}</h1>
      <p className="text-2xl md:text-3xl mb-6">{HERO_DATA.subtitle}</p>
      {HERO_DATA.buttonText && (
        <button
          className="bg-[#AB47BC] text-[#ffffff] font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC]"
        >
          {HERO_DATA.buttonText}
        </button>
      )}
    </section>
  );
};

export default memo(HeroSection);