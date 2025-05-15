import React, { useState } from 'react';
import { FiThumbsUp, FiArchive, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 's1',
      user: 'Alice Green',
      suggestion: 'Add more networking sessions to conferences.',
      date: '2025-04-21',
      status: 'pending',
      votes: 12,
    },
    {
      id: 's2',
      user: 'Bob White',
      suggestion: 'Include beginner-friendly workshops.',
      date: '2025-04-20',
      status: 'pending',
      votes: 8,
    },
    {
      id: 's3',
      user: 'Clara Black',
      suggestion: 'Offer virtual attendance options.',
      date: '2025-04-19',
      status: 'archived',
      votes: 15,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const handleUpvote = (suggestionId) => {
    setSuggestions(suggestions.map((s) =>
      s.id === suggestionId ? { ...s, votes: s.votes + 1 } : s
    ));
    toast.success('Upvoted suggestion!', { theme: 'dark' });
  };

  const handleArchive = (suggestionId) => {
    setSuggestions(suggestions.map((s) =>
      s.id === suggestionId ? { ...s, status: 'archived' } : s
    ));
    toast.info('Suggestion archived.', { theme: 'dark' });
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleSuggestions = suggestions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#ffffff]">User Suggestions</h2>
      {visibleSuggestions.length === 0 ? (
        <div className="bg-[#000000]/50 p-6 rounded-xl border border-[#6A1B9A]/20 text-center">
          <p className="text-[#ffffff]/60 text-sm">No suggestions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-[#000000] p-5 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-[#6A1B9A]/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-fadeIn"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base text-[#ffffff]">{suggestion.suggestion}</p>
                  <p className="text-xs text-[#ffffff]/60 mt-1">
                    {suggestion.user} • {suggestion.date}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full inline-block font-medium text-[#ffffff] ${
                        suggestion.status === 'pending' ? 'bg-yellow-600' : 'bg-gray-600'
                      } shadow-sm`}
                    >
                      {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                    </span>
                    <span className="text-xs text-[#ffffff]/80 flex items-center gap-1">
                      <FiThumbsUp /> {suggestion.votes} Votes
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 ml-4">
                  <button
                    onClick={() => handleUpvote(suggestion.id)}
                    className="bg-[#AB47BC] shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] text-[#ffffff] px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                    aria-label={`Upvote ${suggestion.suggestion}`}
                  >
                    <FiThumbsUp /> Upvote
                  </button>
                  <button
                    onClick={() => handleArchive(suggestion.id)}
                    className="border border-[#6A1B9A] text-[#ffffff] px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold hover:bg-[#6A1B9A]/20 transition-all duration-200 shadow-md"
                    aria-label={`Archive ${suggestion.suggestion}`}
                  >
                    <FiArchive /> Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {suggestions.length > itemsPerPage && (
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="flex items-center gap-2 text-[#AB47BC] disabled:opacity-40 hover:text-[#6A1B9A] transition-colors text-sm font-medium"
            aria-label="Previous page"
          >
            <FiChevronLeft /> Prev
          </button>
          <button
            disabled={startIndex + itemsPerPage >= suggestions.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center gap-2 text-[#AB47BC] disabled:opacity-40 hover:text-[#6A1B9A] transition-colors text-sm font-medium"
            aria-label="Next page"
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}
      <style jsx>{`
        :root {
          --primary: #6A1B9A;
          --secondary: #AB47BC;
          --gradient: linear-gradient(90deg, #9C27B0 0%, #6A1B9A 100%);
          --gradient-bg: linear-gradient(90deg, #9C27B030 0%, #6A1B9A30 100%);
          --dark: #000000;
          --light: #ffffff;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuggestionList;