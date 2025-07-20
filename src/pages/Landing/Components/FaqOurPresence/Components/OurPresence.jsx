import React from 'react';

const logos = [
  { src: '/Medicaps.png', url: 'https://www.medicaps.ac.in', alt: 'MediCaps Logo' },
  { src: '/sage.png', url: 'https://sageuniversity.in/', alt: 'Sage Logo' },
];

const OurPresence = () => {
  return (
    <section className="py-8 px-4 bg-dark mt-30 mb-15 text-gray-100">
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
              <div className="w-54 h-20 flex items-center justify-center border border-gray-600 rounded-lg  bg-gradient-to-t from-[#10022B] via-[#10022bb2] to-transparent">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPresence;