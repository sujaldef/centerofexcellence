import React from 'react';

const FAQItem = ({ question }) => {
  return (
    <div className="bg-black/70 text-white p-4 rounded-lg">
      <details>
        <summary className="cursor-pointer text-lg font-semibold">
          {question}
        </summary>
        <p className="mt-2 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur, tempora.
        </p>
      </details>
    </div>
  );
};

export default FAQItem;