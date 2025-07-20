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
        
      </div>
    </div>
  );
};

export default FAQ;