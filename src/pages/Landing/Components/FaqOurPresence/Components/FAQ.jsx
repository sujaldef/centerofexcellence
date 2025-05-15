import React from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
  const faqs = [
    'What is the duration of the program?',
    'Do I get a certificate?',
    'How do I apply for an internship?',
  ];

  return (
    <div className="py-16 mt-10 px-10 md:px-20 bg-dark ml-9">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 flex text-small flex-col gap-6">
          {faqs.map((q, i) => (
            <FAQItem key={i} question={q} />
          ))}
        </div>
        <div className="md:w-1/3 h-[250px] bg-sub-dark p-6 rounded-lg text-white flex flex-col justify-between card mr-7">
          <h3 className="text-medium font-bold mb-2">Still have questions?</h3>
          <p className="text-small text-gray mb-4">
            Drop your question and our team will get back to you shortly.
          </p>
          <input
            type="text"
            placeholder="Type your question here..."
            className="p-2 rounded-md bg-sub-dark border border-[var(--border-accent)] w-full text-white"
          />
          <button className="btn-primary w-full">Submit Question</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;