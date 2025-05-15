import React, { memo } from "react";

// Constant for sponsors data
const SPONSORS_DATA = {
  title: "Our Sponsors",
  logos: ["./sponsors1.png", "sponsors2.png", "sponsors3.png"],
};

const Sponsors = () => {
  return (
    <section className="py-10 px-4 text-center bg-[var(--dark)]">
      <h2 className="text-3xl font-bold mb-8 text-[var(--light)]">{SPONSORS_DATA.title}</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {SPONSORS_DATA.logos?.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-3 bg-[var(--dark-secondary)] rounded-lg shadow-md"
          >
            <img src={logo} alt={`Sponsor ${index + 1}`} className="h-12 object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Sponsors);