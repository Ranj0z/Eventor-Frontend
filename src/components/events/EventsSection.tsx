import React from "react";
import EventCard from "./EventCardTemplate";
import { EventsData, venueMap } from "./Events.data";

// Utility functions
const isToday = (dateStr: string) => {
  const today = new Date();
  const eventDate = new Date(dateStr);
  return (
    today.getFullYear() === eventDate.getFullYear() &&
    today.getMonth() === eventDate.getMonth() &&
    today.getDate() === eventDate.getDate()
  );
};

const isPast = (dateStr: string) => {
  const today = new Date();
  const eventDate = new Date(dateStr);
  return eventDate < new Date(today.setHours(0, 0, 0, 0));
};

const isUpcoming = (dateStr: string) => {
  const today = new Date();
  const eventDate = new Date(dateStr);
  return eventDate > new Date(today.setHours(23, 59, 59, 999));
};

const EventsSection: React.FC = () => {
  const pastEvents = EventsData.filter((event) => isPast(event.date));
  const todayEvents = EventsData.filter((event) => isToday(event.date));
  const upcomingEvents = EventsData.filter((event) => isUpcoming(event.date));

  const renderSection = (
    title: string,
    events: typeof EventsData,
    color: string,
    hideIfEmpty = false
  ) => {
    if (hideIfEmpty && events.length === 0) return null;

    return (
      <section className="mb-12">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${color}`}>
          {title}
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500 italic">No events in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {events.map((event) => (
              <EventCard
                key={event.EventID}
                title={event.title}
                description={event.description}
                category={event.category}
                date={event.date}
                time={event.time}
                ticketsPrice={event.ticketsPrice}
                totalTickets={event.totalTickets}
                soldTickets={event.soldTickets}
                image_url={event.image_url}
                venueName={venueMap[event.VenueID] || "Unknown Venue"}
              />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen h-auto overflow-y-auto bg-gray-50 px-4 sm:px-6 md:px-10 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
          Events We’re Hosting
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mt-2">
          Discover and book tickets to upcoming experiences near you.
        </p>
      </div>

      {/* Conditional Sections */}
      {renderSection("Happening Today", todayEvents, "text-blue-600", true)}
      {renderSection("Upcoming Events", upcomingEvents, "text-green-600", true)}
      {renderSection("Past Events", pastEvents, "text-red-600", true)}

      {/* If all are empty */}
      {todayEvents.length === 0 &&
        upcomingEvents.length === 0 &&
        pastEvents.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No events available at the moment.
          </p>
        )}
    </div>
  );
};

export default EventsSection;
