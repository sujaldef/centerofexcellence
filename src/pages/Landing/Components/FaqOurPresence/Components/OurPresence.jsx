import React from 'react';

const logos = [
  { src: '/Medicaps.png', url: 'https://www.medicaps.ac.in', alt: 'MediCaps Logo' },
  { src: '/sage.png', url: 'https://sageuniversity.in/', alt: 'Sage Logo' },
];

const OurPresence = () => {
  return (
    <section className="py-8 px-4 bg-[#01010f] text-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Our Presence</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {logos.map((logo, index) => (
            <a
              key={`${logo.alt}-${index}`}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={logo.alt === 'Sage Logo' ? 'h-16 mx-6' : 'h-12 mx-6'}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPresence;