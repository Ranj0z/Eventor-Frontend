import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'

import LandingPage from './pages/LandingPage'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AboutPage from './pages/AboutPage'
import Error from './components/error/Error'
import VerifyUser from './pages/auth/VerifyUser'
import { Toaster } from 'sonner'
import { type RootState } from './app/store'
import { useSelector } from 'react-redux'
import FeaturesPage from './pages/FeaturesPages'
import EventsPage from './pages/Events'
import VenuesPage from './pages/VenuesPage'
import AdminDashboard from './pages/Dashboard/adminDashboard/Dashboard'
import UserDashboard from './pages/Dashboard/userDashboard/Dashboard'
import HostDashboard from './pages/Dashboard/hostDashboard/Dashboard'
import EventsSection from './components/events/EventsSection'
import VenuesSection from './components/venues/VenuesSection'
import RSVPsection from './components/rsvp/RSVPsection'
import Profile from './components/user/userProfile'
import UserSection from './components/user/UserSection'
import AnalyticsSection from './components/analytics/AnalyticsSection'
import UserRSVPSection from './components/rsvp/UserRSVPsection'
import UserEventsSection from './components/events/UserEventsSection'
import TicketsSection from './components/customerSupportTickets/TicketsSection'
import UserTicketsSection from './components/customerSupportTickets/UserTicketsSection'


function App() {
  // const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  // const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/verify',
      element: <VerifyUser />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/backstage/features',
      element: <FeaturesPage />
    },
    {
      path: '/events',
      element: <EventsPage />
    },
    {
      path: '/rsvp',
      element: <RSVPsection />
    },
    {
      path: '/venues',
      element: <VenuesPage />
    },

    {
      path: '/admin/dashboard',
      element: <AdminDashboard />,
      children: [
        {
          path: 'users',
          element: <UserSection />,
        },
        {
          path: 'events',
          element: <EventsSection />,
        },
        {
          path: 'venues',
          element: <VenuesSection />,
        },
        {
          path: 'rsvps',
          element: <RSVPsection />,
        },
        {
          path: 'payments',
          element: <h1>Payments</h1>,
        },
        {
          path: 'support-tickets',
          element: <TicketsSection />,
        },
        {
          path: 'analytics',
          element: <AnalyticsSection />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/host/dashboard',
      element: <HostDashboard />,
      children: [
        { path: 'my-events', element: <h1>My Events</h1> },
        { path: 'event-history', element: <UserEventsSection /> },
        { path: 'rsvps', element: <h1>RSVPs</h1> },
        { path: 'payments', element: <h1>Payments</h1> },
        { path: 'profile', element: < Profile /> },
      ],
    },
    {
      path: '/user/dashboard',
      element: <UserDashboard />,
      children: [
        { path: 'events', element: <EventsSection /> },
        { path: 'my-rsvps', element: <UserRSVPSection /> },
        { path: 'event-history', element: <UserEventsSection /> },
        { path: 'support', element: <UserTicketsSection /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',
        }

      }} />
    </>
  )
}

export default App
