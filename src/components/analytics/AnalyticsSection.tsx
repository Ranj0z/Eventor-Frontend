import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, MapPin, Ticket, AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';

// TypeScript interfaces based on your schema
interface User {
  UserID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: 'admin' | 'host' | 'user';
  isVerified: boolean;
  verificationCode?: string | null;
  image_url?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface Event {
  EventID: number;
  title: string;
  description: string;
  VenueID: number;
  category: 'Tech' | 'Data Science' | 'Web Dev';
  date: string;
  time: string;
  ticketsPrice: string;
  totalTickets: number;
  soldTickets: number;
  image_url?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

interface Payment {
  PaymentID: number;
  RSVPID: number;
  EventID: number;
  amount: string;
  balance: string;
  paymentStatus: 'Pending' | 'In Progress' | 'Completed';
  paymentDate: string;
  paymentMethod: string;
  TransactionID: string;
  created_at: string;
  updated_at?: string | null;
}

interface RSVP {
  RSVPID: number;
  UserID: number;
  EventID: number;
  RSVPDate: string;
  RSVPStatus: 'Pending' | 'Booked' | 'Cancelled';
  totalAmount: string;
}

interface Venue {
  VenueID: number;
  venueName: string;
  address: string;
  capacity: number;
  image_url?: string | null;
  createdAt: string;
}

interface SupportTicket {
  TicketID: number;
  UserID: number;
  subject: string;
  description: string;
  ticketStatus: 'Pending' | 'In Progress' | 'Closed';
  created_at: string;
  updated_at?: string | null;
}

interface ChartData {
  name: string;
  value: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  events: number;
}

interface VenueUtilizationData {
  name: string;
  capacity: number;
  utilization: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'positive' | 'negative';
}

// Sample data with proper TypeScript typing
const sampleUsers: User[] = [
  { UserID: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phoneNumber: "+254712345678", address: "Nairobi", role: "user", isVerified: true, createdAt: "2025-01-15" },
  { UserID: 2, firstName: "Brooke", lastName: "Delacruz", email: "brooke.delacruz@example.com", phoneNumber: "+1-612-149-2512", address: "979 Christopher Field, New Danielleside, AZ 84167", role: "user", isVerified: false, createdAt: "2025-06-10" },
  { UserID: 3, firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phoneNumber: "+254723456789", address: "Mombasa", role: "host", isVerified: true, createdAt: "2025-03-22" },
  { UserID: 4, firstName: "Bob", lastName: "Smith", email: "bob@example.com", phoneNumber: "+254734567890", address: "Kisumu", role: "admin", isVerified: true, createdAt: "2025-02-08" }
];

const sampleEvents: Event[] = [
  { EventID: 1, title: "AI & ML Summit", description: "AI Conference", VenueID: 1, category: "Data Science", date: "2025-08-15", time: "9:00 AM", ticketsPrice: "2500.00", totalTickets: 150, soldTickets: 120, createdAt: "2025-07-01" },
  { EventID: 2, title: "React Developer Conference", description: "React Conference", VenueID: 2, category: "Web Dev", date: "2025-09-10", time: "10:00 AM", ticketsPrice: "2000.00", totalTickets: 300, soldTickets: 280, createdAt: "2025-07-05" },
  { EventID: 3, title: "Cybersecurity Workshop", description: "Security Workshop", VenueID: 3, category: "Tech", date: "2025-08-28", time: "2:00 PM", ticketsPrice: "1500.00", totalTickets: 100, soldTickets: 85, createdAt: "2025-07-03" },
  { EventID: 4, title: "Web3 & Blockchain Dev Conference", description: "Dive into decentralized tech with thought leaders from across Africa.", VenueID: 4, category: "Tech", date: "2025-08-25", time: "2:00 PM", ticketsPrice: "3000.00", totalTickets: 200, soldTickets: 130, createdAt: "2025-07-07" }
];

const samplePayments: Payment[] = [
  { PaymentID: 1, RSVPID: 1, EventID: 1, amount: "2000.00", balance: "0.00", paymentStatus: "Completed", paymentMethod: "M-Pesa", TransactionID: "MP001001001", paymentDate: "2025-07-01", created_at: "2025-07-07" },
  { PaymentID: 2, RSVPID: 2, EventID: 2, amount: "2500.00", balance: "0.00", paymentStatus: "Completed", paymentMethod: "Card", TransactionID: "CD001001002", paymentDate: "2025-07-02", created_at: "2025-07-07" },
  { PaymentID: 3, RSVPID: 3, EventID: 3, amount: "1500.00", balance: "500.00", paymentStatus: "Pending", paymentMethod: "M-Pesa", TransactionID: "MP001001003", paymentDate: "2025-07-03", created_at: "2025-07-07" },
  { PaymentID: 4, RSVPID: 4, EventID: 4, amount: "3000.00", balance: "1000.00", paymentStatus: "In Progress", paymentMethod: "Card", TransactionID: "CD001001004", paymentDate: "2025-07-04", created_at: "2025-07-07" }
];

const sampleRSVPs: RSVP[] = [
  { RSVPID: 1, UserID: 1, EventID: 1, RSVPStatus: "Booked", totalAmount: "2000.00", RSVPDate: "2025-07-01" },
  { RSVPID: 2, UserID: 2, EventID: 2, RSVPStatus: "Pending", totalAmount: "3500.00", RSVPDate: "2025-07-02" },
  { RSVPID: 3, UserID: 3, EventID: 3, RSVPStatus: "Booked", totalAmount: "2500.00", RSVPDate: "2025-07-03" },
  { RSVPID: 4, UserID: 4, EventID: 4, RSVPStatus: "Cancelled", totalAmount: "1500.00", RSVPDate: "2025-07-04" }
];

const sampleVenues: Venue[] = [
  { VenueID: 1, venueName: "RC Auditorium", address: "6727 Stout Village, Aguilarview, NV 50638", capacity: 227, createdAt: "2022-03-21" },
  { VenueID: 2, venueName: "Atrium", address: "7620 Matthew Crescent Suite 126, Wrightfurt, IL 92206", capacity: 964, createdAt: "2022-05-06" },
  { VenueID: 3, venueName: "Tech Hub", address: "123 Innovation Street, Tech City", capacity: 150, createdAt: "2023-01-15" },
  { VenueID: 4, venueName: "Innovation Center", address: "456 Future Avenue, Innovation District", capacity: 300, createdAt: "2023-06-10" }
];

const sampleTickets: SupportTicket[] = [
  { TicketID: 1, UserID: 1, subject: "Issue with ticket download", description: "I purchased a ticket but did not receive the download link. Please assist.", ticketStatus: "Pending", created_at: "2025-07-07" },
  { TicketID: 2, UserID: 2, subject: "Refund request", description: "Need refund for cancelled event", ticketStatus: "In Progress", created_at: "2025-07-06" },
  { TicketID: 3, UserID: 3, subject: "Event rescheduling inquiry", description: "When will the event be rescheduled?", ticketStatus: "Closed", created_at: "2025-07-05" }
];

const COLORS: string[] = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm mt-2 flex items-center ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </p>
        )}
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');

  // Calculate analytics from sample data with proper typing
  const analytics = useMemo(() => {
    const totalUsers: number = sampleUsers.length;
    const verifiedUsers: number = sampleUsers.filter(u => u.isVerified).length;
    const totalEvents: number = sampleEvents.length;
    const totalRevenue: number = samplePayments
      .filter(p => p.paymentStatus === 'Completed')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const totalTicketsSold: number = sampleEvents.reduce((sum, e) => sum + e.soldTickets, 0);
    const avgTicketPrice: number = sampleEvents.reduce((sum, e) => sum + parseFloat(e.ticketsPrice), 0) / sampleEvents.length;

    // Event category distribution
    const categoryData: Record<string, number> = sampleEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pieData: ChartData[] = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

    // Revenue over time (mock data)
    const revenueData: RevenueData[] = [
      { date: 'Jul 1', revenue: 2000, events: 1 },
      { date: 'Jul 2', revenue: 4500, events: 2 },
      { date: 'Jul 3', revenue: 6000, events: 3 },
      { date: 'Jul 4', revenue: 9000, events: 4 },
      { date: 'Jul 5', revenue: 11500, events: 4 },
      { date: 'Jul 6', revenue: 14000, events: 5 },
      { date: 'Jul 7', revenue: 17000, events: 6 }
    ];

    // Payment method distribution
    const paymentMethods: Record<string, number> = samplePayments.reduce((acc, payment) => {
      acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const paymentMethodData: ChartData[] = Object.entries(paymentMethods).map(([name, value]) => ({ name, value }));

    // RSVP status distribution
    const rsvpStatus: Record<string, number> = sampleRSVPs.reduce((acc, rsvp) => {
      acc[rsvp.RSVPStatus] = (acc[rsvp.RSVPStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Support ticket status
    const ticketStatus: Record<string, number> = sampleTickets.reduce((acc, ticket) => {
      acc[ticket.ticketStatus] = (acc[ticket.ticketStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Venue utilization
    const venueData: VenueUtilizationData[] = sampleVenues.map(venue => {
      const venueEvents = sampleEvents.filter(e => e.VenueID === venue.VenueID);
      const utilization = venueEvents.length > 0 ? 
        (venueEvents.reduce((sum, e) => sum + e.soldTickets, 0) / venue.capacity) * 100 : 0;
      
      return {
        name: venue.venueName,
        capacity: venue.capacity,
        utilization: Math.min(utilization, 100)
      };
    });

    return {
      totalUsers,
      verifiedUsers,
      totalEvents,
      totalRevenue,
      totalTicketsSold,
      avgTicketPrice,
      pieData,
      revenueData,
      paymentMethodData,
      rsvpStatus,
      ticketStatus,
      venueData
    };
  }, []);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTimeRange(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Eventor Analytics
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive insights for your event ticketing platform</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <select 
                value={timeRange} 
                onChange={handleTimeRangeChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className='min-h-[600px] h-[70vh] overflow-y-auto'> 
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Users" 
              value={analytics.totalUsers.toLocaleString()} 
              icon={Users}
              change="+12% from last month"
              changeType="positive"
            />
            <StatCard 
              title="Total Events" 
              value={analytics.totalEvents.toLocaleString()} 
              icon={Calendar}
              change="+8% from last month"
              changeType="positive"
            />
            <StatCard 
              title="Total Revenue" 
              value={`KES ${analytics.totalRevenue.toLocaleString()}`} 
              icon={DollarSign}
              change="+15% from last month"
              changeType="positive"
            />
            <StatCard 
              title="Tickets Sold" 
              value={analytics.totalTicketsSold.toLocaleString()} 
              icon={Ticket}
              change="+10% from last month"
              changeType="positive"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                Revenue Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    fill="url(#colorRevenue)" 
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Event Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Event Categories
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent?: number }) =>
                      `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                Payment Methods
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analytics.paymentMethodData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* RSVP Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                RSVP Status
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.rsvpStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'Booked' ? 'bg-green-500' : 
                        status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-700">{status}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-purple-600" />
                Support Tickets
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.ticketStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'Closed' ? 'bg-green-500' : 
                        status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-700">{status}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Venue Utilization */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Venue Utilization
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.venueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Utilization']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="utilization" 
                  fill="#06b6d4" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="text-lg font-semibold mb-2">User Verification Rate</h4>
              <p className="text-3xl font-bold">{((analytics.verifiedUsers / analytics.totalUsers) * 100).toFixed(1)}%</p>
              <p className="text-purple-100 mt-2">{analytics.verifiedUsers} of {analytics.totalUsers} users verified</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="text-lg font-semibold mb-2">Average Ticket Price</h4>
              <p className="text-3xl font-bold">KES {analytics.avgTicketPrice.toFixed(0)}</p>
              <p className="text-blue-100 mt-2">Across all events</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="text-lg font-semibold mb-2">Total Venues</h4>
              <p className="text-3xl font-bold">{analytics.venueData.length}</p>
              <p className="text-green-100 mt-2">Active venues in system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;