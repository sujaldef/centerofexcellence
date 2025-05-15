import React from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
  const faqs = [
    "What is the duration of the program?",
    "Do I get a certificate?",
    "How do I apply for an internship?",
  ];

  return (
    <div
      className="py-16 mt-10  px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.95)),url('/faq.jpg')",
      }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 flex flex-col gap-6">
          {faqs.map((q, i) => (
            <FAQItem key={i} question={q} />
          ))}
        </div>
        <div className="md:w-1/3 bg-black/60 p-6 rounded-lg text-white flex flex-col justify-between">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-300 mb-4">
            Drop your question and our team will get back to you shortly.
          </p>
          <input
            type="text"
            placeholder="Type your question here..."
            className="p-2 rounded-md mb-4 text-white border-2 w-full bg-transparent"
          />
          <button className="px-4 py-2 bg-[#6A1B9A] text-white rounded-md font-semibold w-full">
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;