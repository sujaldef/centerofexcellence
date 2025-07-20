// index.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../../redux/slices/eventSlice';
import HeroSection from './Components/HeroSection';
import EventDescription from './Components/EventDescription';
import EventHighlights from './Components/EventHighlights';
import EventCountdown from './Components/EventCountdown';
import EventTimeline from './Components/EventTimeline';
import PastEvents from './Components/PastEvents';
import Sponsors from './Components/Sponsors';

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const dispatch = useDispatch();
  const { selectedEvent, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="bg-[#01010f] text-[var(--light)] min-h-screen flex items-center justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#01010f] text-[var(--light)] min-h-screen flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="bg-[#01010f] text-[var(--light)] min-h-screen flex items-center justify-center">
        <p>No event found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#01010f] text-[var(--light)] min-h-screen">
      <HeroSection heroData={{
        title: selectedEvent.eventName,
        subtitle: selectedEvent.tagline,
        buttonText: 'Register Now',
        backgroundImage: selectedEvent.bannerImage || '/bgimage.eventdes.png',
      }} />
      <EventDescription description={selectedEvent.description} />
      <EventHighlights highlightsData={selectedEvent.highlights || []} />
      <EventCountdown countdownData={{
        eventDate: `${selectedEvent.year}-${selectedEvent.month}-${selectedEvent.date}T00:00:00`,
        dateLabel: `${selectedEvent.month} ${selectedEvent.date}, ${selectedEvent.year}`,
        venue: selectedEvent.location,
      }} />
      <EventTimeline timelineData={selectedEvent.highlights?.map((highlight, index) => ({
        date: `${selectedEvent.month} ${selectedEvent.date}`,
        time: highlight.time || 'TBD',
        location: highlight.location || selectedEvent.location || 'TBD',
        title: highlight.title,
        description: highlight.description,
        image: highlight.image || `/timelineimg.${index + 1}.png`,
      })) || []} />
      <PastEvents pastEvents={selectedEvent.relatedEvents || []} />
      <Sponsors sponsorsData={{
        title: 'Our Sponsors',
        logos: selectedEvent.sponsors?.map(sponsor => sponsor.logo) || [],
      }} />
    </div>
  );
};

export default EventDetails;