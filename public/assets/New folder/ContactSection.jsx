import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactCard from './ContactCard';
import CallToAction from './CallToAction';

const ContactSection = () => {
  const contacts = [
    {
      icon: <FaPhoneAlt className="text-[#6A1B9A] bg- w-6 h-6 mt-1" />,
      title: "Phone",
      detail: "+91 12345 67890",
    },
    {
      icon: <FaEnvelope className="text-[#6A1B9A] w-6 h-6 mt-1" />,
      title: "Email",
      detail: "info@yourdomain.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-[#6A1B9A] w-6 h-6 mt-1" />,
      title: "Address",
      detail: "Medi-Caps University, Indore, India",
    },
  ];

  return (
    <div className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-850 rounded-xl p-10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-gray-700/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-30 rounded-xl"></div>
            <div className="flex items-center gap-4">
              <div>{contact.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-white">{contact.title}</h3>
                <p className="text-sm text-gray-400">{contact.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CallToAction />
    </div>
  );
};

export default ContactSection;
