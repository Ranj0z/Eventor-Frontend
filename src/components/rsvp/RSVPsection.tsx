import React from "react";
import RSVPCardTemplate from "./RSVPCardTemplate";
import { reservations } from "./rsvp.data";
import { users } from "../user/user.data";
import { EventsData } from "../events/Events.data";

const RSVPsection: React.FC = () => {
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center">RSVP Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {formattedReservations.map((reservation) => (
          <RSVPCardTemplate key={reservation.ReservationID} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default RSVPsection;
