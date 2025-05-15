import React from 'react';
import HeroContent from './HeroContent';
import landingBg from "/landingbgimg.png";

const Herosection = () => {
  return (
    <div
      className="relative text-[#ffffff] h-screen bg-cover bg-center gap-10 flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${landingBg})`,
      }}
    >
      <HeroContent />
    </div>
  );
};

export default Herosection;