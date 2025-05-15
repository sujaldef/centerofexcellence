import React from 'react';
import EventDetails from './Components/EventDetails';
import RegistrationForm from './Components/RegistrationForm';

const Index = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen text-[var(--light)]">
      <EventDetails />
      <RegistrationForm />
    </div>
  );
};

export default Index;