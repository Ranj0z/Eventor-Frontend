// src/components/events/UserEventsSection.tsx

import React, { useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCardTemplate";
import { useGetAllEventsQuery, type TEvents } from "../../reducers/Events/eventsAPI";
import { useGetAllVenuesQuery } from "../../reducers/Venues/venuesAPI";
import { useGetRSVPsByUserIdQuery } from "../../reducers/RSVP/rsvpAPI";
import type { RootState } from "../../app/store";

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

const UserEventsSection: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  
  // Get logged-in user from Redux store
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.UserID;

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

  const {
    data: rsvpResponse,
    isLoading: loadingRSVPs,
    error: errorRSVPs,
  } = useGetRSVPsByUserIdQuery(userId!, {
    skip: !userId,
  });

  const events = eventResponse?.Events || [];
  const venues = venueResponse?.Venues || [];
  const userRSVPs = rsvpResponse?.data || [];

  // Create venue mapping
  const venueMap: Record<number, string> = {};
  venues.forEach((venue: any) => {
    venueMap[venue.VenueID] = venue.venueName;
  });

  // Create RSVP mapping for quick lookup
  const rsvpMap: Record<number, { status: string; amount: number; rsvpId: number }> = {};
  userRSVPs.forEach((rsvp: any) => {
    if (rsvp.EventID) {
      rsvpMap[rsvp.EventID] = {
        status: rsvp.RSVPStatus,
        amount: parseFloat(rsvp.totalAmount),
        rsvpId: rsvp.RSVPID,
      };
    }
  });

  // Filter events to only include those the user has RSVP'd to
  const userEvents = events.filter((event: TEvents) => rsvpMap[event.EventID]);

  // Categorize user's events
  const pastEvents = userEvents.filter((event: TEvents) => isPast(event.date));
  const todayEvents = userEvents.filter((event: TEvents) => isToday(event.date));
  const upcomingEvents = userEvents.filter((event: TEvents) => isUpcoming(event.date));

  // Categorize by RSVP status
  const confirmedEvents = userEvents.filter((event: TEvents) => 
    rsvpMap[event.EventID]?.status === 'Confirmed'
  );
  const pendingEvents = userEvents.filter((event: TEvents) => 
    rsvpMap[event.EventID]?.status === 'Pending'
  );
  const cancelledEvents = userEvents.filter((event: TEvents) => 
    rsvpMap[event.EventID]?.status === 'Cancelled'
  );

  // Calculate stats
  const totalSpent = userRSVPs.reduce((sum: number, rsvp: any) => sum + parseFloat(rsvp.totalAmount), 0);
  const upcomingConfirmed = upcomingEvents.filter((event: TEvents) => 
    rsvpMap[event.EventID]?.status === 'Confirmed'
  ).length;

  const renderSection = (
    title: string,
    events: TEvents[],
    color: string,
    hideIfEmpty = false,
    showRSVPInfo = false
  ) => {
    if (hideIfEmpty && events.length === 0) return null;

    return (
      <section className="mb-8">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${color} flex items-center gap-2`}>
          {title}
          <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {events.length}
          </span>
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500 italic">No events in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event) => {
              const rsvpInfo = rsvpMap[event.EventID];
              return (
                <div key={event.EventID} className="relative">
                  <EventCard
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
                  {showRSVPInfo && rsvpInfo && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      <div className={`font-medium ${
                        rsvpInfo.status === 'Confirmed' ? 'text-green-400' :
                        rsvpInfo.status === 'Pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {rsvpInfo.status}
                      </div>
                      <div>KSh {rsvpInfo.amount.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  };

  // Debug information
  const debugInfo = {
    userId: userId,
    userName: user ? `${user.firstName} ${user.lastName}` : 'Not logged in',
    totalEvents: events.length,
    userEvents: userEvents.length,
    userRSVPs: userRSVPs.length,
    totalSpent: totalSpent,
    upcomingConfirmed: upcomingConfirmed,
    errors: {
      events: errorEvents ? 'Events Error' : 'OK',
      venues: errorVenues ? 'Venues Error' : 'OK',
      rsvps: errorRSVPs ? 'RSVPs Error' : 'OK'
    }
  };

  // Check if user is logged in
  if (!userId) {
    return (
      <div className="px-4 sm:px-6 md:px-10 py-4 flex items-center justify-center min-h-[50vh]">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl mb-4">Please Log In</h2>
          <p>You need to be logged in to view your events.</p>
        </div>
      </div>
    );
  }

  const isLoading = loadingEvents || loadingVenues || loadingRSVPs;
  const hasError = errorEvents || errorVenues || errorRSVPs;
  const hasAnyEvents = userEvents.length > 0;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            My Events
          </h1>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
          >
            Debug
          </button>
        </div>
        <p className="text-gray-600 text-sm sm:text-lg">
          Welcome {user.firstName}! Here are the events you've RSVP'd to.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-blue-600">Total Events</h3>
          <p className="text-2xl font-bold text-blue-800">{userEvents.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-green-600">Upcoming Confirmed</h3>
          <p className="text-2xl font-bold text-green-800">{upcomingConfirmed}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-yellow-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-800">{pendingEvents.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-purple-600">Total Spent</h3>
          <p className="text-2xl font-bold text-purple-800">KSh {totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Debug Info */}
      {showDebug && (
        <div className="bg-gray-100 p-4 mb-6 rounded text-sm">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}

      {/* Scrollable Events Container */}
      <div className="h-[60vh] overflow-y-auto pr-1">
        {isLoading ? (
          <p className="text-center text-gray-500 italic">Loading your events...</p>
        ) : hasError ? (
          <div className="text-center text-red-500">
            <p>Error loading events data.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 px-4 py-2 rounded text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Time-based sections */}
            {renderSection("Happening Today", todayEvents, "text-blue-600", true, true)}
            {renderSection("Upcoming Events", upcomingEvents, "text-green-600", true, true)}
            {renderSection("Past Events", pastEvents, "text-gray-600", true, true)}

            {/* Status-based sections */}
            {confirmedEvents.length > 0 && (
              <div className="border-t pt-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">By RSVP Status</h2>
                {renderSection("Confirmed", confirmedEvents, "text-green-600", false, true)}
              </div>
            )}
            {pendingEvents.length > 0 && 
              renderSection("Pending Confirmation", pendingEvents, "text-yellow-600", false, true)
            }
            {cancelledEvents.length > 0 && 
              renderSection("Cancelled", cancelledEvents, "text-red-600", false, true)
            }

            {!hasAnyEvents && (
              <div className="text-center text-gray-500 py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 4l-4 4m0 0l-4-4m4 4V7" />
                </svg>
                <p className="text-xl mb-4">No Events Yet</p>
                <p>You haven't RSVP'd to any events yet. Start exploring and book your first event!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserEventsSection;