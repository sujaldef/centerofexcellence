import React from 'react';

const HeroContent = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-8xl font-bold mb-2">Center of Excellence</h1>
      <p className="text-lg md:text-2xl">Where Innovation Meets Excellence</p>
      <div className="gap-10 flex">
        <button className="mt-6 rounded-full bg-gradient-to-r px-6 py-2 from-[#6A1B9A] to-[#AB47BC] text-white font-semibold">
          Register Now
        </button>
        <button className="mt-6 border border-[#ffffff] text-white px-6 py-2 rounded">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroContent;