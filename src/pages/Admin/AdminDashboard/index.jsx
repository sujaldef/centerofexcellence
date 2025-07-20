import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import SearchAndFilters from './Components/SearchAndFilters';
import StatsCard from './Components/StatsCard';
import ActionButtons from './Components/ActionButtons';
import EventSection from './Components/EventSection';
import EventCalendar from './Components/EventCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, clearError } from '../../../redux/slices/eventSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [ongoingPage, setOngoingPage] = useState(0);
  const [pastPage, setPastPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterType, setFilterType] = useState('');
  const [showStatsDetails, setShowStatsDetails] = useState(false);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 2;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    console.log('Current events:', events);
  }, [error, events]);

  const categorizeEvents = (events) => {
    const now = new Date();
    return {
      upcoming: events.filter((event) => {
        const eventDate = new Date(`${event.month} ${event.date}, ${event.year}`);
        console.log(`Event: ${event.title}, Parsed Date: ${eventDate}, Original: ${event.month} ${event.date}, ${event.year}`);
        return eventDate > now;
      }),
      ongoing: events.filter((event) => {
        const eventDate = new Date(`${event.month} ${event.date}, ${event.year}`);
        return eventDate <= now && event.status === 'Active';
      }),
      past: events.filter((event) => {
        const eventDate = new Date(`${event.month} ${event.date}, ${event.year}`);
        return eventDate <= now && (event.status === 'Completed' || event.status === 'Cancelled' || event.status === 'Pending');
      }),
    };
  };

  const { upcoming, ongoing, past } = useMemo(() => categorizeEvents(events), [events]);

  const filterAndSortEvents = (events) => {
    let filtered = [...events];
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterType) {
      filtered = filtered.filter((event) => event.type === filterType);
    }
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(`${b.month} ${b.date}, ${b.year}`) - new Date(`${a.month} ${a.date}, ${a.year}`);
      }
      return a.title.localeCompare(b.title);
    });
    return filtered;
  };

  const upcomingEvents = useMemo(() => filterAndSortEvents(upcoming), [upcoming, searchQuery, sortBy, filterType]);
  const ongoingEvents = useMemo(() => filterAndSortEvents(ongoing), [ongoing, searchQuery, sortBy, filterType]);
  const pastEvents = useMemo(() => filterAndSortEvents(past), [past, searchQuery, sortBy, filterType]);

  const exportToCSV = (events, section) => {
    const headers = ['Title', 'Type', 'Date', 'Attendees', 'Max Attendees', 'Status'];
    const rows = events.map((event) => [
      event.title,
      event.type,
      `${event.month} ${event.date}, ${event.year}`,
      event.attendees,
      event.capacity || 'N/A',
      event.status,
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${section}-events.csv`;
    link.click();
    toast.success(`${section} events exported successfully!`);
  };

  return (
    <div className="min-h-screen bg-dark text-gray flex font-sans">
      <Sidebar />
      <div className="flex-1 p-8 space-y-6">
        <StatsCard
          showStatsDetails={showStatsDetails}
          setShowStatsDetails={setShowStatsDetails}
        />
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <ActionButtons />
        {error && (
          <div className="text-red-600 text-center">
            {error}
            <button
              onClick={() => {
                dispatch(clearError());
                dispatch(fetchEvents());
              }}
              className="ml-2 text-[var(--primary-color)] hover:text-[var(--border-accent)]"
            >
              Retry
            </button>
          </div>
        )}
        {loading && <p className="text-white/60 text-center">Loading events...</p>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EventSection
            title="Upcoming Events"
            events={upcomingEvents}
            currentPage={upcomingPage}
            setCurrentPage={setUpcomingPage}
            section="Upcoming"
            itemsPerPage={itemsPerPage}
            exportToCSV={exportToCSV}
          />
          <EventSection
            title="Ongoing Events"
            events={ongoingEvents}
            currentPage={ongoingPage}
            setCurrentPage={setOngoingPage}
            section="Ongoing"
            itemsPerPage={itemsPerPage}
            exportToCSV={exportToCSV}
          />
          <div className="space-y-3">
            <h4 className="font-semibold text-medium text-white">Event Calendar</h4>
            <div className="bg-dark rounded-xl p-4 card">
              <EventCalendar events={events} />
            </div>
          </div>
        </div>
        <EventSection
          title="Past Events"
          events={pastEvents}
          currentPage={pastPage}
          setCurrentPage={setPastPage}
          section="Past"
          itemsPerPage={itemsPerPage}
          exportToCSV={exportToCSV}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;