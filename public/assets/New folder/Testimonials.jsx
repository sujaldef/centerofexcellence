import React, { useState } from 'react';
import { ChevronRight, Quote } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "John Doe",
      message: "Amazing experience, learned so much!",
      image: "/user.jpg",
    },
    {
      name: "Jane Smith",
      message: "The events were insightful and well-organized.",
      image: "/user2.jpg",
    },
    {
      name: "Ali Khan",
      message: "Great networking and learning platform!",
      image: "/user3.jpg",
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="mt-20 px-4 text-white flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-5xl font-bold mb-4">
          What our participants have to say
        </h1>
        <p className="text-md px-6 md:px-0 md:pr-16">
          Discover how our programs have transformed careers and opened new
          opportunities for professionals in the tech industry.
        </p>
      </div>
      <div className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl p-6 w-full md:w-1/2 text-white overflow-hidden">
        {/* Metallic Effect with Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-700/50 to-transparent opacity-40 rounded-xl"></div>
        <Quote className="text-primary mb-2" />
        <TestimonialCard testimonial={testimonials[testimonialIndex]} />
        <button
          onClick={nextTestimonial}
          className="absolute bottom-4 right-4 text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
