// src/Components/index.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from './Components/EventDetails';
import RegistrationForm from './Components/RegistrationForm';

const Index = () => {
  const { id } = useParams(); // Get event ID from URL

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-[var(--light)]">
      <EventDetails eventId={id} />
      <RegistrationForm eventId={id} />
    </div>
  );
};

export default Index;