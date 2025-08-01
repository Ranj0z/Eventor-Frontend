// src/components/rsvp/UserRSVPSection.tsx

import React, { useState } from "react";
import { useSelector } from "react-redux";
import RSVPCardTemplate from "./RSVPCardTemplate";
import CreateRSVPForm from "./CreateRSVPForm";
import { useGetRSVPsByUserIdQuery } from "../../reducers/RSVP/rsvpAPI";
import { useGetAllEventsQuery } from "../../reducers/Events/eventsAPI";
import type { RootState } from "../../app/store";

export type FormattedReservation = {
  ReservationID: number;
  ReferenceID: number;
  userName: string;
  eventTitle: string;
  ReservationDate: string;
  RSVPStatus?: string;
  totalAmount: number;
  EventID: number;
};

const UserRSVPSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Get current user from Redux store
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.UserID;
  const userName = user?.firstName || "User";

  // Fetch user's RSVPs - skip if no userId
  const { 
    data: rsvpData, 
    isLoading: rsvpLoading,
    isFetching: rsvpFetching, 
    error: rsvpError 
  } = useGetRSVPsByUserIdQuery(userId!, {
    skip: !userId
  });
  
  // Fetch all events for event title resolution
  const { 
    data: eventsData, 
    isLoading: eventsLoading, 
    error: eventsError 
  } = useGetAllEventsQuery();

  // Helper function to get event title
  const getEventTitle = (eventId: number | null) => {
    if (!eventId || !eventsData?.Events) return "Unknown Event";
    const event = eventsData.Events.find((e) => e.EventID === eventId);
    return event ? event.title : "Unknown Event";
  };

  // Format reservations data for display
  const formattedReservations = React.useMemo(() => {
    if (!rsvpData?.reservation) return [];
    
    return rsvpData.reservation.map((reservation) => ({
      ReservationID: reservation.RSVPID,
      ReferenceID: reservation.RSVPID,
      userName: userName,
      eventTitle: getEventTitle(reservation.EventID),
      ReservationDate: reservation.RSVPDate,
      RSVPStatus: reservation.RSVPStatus,
      totalAmount: parseFloat(reservation.totalAmount || "0"),
      EventID: reservation.EventID,
    }));
  }, [rsvpData, eventsData, userName]);

  // Debug information
  const debugInfo = {
    userId: userId || 'Not logged in',
    userName: userName,
    rsvpData: rsvpData ? `${rsvpData.reservation?.length || 0} RSVPs` : 'No RSVP data',
    eventsData: eventsData ? `${eventsData.Events?.length || 0} events` : 'No event data',
    formattedCount: formattedReservations.length,
    isLoading: rsvpLoading,
    isFetching: rsvpFetching,
    errors: {
      rsvp: rsvpError ? 'RSVP Error' : 'OK',
      events: eventsError ? 'Events Error' : 'OK'
    }
  };

  // Not logged in state
  if (!userId) {
    return (
      <div className="h-full bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-xl mb-4">Please log in to view your RSVPs</div>
          <p>You need to be logged in to see your event reservations.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (rsvpLoading || eventsLoading) {
    return (
      <div className="h-full bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl text-center">
          <div>Loading your RSVPs...</div>
          <div className="text-sm mt-2 text-gray-400">
            RSVPs: {rsvpLoading ? 'Loading' : 'Done'} | 
            Events: {eventsLoading ? 'Loading' : 'Done'}
          </div>
          {rsvpFetching && (
            <div className="text-sm text-blue-400 mt-1">Refreshing...</div>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (rsvpError || eventsError) {
    return (
      <div className="h-full bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error loading your RSVPs:</div>
          <div className="text-sm mt-2">
            {rsvpError && <div>Could not load your RSVPs</div>}
            {eventsError && <div>Could not load event information</div>}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto bg-gray-900 w-full overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-900 z-10 px-4 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-white">
            My RSVPs ({formattedReservations.length})
          </h1>
          <span className="text-sm text-gray-400">Welcome, {userName}!</span>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
          >
            Debug
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded shadow transition-colors"
        >
          Create New RSVP
        </button>
      </div>

      {/* Debug Info */}
      {showDebug && (
        <div className="bg-gray-800 text-white p-4 m-4 rounded text-sm">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
          
          {/* Sample data preview */}
          {rsvpData?.reservation?.[0] && (
            <div className="mt-4">
              <h4 className="font-bold">Sample RSVP:</h4>
              <pre className="whitespace-pre-wrap">{JSON.stringify(rsvpData.reservation[0], null, 2)}</pre>
            </div>
          )}
          
          {eventsData?.Events?.[0] && (
            <div className="mt-4">
              <h4 className="font-bold">Sample Event:</h4>
              <pre className="whitespace-pre-wrap">{JSON.stringify(eventsData.Events[0], null, 2)}</pre>
            </div>
          )}

          {user && (
            <div className="mt-4">
              <h4 className="font-bold">Current User:</h4>
              <pre className="whitespace-pre-wrap">{JSON.stringify(user, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* Scrollable Cards Section */}
      <div className="px-4 py-6 pb-20">
        {formattedReservations.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <div className="text-6xl mb-4">🎟️</div>
            <p className="text-xl mb-4">No RSVPs yet</p>
            <p className="mb-6">You haven't reserved any events yet. Start exploring and create your first RSVP!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
            >
              Create Your First RSVP
            </button>
            {showDebug && (
              <div className="mt-4 text-xs text-left max-w-md mx-auto bg-gray-800 p-3 rounded">
                <div>User ID: {userId}</div>
                <div>Raw RSVP count: {rsvpData?.reservation?.length || 0}</div>
                <div>Formatted count: {formattedReservations.length}</div>
                <div>Has RSVP data: {!!rsvpData}</div>
                <div>Has events data: {!!eventsData}</div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="
              grid gap-4
              grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
            "
          >
            {formattedReservations.map((reservation) => (
              <RSVPCardTemplate
                key={reservation.ReservationID}
                reservation={reservation}
              />
            ))}
          </div>
        )}
      </div>

      {/* RSVP Form Modal */}
      {showForm && (
        <CreateRSVPForm 
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onRSVPCreated={() => {
            // This will trigger a refetch of user's RSVPs
            setShowForm(false);
          }}
          defaultUserID={userId}
        />
      )}
    </div>
  );
};

export default UserRSVPSection;