import React from 'react';

const ContactCard = ({ icon, title, detail }) => {
  return (
    <div className="flex bg-gray-900 p-12 m-12 rounded-2xl items-center justify-center gap-4">
      {icon}
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-300">{detail}</p>
      </div>
    </div>
  );
};

export default ContactCard;