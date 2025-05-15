import React from 'react';
import Herosection from './Components/Herosection';
import ImpactWeCreate from './Components/ImpactWeCreate';
import InitiativesAndProjects from './Components/InitiativesAndProjects';
import BlogsAndTestimonials from './Components/BlogsAndTestimonials';
import FaqOurPresence from './Components/FaqOurPresence';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-gray-100 flex flex-col font-sans">
      <Herosection />
      <InitiativesAndProjects />
      <ImpactWeCreate />
      <BlogsAndTestimonials />
      <FaqOurPresence />
    </div>
  );
};

export default Index;