import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventDetailsForManagement, fetchOrganizers, fetchParticipants, fetchNotifications, clearError } from '../../../redux/slices/eventSlice';
import Header from './Components/Header';
import UpdatesSection from './Components/UpdatesSection';
import ParticipantsSection from './Components/ParticipantsSection';

const Index = () => {
  const dispatch = useDispatch();
  const { id: eventId } = useParams();
  const { selectedEvent, organizers, participants, notifications, error, loading, extendDeadlineStatus, postNotificationStatus } = useSelector((state) => state.events);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventDetailsForManagement(eventId))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            dispatch(fetchOrganizers(eventId));
            dispatch(fetchParticipants(eventId));
            dispatch(fetchNotifications(eventId));
          } else {
            console.error('Failed to fetch event details:', result.payload);
            toast.error('Event not found or invalid ID', { theme: 'dark' });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching event:', err);
          toast.error('Error loading event data', { theme: 'dark' });
          setIsLoading(false);
        });
    } else {
      console.error('No event ID provided in URL');
      toast.error('No event ID provided', { theme: 'dark' });
      setIsLoading(false);
    }
  }, [dispatch, eventId]);

  // Re-fetch event details and notifications after successful actions
  useEffect(() => {
    if ((extendDeadlineStatus === 'succeeded' || postNotificationStatus === 'succeeded') && eventId) {
      dispatch(fetchEventDetailsForManagement(eventId));
      dispatch(fetchNotifications(eventId));
    }
  }, [extendDeadlineStatus, postNotificationStatus, dispatch, eventId]);

  useEffect(() => {
    if (error) {
      console.error('Redux error:', error);
      toast.error(error, { theme: 'dark' });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleClick = (label) => {
    toast.success(`${label} clicked!`, { theme: 'dark' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#01010f] text-gray-100 font-sans flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  if (!selectedEvent && !loading) {
    return (
      <div className="min-h-screen bg-[#01010f] text-gray-100 font-sans flex items-center justify-center">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01010f] text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header eventId={eventId} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UpdatesSection notifications={notifications} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ParticipantsSection participants={participants} handleClick={handleClick} />
        </motion.div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default Index;