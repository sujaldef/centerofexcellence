import React from 'react';

const Newsletter = () => {
  return (
    <div
      className="relative w-full  mb-20 h-60 flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1)), url('/newsletter.jpg')`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative z-20 text-center max-w-xl text-white">
        <h2 className="text-3xl font-bold mb-2">Join our Newsletter</h2>
        <p className="mb-4">Stay connected with our latest updates</p>
        <div className="flex items-center justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md border-2 w-64"
          />
          <button className="bg-gradient-to-r from-[#6A1B9A] to-[#AB47BC] text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;