type RSVPCardProps = {
  reservation: {
    ReservationID: number;
    ReferenceID: number;
    userName: string;
    eventTitle: string;
    ReservationDate: string;
    RSVPStatus: string;
    totalAmount: string;
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

  return colorMap[eventID] || "bg-gray-100"; // fallback color
};

const getStatusColor = (status: string): string => {
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
    <div className={`${bgColor} rounded-xl shadow-md p-4 h-full`}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {/* Event Row with vertical alignment */}
        <div className="font-medium flex items-center">Event:</div>
        <div className="font-bold text-gray-800">{reservation.eventTitle}</div>

        <p className="font-medium">User:</p>
        <p>{reservation.userName}</p>

        <p className="font-medium">RSVP ID:</p>
        <p>{reservation.ReferenceID}</p>

        <p className="font-medium">Date:</p>
        <p>{new Date(reservation.ReservationDate).toLocaleDateString()}</p>

        <p className="font-medium">Amount:</p>
        <p>KES {reservation.totalAmount}</p>

        <p className="font-medium">Status:</p>
        <p className={statusColor}>{reservation.RSVPStatus}</p>
      </div>
    </div>
  );
};

export default RSVPCardTemplate;
