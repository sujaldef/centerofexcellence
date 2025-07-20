// src/Components/EventDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../../.././../redux/slices/eventSlice';
import EventHighlights from './EventHighlights';
import { toast } from 'react-toastify';

const EventDetails = ({ eventId }) => {
  const dispatch = useDispatch();
  const { selectedEvent, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!selectedEvent) {
    return <div className="text-center text-white">Event not found</div>;
  }

  return (
    <div className="md:w-2/5 bg-[#01010f] text-white p-10 flex flex-col items-start justify-center">
      <img
        src={selectedEvent.bannerImage || '/event1.jpg'}
        alt={selectedEvent.eventName}
        className="w-full max-w-md mb-6 rounded-xl shadow-md"
      />
      <div className="ml-10">
        <h1 className="text-3xl font-bold mb-2 text-left">{selectedEvent.eventName}</h1>
        <p className="text-lg text-left mb-4">
          {selectedEvent.date} {selectedEvent.month} {selectedEvent.year} | {selectedEvent.location}
        </p>
        <p className="text-left mb-2">{selectedEvent.organizer}</p>
        <p className="text-sm text-[var(--light)] text-left max-w-md">{selectedEvent.description}</p>
        <EventHighlights highlights={selectedEvent.highlights} />
      </div>
    </div>
  );
};

export default EventDetails;