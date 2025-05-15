import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from './Components/TopBar';
import QuickActions from './Components/QuickActions';
import EventCard from './Components/EventCard';
import Sidebar from '../AdminDashboard/Components/Sidebar';
import SearchAndFilters from './Components/SearchAndFilters';
import { fetchEvents } from '../../../redux/slices/eventSlice';

const Index = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const eventsPerPage = 9;

  // Fetch events on mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Log events to debug IDs
  useEffect(() => {
    console.log('Fetched events:', events);
  }, [events]);

  // Calculate daysLeft based on date, month, and year
  const calculateDaysLeft = (event) => {
    const eventDate = new Date(`${event.year}-${event.month}-${event.date}`);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  // Handle event cancellation
  const handleCancelEvent = (id) => {
    console.log(`Event ${id} canceled`);
  };

  // Filter and sort events
  const filteredEvents = events
    .filter((event) =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) => (categoryFilter ? event.category === categoryFilter : true))
    .filter((event) => (typeFilter ? event.eventMode === typeFilter : true))
    .filter((event) => (statusFilter ? event.status === statusFilter : true))
    .filter((event) => (eventTypeFilter ? event.eventMode === eventTypeFilter : true))
    .sort((a, b) => {
      switch (sortOption) {
        case 'date_newest':
          return (
            new Date(`${b.year}-${b.month}-${b.date}`) -
            new Date(`${a.year}-${a.month}-${a.date}`)
          );
        case 'date_oldest':
          return (
            new Date(`${a.year}-${a.month}-${a.date}`) -
            new Date(`${b.year}-${b.month}-${b.year}`)
          );
        case 'name_asc':
          return a.eventName.localeCompare(b.eventName);
        case 'name_desc':
          return b.eventName.localeCompare(a.eventName);
        case 'status_upcoming':
          return a.status === 'upcoming' ? -1 : 1;
        case 'status_ongoing':
          return a.status === 'ongoing' ? -1 : 1;
        case 'status_past':
          return a.status === 'past' ? -1 : 1;
        default:
          return 0;
      }
    });

  // Pagination
  const totalEvents = filteredEvents.length;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (indexOfLastEvent < totalEvents) setCurrentPage(currentPage + 1);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    console.log('Notifications:', notificationsEnabled ? 'Disabled' : 'Enabled');
  };

  if (loading) return <p className="text-gray text-center">Loading events...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-dark text-gray">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6">
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortOption}
            setSortBy={setSortOption}
            filterType={eventTypeFilter}
            setFilterType={setEventTypeFilter}
          />
          <QuickActions
            selectedFilter={statusFilter}
            setSelectedFilter={setStatusFilter}
          />
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.length > 0 ? (
                currentEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    image={event.thumbnailImage}
                    eventName={event.eventName}
                    date={`${event.date} ${event.month} ${event.year}`}
                    location={event.location}
                    category={event.category}
                    status={event.status}
                    daysLeft={calculateDaysLeft(event)}
                    onCancel={handleCancelEvent}
                  />
                ))
              ) : (
                <p className="text-gray col-span-full text-center">
                  No events match the current filters.
                </p>
              )}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="btn-primary text-small disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="text-gray py-2">
                Page {currentPage} of {Math.ceil(totalEvents / eventsPerPage)}
              </span>
              <button
                onClick={handleNext}
                disabled={indexOfLastEvent >= totalEvents}
                className="btn-primary text-small disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;