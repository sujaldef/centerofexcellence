import React, { useEffect, useState } from 'react';

const TopEvents = () => {
  const [topEvents, setTopEvents] = useState([]);

  useEffect(() => {
    fetch('/eventsdata.json')
      .then((res) => res.json())
      .then((data) => {
        const selected = data.filter((event) =>
          ['A050', 'A061', 'A059'].includes(event.event_id)
        );
        setTopEvents(selected);
      })
      .catch((err) => console.error("Failed to load top events:", err));
  }, []);

  return (
    <div className="mb-40 px-4">
      <h2 className="text-center text-white text-3xl font-bold mb-8">Top Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topEvents.map((event) => (
          <div
            key={event.event_id}
            className="relative flex rounded-lg overflow-hidden h-56 bg-cover bg-center text-white"
            style={{
              backgroundImage: `url(${event.eventCardImg || event.eventPosterImg || '/default.jpg'})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 z-0" />
            <div className="relative z-10 flex w-full">
              <div className="w-1/2"></div>
              <div className="p-4 flex flex-col items-center justify-between w-1/3">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-sm text-gray-300">
                    {event.categoryTags?.join(', ') || 'General'}
                  </p>
                </div>
                <a
                  href={`/event-details?event_id=${event.event_id}`}
                  className="border border-primary text-primary px-3 py-1 rounded-md"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEvents;
