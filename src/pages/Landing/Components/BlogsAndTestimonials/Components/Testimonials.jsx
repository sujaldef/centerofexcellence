import React, { useState } from 'react';
import { ChevronRight, Quote } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Doe',
      message: 'Amazing experience, learned so much!',
      image: '/user.jpg',
    },
    {
      name: 'Jane Smith',
      message: 'The events were insightful and well-organized.',
      image: '/user2.jpg',
    },
    {
      name: 'Ali Khan',
      message: 'Great networking and learning platform!',
      image: '/user3.jpg',
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="mt-20 gap-10 md:px-20 text-white flex flex-col md:flex-row justify-between items-center bg-dark ml-11">
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-big font-bold text-white mb-4">What our participants have to say</h1>
        <p className="text-medium px-6 md:px-0 md:pr-16 text-gray">
          Discover how our programs have transformed careers and opened new opportunities for professionals in the tech industry.
        </p>
      </div>
      <div className="relative  border border-[var(--border-accent)] rounded-xl p-6 w-full md:w-1/2 text-white overflow-hidden card mr-9.5">
        <Quote className="mb-2" size={40} />
        <div className="relative   bg-sub-dark  z-10">
          <TestimonialCard testimonial={testimonials[testimonialIndex]} />
        </div>
        <button
          onClick={nextTestimonial}
          className="absolute bottom-1 right-4 btn-secondary"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;