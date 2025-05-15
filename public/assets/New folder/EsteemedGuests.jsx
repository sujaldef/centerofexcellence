import React from 'react';

const EsteemedGuests = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10">
      <div className="max-w-xl">
        <h2 className="text-6xl font-bold text-[#ffffff] mb-4">
          Our Esteemed Guests of Honor
        </h2>
        <div className='pt-5 pl-3' >
          Be part of an exclusive community of digital innovators, industry
          disruptors, and global thought leaders. Gain insights from the minds
          
        </div>
        <div className='pt-5 pl-3'>
        shaping tomorrow’s technology, and build meaningful connections with
        professionals who are as passionate about innovation as you are.
        </div>
      </div>
      <div className="relative">
        <img src="/guest3.png" alt="Main Guest" className="rounded-lg" />
        <div className="absolute bottom-5 right-10 bg-[#6A1B9A] px-4 py-4 rounded-full text-sm text-white font-semibold shadow-md">
          200+ more like these
        </div>
      </div>
    </div>
  );
};

export default EsteemedGuests;