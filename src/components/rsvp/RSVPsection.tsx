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
    <div className="h-full bg-gray-900 w-full overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-900 z-10 px-4 py-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-semibold text-white">RSVP Summary</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          Create New RSVP
        </button>
      </div>

      {/* Scrollable Cards Section */}
      <div className="px-4 py-6 pb-20">
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

export default RSVPsection;
