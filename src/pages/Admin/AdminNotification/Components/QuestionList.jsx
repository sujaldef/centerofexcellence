import React, { useState } from 'react';
import { FiSend, FiArchive, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const QuestionList = () => {
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      user: 'John Doe',
      question: 'How can I register for the Tech Summit 2025?',
      date: '2025-04-20',
      status: 'pending',
    },
    {
      id: 'q2',
      user: 'Jane Smith',
      question: 'What are the prerequisites for the AI Hackathon?',
      date: '2025-04-19',
      status: 'pending',
    },
    {
      id: 'q3',
      user: 'Alex Brown',
      question: 'Is there a refund policy for workshops?',
      date: '2025-04-18',
      status: 'answered',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const itemsPerPage = 2;

  const handleAnswerSubmit = (questionId) => {
    if (answer.trim()) {
      setQuestions(questions.map((q) =>
        q.id === questionId ? { ...q, status: 'answered' } : q
      ));
      setAnswer('');
      setSelectedQuestion(null);
      toast.success('Answer submitted successfully!', { theme: 'dark' });
    } else {
      toast.error('Please enter an answer.', { theme: 'dark' });
    }
  };

  const handleArchive = (questionId) => {
    setQuestions(questions.map((q) =>
      q.id === questionId ? { ...q, status: 'archived' } : q
    ));
    toast.info('Question archived.', { theme: 'dark' });
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleQuestions = questions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#ffffff]">User Questions</h2>
      {visibleQuestions.length === 0 ? (
        <div className="bg-[#000000]/50 p-6 rounded-xl border border-[#6A1B9A]/20 text-center">
          <p className="text-[#ffffff]/60 text-sm">No questions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-[#000000] p-5 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-[#6A1B9A]/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-fadeIn"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base text-[#ffffff]">{question.question}</p>
                  <p className="text-xs text-[#ffffff]/60 mt-1">
                    {question.user} • {question.date}
                  </p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full inline-block mt-2 font-medium text-[#ffffff] ${
                      question.status === 'pending'
                        ? 'bg-yellow-600'
                        : question.status === 'answered'
                        ? 'bg-green-600'
                        : 'bg-gray-600'
                    } shadow-sm`}
                  >
                    {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-col gap-3 ml-4">
                  <button
                    onClick={() => setSelectedQuestion(question.id)}
                    className="bg-[#AB47BC] shadow-md hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] text-[#ffffff] px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                    aria-label={`Answer ${question.question}`}
                  >
                    <FiSend /> Answer
                  </button>
                  <button
                    onClick={() => handleArchive(question.id)}
                    className="border border-[#6A1B9A] text-[#ffffff] px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold hover:bg-[#6A1B9A]/20 transition-all duration-200 shadow-md"
                    aria-label={`Archive ${question.question}`}
                  >
                    <FiArchive /> Archive
                  </button>
                </div>
              </div>
              {selectedQuestion === question.id && (
                <div className="mt-4">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full p-3 rounded-lg bg-[#000000]/50 border border-[#6A1B9A]/30 text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#AB47BC] transition-all duration-200"
                    rows="4"
                    aria-label="Answer input"
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleAnswerSubmit(question.id)}
                      className="flex-1 bg-[#AB47BC] text-[#ffffff] px-4 py-2 rounded-lg font-semibold hover:bg-[linear-gradient(90deg,#8E24AA_0%,#4A148C_100%)] transition-all duration-200"
                      aria-label="Submit answer"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="flex-1 border border-[#6A1B9A] text-[#ffffff] px-4 py-2 rounded-lg font-semibold hover:bg-[#6A1B9A]/20 transition-all duration-200"
                      aria-label="Cancel answer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {questions.length > itemsPerPage && (
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
            disabled={startIndex + itemsPerPage >= questions.length}
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

export default QuestionList;