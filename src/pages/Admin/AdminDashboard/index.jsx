import React, { useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import SearchAndFilters from './Components/SearchAndFilters';
import StatsCard from './Components/StatsCard';
import ActionButtons from './Components/ActionButtons';
import EventSection from './Components/EventSection';
import EventCalendar from './Components/EventCalendar';

const AdminDashboard = () => {
  const eventData = {
    upcoming: [
      {
        title: 'Tech Summit 2024',
        type: 'Conference',
        date: '2024-03-15',
        attendees: '450/500',
        status: 'Upcoming',
        badgeColor: 'bg-[var(--primary-color)]',
      },
      {
        title: 'Digital Marketing',
        type: 'Workshop',
        date: '2024-03-18',
        attendees: '200/250',
        status: 'Upcoming',
        badgeColor: 'bg-[var(--primary-color)]',
      },
      {
        title: 'Digital Marketing',
        type: 'Workshop',
        date: '2024-03-18',
        attendees: '200/250',
        status: 'Upcoming',
        badgeColor: 'bg-[var(--primary-color)]',
      },
      {
        title: 'Digital Marketing',
        type: 'Workshop',
        date: '2024-03-18',
        attendees: '200/250',
        status: 'Upcoming',
        badgeColor: 'bg-[var(--primary-color)]',
      },
    ],
    ongoing: [
      {
        title: 'Web3 Hackathon',
        type: 'Hackathon',
        date: '2024-03-10',
        attendees: '180/200',
        status: 'Ongoing',
        badgeColor: 'bg-green-600',
      },
      {
        title: 'AI Workshop Series',
        type: 'Workshop',
        date: '2024-03-01',
        attendees: '95/100',
        status: 'Ongoing',
        badgeColor: 'bg-green-600',
      },
      {
        title: 'AI Workshop Series',
        type: 'Workshop',
        date: '2024-03-01',
        attendees: '95/100',
        status: 'Ongoing',
        badgeColor: 'bg-green-600',
      },
    ],
    past: [
      {
        title: 'Blockchain Summit',
        type: 'Conference',
        date: '2024-02-28',
        attendees: '480/500',
        status: 'Completed',
        badgeColor: 'bg-gray-600',
      },
      {
        title: 'UX Design Workshop',
        type: 'Workshop',
        date: '2024-02-25',
        attendees: '150/150',
        status: 'Completed',
        badgeColor: 'bg-gray-600',
      },
      {
        title: 'UX Design Workshop',
        type: 'Workshop',
        date: '2024-02-25',
        attendees: '150/150',
        status: 'Completed',
        badgeColor: 'bg-gray-600',
      },
      {
        title: 'UX Design Workshop',
        type: 'Workshop',
        date: '2024-02-25',
        attendees: '150/150',
        status: 'Completed',
        badgeColor: 'bg-gray-600',
      },
    ],
  };

  const [upcomingPage, setUpcomingPage] = useState(0);
  const [ongoingPage, setOngoingPage] = useState(0);
  const [pastPage, setPastPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterType, setFilterType] = useState('');
  const [showStatsDetails, setShowStatsDetails] = useState(false);
  const itemsPerPage = 2;

  // Filter and sort events
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
        return new Date(b.date) - new Date(a.date);
      }
      return a.title.localeCompare(b.title);
    });
    return filtered;
  };

  const upcomingEvents = useMemo(() => filterAndSortEvents(eventData.upcoming), [searchQuery, sortBy, filterType]);
  const ongoingEvents = useMemo(() => filterAndSortEvents(eventData.ongoing), [searchQuery, sortBy, filterType]);
  const pastEvents = useMemo(() => filterAndSortEvents(eventData.past), [searchQuery, sortBy, filterType]);

  // Export events as CSV
  const exportToCSV = (events, section) => {
    const headers = ['Title', 'Type', 'Date', 'Attendees', 'Status'];
    const rows = events.map((event) => [
      event.title,
      event.type,
      event.date,
      event.attendees,
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
              <EventCalendar />
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
    </div>
  );
};

export default AdminDashboard;