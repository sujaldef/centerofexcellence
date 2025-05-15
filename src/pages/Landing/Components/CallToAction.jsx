import React from 'react';

const CallToAction = () => {
  return (
    <div
      className="relative w-full mt-20 mb-0 h-80 flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0,0.9)), url('/transform.jpg')`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative z-20 text-center max-w-xl text-white">
        <h2 className="text-5xl font-bold mb-2">Ready to transform</h2>
        <p className="mb-4">Stay connected with our latest updates</p>
        <div className="flex items-center justify-center gap-2">
          <button className="bg-gradient-to-r from-[#6A1B9A] to-[#AB47BC] text-white px-14 py-2 rounded-full">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;