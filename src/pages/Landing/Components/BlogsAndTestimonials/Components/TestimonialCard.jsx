import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex items-center bg-sub-dark gap-4 mb-4">
      <img
        src={testimonial.image}
        alt="User"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h4 className="font-semibold text-white">{testimonial.name}</h4>
        <p className="text-small text-gray">"{testimonial.message}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;