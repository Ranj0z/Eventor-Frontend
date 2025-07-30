// src\components\rsvp\RSVPsection.tsx

import React, { useState } from "react";
import RSVPCardTemplate from "./RSVPCardTemplate";
import CreateRSVPForm from "./CreateRSVPForm";
import { useGetAllRSVPsQuery } from "../../reducers/RSVP/rsvpAPI";
import { useGetUsersQuery } from "../../reducers/Users/usersAPI";
import { useGetAllEventsQuery } from "../../reducers/Events/eventsAPI";

const RSVPsection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Fetch data from APIs
  const { 
    data: rsvpData, 
    isLoading: rsvpLoading, 
    error: rsvpError 
  } = useGetAllRSVPsQuery();
  
  const { 
    data: usersData, 
    isLoading: usersLoading, 
    error: usersError 
  } = useGetUsersQuery();
  
  const { 
    data: eventsData, 
    isLoading: eventsLoading, 
    error: eventsError 
  } = useGetAllEventsQuery();

  // Helper functions
  const getUserFirstName = (userId: number) => {
    if (!usersData?.data) return "Unknown User";
    const user = usersData.data.find((u) => u.UserID === userId);
    return user ? user.firstName : "Unknown User";
  };

  const getEventTitle = (eventId: number | null) => {
    if (!eventId || !eventsData?.Events) return "Unknown Event";
    const event = eventsData.Events.find((e) => e.EventID === eventId);
    return event ? event.title : "Unknown Event";
  };

  // Format reservations data to match your existing structure
  const formattedReservations = React.useMemo(() => {
    if (!rsvpData?.reservations) return [];
    
    return rsvpData.reservations.map((reservation) => ({
      ReservationID: reservation.RSVPID,
      ReferenceID: reservation.RSVPID,
      userName: getUserFirstName(reservation.UserID),
      eventTitle: getEventTitle(reservation.EventID),
      ReservationDate: reservation.RSVPDate,
      RSVPStatus: reservation.RSVPStatus,
      totalAmount: parseFloat(reservation.totalAmount),
      EventID: reservation.EventID,
    }));
  }, [rsvpData, usersData, eventsData]);

  // Debug information
  const debugInfo = {
    rsvpData: rsvpData ? `${rsvpData.reservations?.length || 0} RSVPs` : 'No RSVP data',
    usersData: usersData ? `${usersData.data?.length || 0} users` : 'No user data',
    eventsData: eventsData ? `${eventsData.Events?.length || 0} events` : 'No event data',
    formattedCount: formattedReservations.length,
    errors: {
      rsvp: rsvpError ? 'RSVP Error' : 'OK',
      users: usersError ? 'Users Error' : 'OK',
      events: eventsError ? 'Events Error' : 'OK'
    }
  };

  // Loading state
  if (rsvpLoading || usersLoading || eventsLoading) {
    return (
      <div className="h-full bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl">
          <div>Loading...</div>
          <div className="text-sm mt-2">
            RSVP: {rsvpLoading ? 'Loading' : 'Done'} | 
            Users: {usersLoading ? 'Loading' : 'Done'} | 
            Events: {eventsLoading ? 'Loading' : 'Done'}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (rsvpError || usersError || eventsError) {
    return (
      <div className="h-full bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error loading data:</div>
          <div className="text-sm mt-2">
            {rsvpError && <div>RSVP API Error</div>}
            {usersError && <div>Users API Error</div>}
            {eventsError && <div>Events API Error</div>}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 px-4 py-2 rounded text-white"
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
            RSVP Summary ({formattedReservations.length})
          </h1>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs bg-gray-700 text-white px-2 py-1 rounded"
          >
            Debug
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          Create New RSVP
        </button>
      </div>

      {/* Debug Info */}
      {showDebug && (
        <div className="bg-gray-800 text-white p-4 m-4 rounded text-sm">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          
          {/* Sample data preview */}
          <div className="mt-4">
            <h4 className="font-bold">Sample RSVP:</h4>
            <pre>{JSON.stringify(rsvpData?.reservations?.[0], null, 2)}</pre>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold">Sample User:</h4>
            <pre>{JSON.stringify(usersData?.data?.[0], null, 2)}</pre>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold">Sample Event:</h4>
            <pre>{JSON.stringify(eventsData?.Events?.[0], null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Scrollable Cards Section */}
      <div className="px-4 py-6 pb-20">
        {formattedReservations.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-4">No RSVPs found</p>
            <p>Create your first RSVP to get started!</p>
            {showDebug && (
              <div className="mt-4 text-xs">
                <div>Raw RSVP count: {rsvpData?.reservations?.length || 0}</div>
                <div>Formatted count: {formattedReservations.length}</div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="
              grid gap-4
              grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
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
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            + create RSVP
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPsection;