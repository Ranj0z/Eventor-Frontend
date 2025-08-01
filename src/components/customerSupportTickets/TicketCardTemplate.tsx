import React from "react";
import { Calendar, User, MessageSquare, Clock } from "lucide-react";

export type TicketStatus = "Pending" | "In Progress" | "Closed";

export type TTicket = {
  TicketID: number;
  UserID: number;
  subject: string;
  description: string;
  ticketStatus: TicketStatus;
  created_at: string;
  updated_at?: string;
};

interface TicketCardTemplateProps { 
  firstName: string ;
  ticket: TTicket;
  onStatusChange?: (ticketId: number, newStatus: TicketStatus) => void;
  onViewDetails?: (ticketId: number) => void;
}

const TicketCardTemplate: React.FC<TicketCardTemplateProps> = ({
  firstName,
  ticket,
  onStatusChange,
  onViewDetails,
}) => {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "In Progress":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Closed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 truncate overflow-hidden whitespace-nowrap hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full max-h-[260px]">
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate overflow-hidden whitespace-nowrap">
              #{ticket.TicketID} - {ticket.subject}
            </h3>

            {/* Side-by-side meta info */}
            <div className="flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1 max-w-[140px] overflow-hidden">
                <User className="w-4 h-4 shrink-0" />
                <span className="truncate whitespace-nowrap">
                  User: {firstName}
                </span>
              </div>
              <div className="flex items-center gap-1 max-w-[140px] overflow-hidden">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate whitespace-nowrap">
                  {formatDate(ticket.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(
              ticket.ticketStatus
            )}`}
          >
            {ticket.ticketStatus}
          </span>
        </div>

        {/* Description with 2-line clamp */}
        <div className="mb-4 flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
            {ticket.description}
          </p>
        </div>

        {/* Last Updated */}
        {ticket.updated_at && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2 truncate">
            <Clock className="w-3 h-3" />
            <span>Updated: {formatDate(ticket.updated_at)}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
        {onStatusChange && (
          <select
            value={ticket.ticketStatus}
            onChange={(e) =>
              onStatusChange(ticket.TicketID, e.target.value as TicketStatus)
            }
            className="px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        )}

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(ticket.TicketID)}
            className="px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200 whitespace-nowrap"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCardTemplate;
