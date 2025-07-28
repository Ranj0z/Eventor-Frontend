// src/components/rsvp/RSVPCardTemplate.tsx

export type FormattedReservation = RSVPCardProps["reservation"];

type RSVPCardProps = {
  reservation: {
    ReservationID: number;
    ReferenceID: number;
    userName: string;
    eventTitle: string;
    ReservationDate: string;
    RSVPStatus?: string; // <-- Make optional
    totalAmount: number;
    EventID: number;
  };
};

const getBgColorByEvent = (eventID: number): string => {
  const colorMap: { [key: number]: string } = {
    1: "bg-red-100",
    2: "bg-blue-100",
    3: "bg-green-100",
    4: "bg-yellow-100",
    5: "bg-purple-100",
    6: "bg-pink-100",
    7: "bg-orange-100",
    8: "bg-lime-100",
    9: "bg-emerald-100",
    10: "bg-indigo-100",
  };

  return colorMap[eventID] || "bg-gray-100";
};

const getStatusColor = (status?: string): string => {
  if (!status) return "text-gray-700";

  switch (status.toLowerCase()) {
    case "confirmed":
      return "text-green-600 font-semibold";
    case "pending":
      return "text-yellow-600 font-semibold";
    case "cancelled":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-700";
  }
};

const RSVPCardTemplate: React.FC<RSVPCardProps> = ({ reservation }) => {
  const bgColor = getBgColorByEvent(reservation.EventID);
  const statusColor = getStatusColor(reservation.RSVPStatus);

  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-4 transition hover:shadow-lg`}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-gray-800">
        <p className="font-medium">Event:</p>
        <p className="font-bold line-clamp-2 break-words">{reservation.eventTitle}</p>

        <p className="font-medium">User:</p>
        <p>{reservation.userName}</p>

        <p className="font-medium">RSVP ID:</p>
        <p>{reservation.ReferenceID}</p>

        <p className="font-medium">Date:</p>
        <p>{new Date(reservation.ReservationDate).toLocaleDateString()}</p>

        <p className="font-medium">Amount:</p>
        <p>KES {reservation.totalAmount || 0}</p>

        <p className="font-medium">Status:</p>
        <p className={statusColor}>{reservation.RSVPStatus ?? "Unknown"}</p>
      </div>
    </div>
  );
};

export default RSVPCardTemplate;
