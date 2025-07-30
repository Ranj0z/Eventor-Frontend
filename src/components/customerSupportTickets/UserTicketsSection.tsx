import React, { useState } from 'react';
import { Search, Filter, RefreshCw, AlertCircle, Plus, Ticket } from 'lucide-react';
import { useGetTicketsByUserIdQuery, useCreateTicketMutation, type TicketStatus, type TTicket } from '../../reducers/Tickets/ticketsAPI';
import { useSelector } from 'react-redux';
import TicketCardTemplate from './TicketCardTemplate';
import type { RootState } from '../../app/store';

const UserTicketsSection: React.FC = () => {
  // Get logged-in user from Redux store
    const { user } = useSelector((state: RootState) => state.user);
    const userId = user?.UserID;
  
  // API hooks - only fetch tickets for current user
  const { data: ticketsData, isLoading, error, refetch } = useGetTicketsByUserIdQuery(userId!, {
    skip: !userId, // Skip query if no user ID
  });
  const [createTicket] = useCreateTicketMutation();

  // Extract tickets from API response
  const tickets: TTicket[] = ticketsData?.Tickets || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
  });

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

  const handleCreateTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) return;

    try {
      await createTicket({
        UserID: userId,
        subject: newTicket.subject,
        description: newTicket.description,
        ticketStatus: 'Pending',
        created_at: new Date().toISOString().split('T')[0],
      }).unwrap();
      
      setNewTicket({ subject: '', description: '' });
      setShowCreateForm(false);
      console.log('Ticket created successfully');
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  const handleViewDetails = (ticketId: number) => {
    // Navigate to ticket details or open modal
    console.log(`Viewing details for ticket ${ticketId}`);
  };

  const handleRefresh = () => {
    refetch();
  };

  const getStatusCount = (status: TicketStatus) => {
    return tickets.filter(ticket => ticket.ticketStatus === status).length;
  };

  // Don't render if no user
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">Please log in to view your tickets</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 px-4 py-4">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">Failed to load your tickets</p>
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
    <div className="h-[75vh] overflow-y-auto space-y-6 px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Ticket className="w-6 h-6" />
            My Support Tickets
          </h2>
          <p className="text-gray-600">Track and manage your support requests</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="bg-white p-6  rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Support Ticket</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of your issue"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide detailed information about your issue"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="text-2xl font-bold text-green-600">{getStatusCount('Closed')}</div>
          <div className="text-sm text-gray-600">Closed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your tickets by ID, subject, or description..."
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
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {tickets.length === 0 ? 'No support tickets yet' : 'No tickets found'}
          </h3>
          <p className="text-gray-600 mb-4">
            {tickets.length === 0 
              ? 'You haven\'t created any support tickets yet. Click "New Ticket" to get started.'
              : searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'All your tickets are currently filtered out.'
            }
          </p>
          {tickets.length === 0 && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Your First Ticket
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCardTemplate
              key={ticket.TicketID}
              ticket={ticket}
              onViewDetails={handleViewDetails}
              // Don't allow users to change status - only admins can do that
              onStatusChange={undefined}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      {tickets.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      )}
    </div>
  );
};

export default UserTicketsSection;