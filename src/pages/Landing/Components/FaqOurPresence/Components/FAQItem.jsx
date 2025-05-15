import React from 'react';

const FAQItem = ({ question }) => {
  return (
    <div className="bg-sub-dark text-white p-4 rounded-lg card">
      <details>
        <summary className="cursor-pointer text-medium font-semibold">
          {question}
        </summary>
        <p className="mt-2 text-small text-gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, tempora.
        </p>
      </details>
    </div>
  );
};

export default FAQItem;