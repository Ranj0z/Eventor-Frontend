import React, { useState } from 'react';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { useGetTicketsQuery, useUpdateTicketStatusMutation, type TicketStatus, type TTicket } from '../../reducers/Tickets/ticketsAPI';
import TicketCardTemplate from './TicketCardTemplate';

const TicketsSection: React.FC = () => {
  // API hooks
  const { data: ticketsData, isLoading, error, refetch } = useGetTicketsQuery();
  const [updateTicketStatus] = useUpdateTicketStatusMutation();

  // Extract tickets from API response
  const tickets: TTicket[] = ticketsData?.Tickets || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.TicketID.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || ticket.ticketStatus === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'status':
          return a.ticketStatus.localeCompare(b.ticketStatus);
        default:
          return 0;
      }
    });

  const handleStatusChange = async (ticketId: number, newStatus: TicketStatus) => {
    try {
      await updateTicketStatus({ id: ticketId, status: newStatus }).unwrap();
      // Optionally show success message
      console.log(`Successfully updated ticket ${ticketId} status to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update ticket status:', error);
      // Optionally show error message to user
    }
  };

  const handleViewDetails = (ticketId: number) => {
    // Navigate to ticket details page or open modal
    console.log(`Viewing details for ticket ${ticketId}`);
  };

  const handleRefresh = () => {
    refetch();
  };

  const getStatusCount = (status: TicketStatus) => {
    return tickets.filter(ticket => ticket.ticketStatus === status).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 px-4 py-4">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">Failed to load tickets</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-gray-600">Manage and track customer support requests</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-gray-900">{tickets.length}</div>
          <div className="text-sm text-gray-600">Total Tickets</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600">{getStatusCount('Pending')}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{getStatusCount('In Progress')}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">{getStatusCount('Resolved')}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tickets by ID, subject, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'All')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'status')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your search or filter criteria.'
              : 'There are no support tickets at the moment.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCardTemplate
              key={ticket.TicketID}
              ticket={ticket}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-600">
        Showing {filteredTickets.length} of {tickets.length} tickets
      </div>
    </div>
  );
};

export default TicketsSection;