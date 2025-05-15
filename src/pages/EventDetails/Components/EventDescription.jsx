import React, { memo, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Constant for event description
const EVENT_DESCRIPTION =
  "Step into a world of innovation and ideas where industry pioneers meet curious minds. This immersive event is designed to spark discussions, foster collaboration, and inspire the next generation of thinkers and creators.";

const EventDescription = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10" data-aos="fade-up">
      <div className="relative  backdrop-blur-md border border-purple-500/20  shadow-[0_4px_30px_rgba(168,85,247,0.2)] rounded-2xl p-6 text-center text-gray-100">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold text-purple-300 tracking-wide">
            Event Description
          </h2>
        </div>
        <p className="text-md md:text-lg leading-relaxed text-gray-200">
          {EVENT_DESCRIPTION}
        </p>
      </div>
    </div>
  );
};

export default memo(EventDescription);