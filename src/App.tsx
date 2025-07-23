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
import RSVPPage from './pages/RSVPPage'
import AdminDashboard from './pages/Dashboard/adminDashboard/Dashboard'
import UserDashboard from './pages/Dashboard/userDashboard/Dashboard'
import HostDashboard from './pages/Dashboard/hostDashboard/Dashboard'


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
      element: <RSVPPage />
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
          element: <h1>Users</h1>,
        },
        {
          path: 'events',
          element: <h1>Events</h1>,
        },
        {
          path: 'venues',
          element: <h1>Venues</h1>,
        },
        {
          path: 'rsvps',
          element: <h1>RSVPs</h1>,
        },
        {
          path: 'payments',
          element: <h1>Payments</h1>,
        },
        {
          path: 'support-tickets',
          element: <h1>Support Tickets</h1>,
        },
        {
          path: 'analytics',
          element: <h1>Analytics</h1>,
        },
        {
          path: 'profile',
          element: <h1>Profile</h1>,
        },
      ],
    },
    {
      path: '/host/dashboard',
      element: <HostDashboard />,
      children: [
        { path: 'my-events', element: <h1>My Events</h1> },
        { path: 'create-event', element: <h1>Create Event</h1> },
        { path: 'rsvps', element: <h1>RSVPs</h1> },
        { path: 'payments', element: <h1>Payments</h1> },
        { path: 'profile', element: <h1>Profile</h1> },
      ],
    },
    {
      path: '/user/dashboard',
      element: <UserDashboard />,
      children: [
        { path: 'my-tickets', element: <h1>My Tickets</h1> },
        { path: 'my-rsvps', element: <h1>My RSVPs</h1> },
        { path: 'event-history', element: <h1>Event History</h1> },
        { path: 'support', element: <h1>Support</h1> },
        { path: 'profile', element: <h1>Profile</h1> },
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
