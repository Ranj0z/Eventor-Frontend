import React from 'react';
import { Calendar, User, MessageSquare, Clock } from 'lucide-react';

export type TicketStatus = "Pending" | "In Progress" | "Resolved" | "Closed";

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
  ticket: TTicket;
  onStatusChange?: (ticketId: number, newStatus: TicketStatus) => void;
  onViewDetails?: (ticketId: number) => void;
}

const TicketCardTemplate: React.FC<TicketCardTemplateProps> = ({
  ticket,
  onStatusChange,
  onViewDetails
}) => {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            #{ticket.TicketID} - {ticket.subject}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>User ID: {ticket.UserID}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(ticket.created_at)}</span>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.ticketStatus)}`}>
          {ticket.ticketStatus}
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm leading-relaxed">
            {truncateText(ticket.description)}
          </p>
        </div>
      </div>

      {/* Last Updated */}
      {ticket.updated_at && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <Clock className="w-3 h-3" />
          <span>Updated: {formatDate(ticket.updated_at)}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {onStatusChange && (
            <select
              value={ticket.ticketStatus}
              onChange={(e) => onStatusChange(ticket.TicketID, e.target.value as TicketStatus)}
              className="px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          )}
        </div>
        
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(ticket.TicketID)}
            className="px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCardTemplate;