import React from "react";
import { FaPlus, FaTrash, FaQuestionCircle, FaPenNib } from "react-icons/fa";

const FAQ = ({ faqs, handleFaqChange, addFaq, deleteFaq }) => {
  return (
    <section className="bg-dark p-6 rounded-xl card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">FAQ</h3>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="relative bg-sub-dark rounded-xl p-6 space-y-4 border border-[var(--border-accent)]/50"
          >
            <div className="flex items-center gap-3">
              <FaQuestionCircle className="text-[var(--border-accent)] w-5 h-5" />
              <input
                value={faq.question}
                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                placeholder="Enter your question"
              />
            </div>
            <div className="flex items-start gap-3">
              <FaPenNib className="text-[var(--border-accent)] w-5 h-5 mt-3" />
              <textarea
                value={faq.answer}
                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:ring-2 focus:ring-[var(--border-accent)] text-white h-24 resize-y transition duration-200"
                placeholder="Enter the answer"
              />
              <button
                onClick={() => deleteFaq(idx)}
                className="absolute top-0 right-3 btn-danger p-1 text-red-600 rounded-full"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addFaq}
          className="mt-4 btn-primary text-sm flex items-center gap-2"
        >
          <FaPlus /> Add Question
        </button>
      </div>
    </section>
  );
};

export default FAQ;