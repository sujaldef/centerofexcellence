import React from 'react';
import { motion } from 'framer-motion';

const ParticipantsSection = ({ participants, handleClick }) => {
  const CopyIcon = () => (
    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    handleClick('Copy Email');
  };

  return (
    <div className="w-full max-w-7xl bg-[var(--bg-sub-dark)] px-6 sm:px-10 py-6 rounded-xl shadow-xl card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Event Participants</h2>
        <p className="text-white text-lg font-medium">
          Total participants <span className="text-[#ab47bc]">{participants.length}</span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-[var(--bg-sub-dark)] rounded-lg shadow-md">
          <thead>
            <tr className="text-white">
              <th className="p-3 text-left text-sm font-semibold">ID</th>
              <th className="p-3 text-left text-sm font-semibold">Name</th>
              <th className="p-3 text-left text-sm font-semibold">Email</th>
              <th className="p-3 text-left text-sm font-semibold">Registered On</th>
              <th className="p-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <motion.tr
                key={participant.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card transition-colors duration-200"
              >
                <td className="p-3 text-sm text-gray-300">{participant.id}</td>
                <td className="p-3 text-sm text-white flex items-center">
                  <img src={participant.image || '/user2.jpg'} alt={participant.name} className="w-8 h-8 rounded-full mr-2" />
                  {participant.name}
                </td>
                <td className="p-3 text-sm text-gray-300">{participant.email}</td>
                <td className="p-3 text-sm text-gray-300">
                  {participant.registeredOn ? new Date(participant.registeredOn).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => copyToClipboard(participant.email)}
                    className="px-2 py-1 btn-primary transition-all duration-200 text-sm flex items-center"
                  >
                    <CopyIcon /> Copy
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsSection;