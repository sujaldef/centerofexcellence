import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiList, FiCalendar, FiCheckSquare, FiArchive } from 'react-icons/fi';
import NotificationDropdown from './NotificationDropdown';
import TabButtons from './TabButtons';
import SearchFilters from './SearchFilters';
import EventModal from './EventModal';
import EventCard from '../../Components/EventCard';
import Sidebar from '../../Components/Sidebar';
import { fetchEvents, clearError } from '../../../../redux/slices/eventSlice';

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Event fetch error:', error);
      setTimeout(() => dispatch(clearError()), 5000); // Clear error after 5s
    }
  }, [error, dispatch]);

  const standardizeEvent = (event) => ({
    _id: event._id,
    title: event.eventName,
    category: event.category,
    venue: event.location,
    date: `${event.date} ${event.month} ${event.year}`,
    image: event.thumbnailImage,
    status: event.status === 'completed' ? 'past' : event.status === 'open' ? 'upcoming' : 'registered',
  });

  const allEvents = events.map(standardizeEvent);
  const categories = ["All Categories", ...new Set(allEvents.map((event) => event.category))];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.category && event.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    const matchesTab = selectedTab === "all" || event.status === selectedTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const tabButtons = [
    { id: "all", label: "All", icon: FiList },
    { id: "upcoming", label: "Upcoming", icon: FiCalendar },
    { id: "registered", label: "Registered", icon: FiCheckSquare },
    { id: "past", label: "Past", icon: FiArchive },
  ];

  return (
    <div className="bg-dark text-white min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <NotificationDropdown
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
        <TabButtons
          tabButtons={tabButtons}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        {loading ? (
          <p className="text-center text-gray mt-10">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                category={event.category}
                venue={event.venue}
                date={event.date}
                image={event.image}
                status={event.status}
                hideApplyButton={event.status !== "upcoming"}
                setSelectedEvent={setSelectedEvent}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray mt-10" role="alert">
            No events match your criteria. Try adjusting your search or filters.
          </p>
        )}
        {selectedEvent && (
          <EventModal selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        )}
      </main>
    </div>
  );
};

export default EventsPage;