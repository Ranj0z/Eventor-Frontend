import React, { useState } from "react";
import RSVPCardTemplate from "./RSVPCardTemplate";
import CreateRSVPForm from "./CreateRSVPForm";
import { reservations } from "./rsvp.data";
import { users } from "../user/user.data";
import { EventsData } from "../events/Events.data";

const RSVPsection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const getUserFirstName = (userId: number) => {
    const user = users.find((u) => u.UserID === userId);
    return user ? user.firstName : "Unknown User";
  };

  const getEventTitle = (eventId: number) => {
    const event = EventsData.find((e) => e.EventID === eventId);
    return event ? event.title : "Unknown Event";
  };

  const formattedReservations = reservations.map((reservation) => ({
    ReservationID: reservation.RSVPID,
    ReferenceID: reservation.RSVPID,
    userName: getUserFirstName(reservation.UserID),
    eventTitle: getEventTitle(reservation.EventID),
    ReservationDate: reservation.RSVPDate,
    RSVPStatus: reservation.RSVPStatus,
    totalAmount: reservation.totalAmount,
    EventID: reservation.EventID,
  }));

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white text-center w-full">
          RSVP Summary
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-md transition-all absolute right-6"
        >
          Create New RSVP
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {formattedReservations.map((reservation) => (
          <RSVPCardTemplate key={reservation.ReservationID} reservation={reservation} />
        ))}
      </div>

      {showForm && (
        <>
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
        </>
      )}
    </div>
  );
};

export default RSVPsection;
