// src/components/events/EventsSection.tsx

import React from "react";
import EventCard from "./EventCardTemplate";
import { useGetAllEventsQuery, type TEvents } from "../../reducers/Events/eventsAPI";
import { useGetAllVenuesQuery } from "../../reducers/Venues/venuesAPI";

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
  const {
    data: eventResponse,
    isLoading: loadingEvents,
    error: errorEvents,
  } = useGetAllEventsQuery();

  const {
    data: venueResponse,
    isLoading: loadingVenues,
    error: errorVenues,
  } = useGetAllVenuesQuery();

  const events = eventResponse?.Events || [];
  const venues = venueResponse?.Venues || [];

  const venueMap: Record<number, string> = {};
  venues.forEach((venue: any) => {
    venueMap[venue.VenueID] = venue.venueName;
  });

  const pastEvents = events.filter((event: TEvents) => isPast(event.date));
  const todayEvents = events.filter((event: TEvents) => isToday(event.date));
  const upcomingEvents = events.filter((event: TEvents) => isUpcoming(event.date));

  const renderSection = (
    title: string,
    events: TEvents[],
    color: string,
    hideIfEmpty = false
  ) => {
    if (hideIfEmpty && events.length === 0) return null;

    return (
      <section className="mb-8">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${color}`}>
          {title}
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500 italic">No events in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
                image_url={
                  event.image_url ||
                  "https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007171/samples/man-on-a-street.jpg"
                }
                venueName={venueMap[event.VenueID] || "Unknown Venue"}
              />
            ))}
          </div>
        )}
      </section>
    );
  };

  const hasAnyEvents = todayEvents.length > 0 || upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
          Events We’re Hosting
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mt-2">
          Discover and book tickets to upcoming experiences near you.
        </p>
      </div>

      {/* Scrollable Events Container (70% screen height) */}
      <div className="h-[75vh] overflow-y-auto pr-1">
        {loadingEvents || loadingVenues ? (
          <p className="text-center text-gray-500 italic">Loading events...</p>
        ) : errorEvents || errorVenues ? (
          <p className="text-center text-red-500">
            Error loading events or venues.
          </p>
        ) : (
          <>
            {renderSection("Happening Today", todayEvents, "text-blue-600", true)}
            {renderSection("Upcoming Events", upcomingEvents, "text-green-600", true)}
            {renderSection("Past Events", pastEvents, "text-red-600", true)}

            {!hasAnyEvents && (
              <p className="text-center text-gray-500 italic">
                No events available at the moment.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
