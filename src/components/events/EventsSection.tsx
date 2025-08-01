// src/components/events/EventsSection.tsx

import React, { useState } from "react";
import EventCard from "./EventCardTemplate";
import { useGetAllEventsQuery, type TEvents } from "../../reducers/Events/eventsAPI";
import { useGetAllVenuesQuery } from "../../reducers/Venues/venuesAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import CreateEventModal from "../../pages/Events/CreateEventModal";

// --- Date Helpers ---
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

// --- Main Component ---
const EventsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const {
    data: eventResponse,
    isLoading: loadingEvents,
    refetch,
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
                reloadEvents ={refetch}
                key={event.EventID}
                {...event}
                venueName={venueMap[event.VenueID] || "Unknown Venue"}
                image_url={
                  event.image_url ||
                  "https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007171/samples/man-on-a-street.jpg"
                }
              />
            ))}
          </div>
        )}
      </section>
    );
  };

  const hasAnyEvents =
    todayEvents.length > 0 || upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <div className="pl-4 sm:pl-6 md:pl-10 py-4">
      {/* Header */}
      <div className="text-center mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            Events We’re Hosting
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg mt-2">
            Discover and book tickets to upcoming experiences near you.
          </p>
        </div>

        {/* Only Admins See This Button */}
        {isAdmin && (
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Create New Event
            </button>
          </div>
        )}
      </div>

      {/* <div className="flex max-h-[70vh] overflow-y-auto"> */}
         {/* Events List */}
        <div className="h-[75vh] overflow-y-auto">
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

        {/* Modal Rendered Here */}
        <CreateEventModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            reloadEvents={refetch}
        />
      {/* </div> */}

     
    </div>
  );
};

export default EventsSection;