import React, { memo } from "react";
import HeroSection from "./Components/HeroSection";
import EventDescription from "./Components/EventDescription";
import EventHighlights from "./Components/EventHighlights";
import EventCountdown from "./Components/EventCountdown";
import EventTimeline from "./Components/EventTimeline";
import PastEvents from "./Components/PastEvents";
import Sponsors from "./Components/Sponsors";

const EventDetails = () => {
  return (
    <div className="bg-[#01010f] text-[var(--light)] min-h-screen">
      <HeroSection />
      <EventDescription />
      <EventHighlights />
      <EventCountdown />
      <EventTimeline />
      <PastEvents />
      <Sponsors />
    </div>
  );
};

export default memo(EventDetails);