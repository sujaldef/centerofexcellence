// HeroSection.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const HeroSection = ({ heroData }) => {
  return (
    <section
      className="relative h-screen bg-cover bg-center text-white flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${heroData.backgroundImage})`,
      }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{heroData.title}</h1>
      <p className="text-2xl md:text-3xl mb-6">{heroData.subtitle}</p>
      {heroData.buttonText && (
        <button
          className="bg-[#AB47BC] text-[#ffffff] font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC]"
        >
          {heroData.buttonText}
        </button>
      )}
    </section>
  );
};

HeroSection.propTypes = {
  heroData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(HeroSection);