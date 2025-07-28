// src\components\rsvp\UserRSVPsection.tsx

import React, { useState } from "react";
import { useSelector } from "react-redux";
import RSVPCardTemplate from "./RSVPCardTemplate";
import CreateRSVPForm from "./CreateRSVPForm";
import { useGetRSVPsByUserIdQuery } from "../../reducers/RSVP/rsvpAPI";
import { useGetAllEventsQuery } from "../../reducers/Events/eventsAPI";
import type { RootState } from "../../app/store";

const UserRSVPSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Get logged-in user from Redux store
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.UserID;

  // Fetch user's RSVPs and events data
  const { 
    data: rsvpData, 
    isLoading: rsvpLoading, 
    error: rsvpError 
  } = useGetRSVPsByUserIdQuery(userId!, {
    skip: !userId, // Skip the query if no user is logged in
  });
  
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

  // Format reservations data to match your existing structure
  const formattedReservations = React.useMemo(() => {
    if (!rsvpData?.data) return [];
    
    return rsvpData.data.map((reservation) => ({
      ReservationID: reservation.RSVPID,
      ReferenceID: reservation.RSVPID,
      userName: user?.firstName || "You", // Since it's the user's own RSVPs
      eventTitle: getEventTitle(reservation.EventID),
      ReservationDate: reservation.RSVPDate,
      RSVPStatus: reservation.RSVPStatus,
      totalAmount: parseFloat(reservation.totalAmount),
      EventID: reservation.EventID,
    }));
  }, [rsvpData, eventsData, user]);

  // Debug information
  const debugInfo = {
    userId: userId,
    userName: user ? `${user.firstName} ${user.lastName}` : 'Not logged in',
    rsvpData: rsvpData ? `${rsvpData.data?.length || 0} RSVPs` : 'No RSVP data',
    eventsData: eventsData ? `${eventsData.Events?.length || 0} events` : 'No event data',
    formattedCount: formattedReservations.length,
    errors: {
      rsvp: rsvpError ? 'RSVP Error' : 'OK',
      events: eventsError ? 'Events Error' : 'OK'
    }
  };

  // Check if user is logged in
  if (!userId) {
    return (
      <div className="max-h-[70vh] overflow-y-auto bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-center text-gray-700 py-12">
          <h2 className="text-2xl mb-4">Please Log In</h2>
          <p>You need to be logged in to view your RSVPs.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (rsvpLoading || eventsLoading) {
    return (
      <div className="max-h-[70vh] overflow-y-auto bg-gray-900 w-full overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl">
          <div>Loading your RSVPs...</div>
          <div className="text-sm mt-2">
            RSVPs: {rsvpLoading ? 'Loading' : 'Done'} | 
            Events: {eventsLoading ? 'Loading' : 'Done'}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (rsvpError || eventsError) {
    return (
          <div className="max-h-[70vh] overflow-y-auto bg-white w-full overflow-x-hidden flex items-center justify-center">
            <div className="text-red-400 text-xl text-center">
            <div>Error loading your RSVPs:</div>
            <div className="text-sm mt-2">
                {rsvpError && <div>RSVP API Error</div>}
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
    <div className="max-h-[70vh] overflow-y-auto bg-white w-full overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              My RSVPs ({formattedReservations.length})
            </h1>
            <p className="text-sm text-gray-700">
              Welcome back, {user.firstName}!
            </p>
          </div>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded"
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
        <div className="bg-gray-800 text-gray-700 p-4 m-4 rounded text-sm">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          
          {/* Sample data preview */}
          <div className="mt-4">
            <h4 className="font-bold">Sample RSVP:</h4>
            <pre>{JSON.stringify(rsvpData?.data?.[0], null, 2)}</pre>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold">Current User:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Scrollable Cards Section */}
      <div className="px-4 py-6 pb-20">
        {formattedReservations.length === 0 ? (
          <div className="text-center text-gray-700 py-12">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <p className="text-xl mb-4">No RSVPs Yet</p>
              <p className="mb-6">You haven't RSVP'd to any events yet. Start exploring events and make your first reservation!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Create Your First RSVP
              </button>
            </div>
            {showDebug && (
              <div className="mt-4 text-xs border-t border-gray-600 pt-4">
                <div>Raw RSVP count: {rsvpData?.data?.length || 0}</div>
                <div>Formatted count: {formattedReservations.length}</div>
                <div>User ID: {userId}</div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* RSVP Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Total RSVPs</h3>
                <p className="text-2xl font-bold text-white">{formattedReservations.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Pending</h3>
                <p className="text-2xl font-bold text-yellow-400">
                  {formattedReservations.filter(r => r.RSVPStatus === 'Pending').length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Total Spent</h3>
                <p className="text-2xl font-bold text-green-400">
                  KSh {formattedReservations.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* RSVP Cards */}
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
          </>
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
            <CreateRSVPForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRSVPSection;