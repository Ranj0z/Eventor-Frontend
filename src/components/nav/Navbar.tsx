import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../src/app/store';
import { logout } from '../../reducers/Login/userSlice';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const isLoggedIn = !!token;
  const firstName = user?.first_name;
  const role = user?.role;

  const dashboardPath = role === 'admin'
    ? '/admin/dashboard'
    : role === 'host'
    ? '/host/dashboard'
    : role === 'user'
    ? '/user/dashboard'
    : '/login';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigateTo('/')}
          >
            <img
                  src="https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007173/main-sample.png"
                  alt="Medical professionals at CareConnect"
                  className="w-12 h-12 lg:h-[50px] object-cover object-top rounded-2xl shadow-2xl"
                />
            <div className="text-2xl font-bold">
              <span className="text-Black-600">Eventor</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              onClick={() => navigateTo('/')} 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              Home
            </a>
            <a 
              onClick={() => navigateTo('/about')} 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              About
            </a>
            <a 
              onClick={() => navigateTo('/events')} 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              Events
            </a>
            <a 
              onClick={() => navigateTo('/venues')} 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              Venues
            </a>
            <a 
              onClick={() => navigateTo('/rsvp')} 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              RSVP
            </a>
            <a 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              Services
            </a>

            {isLoggedIn && (
              <a 
                onClick={() => navigateTo(dashboardPath)} 
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors flex items-center gap-1"
              >
                <User className="h-4 w-4" />
                Dashboard
              </a>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Welcome, {firstName || 'User'}!
                </span>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a 
                  onClick={() => navigateTo('/login')} 
                  className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                >
                  Login
                </a>
                <a 
                  onClick={() => navigateTo('/register')} 
                  className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                >
                  Register
                </a>
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoggedIn && (
              <span className="text-gray-700 font-medium text-sm">
                Hi, {firstName || 'User'}!
              </span>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a 
                onClick={() => navigateTo('/')} 
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
              >
                Home
              </a>
              <a 
                onClick={() => navigateTo('/about')} 
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
              >
                Services
              </a>

              {isLoggedIn && (
                <a 
                  onClick={() => navigateTo(dashboardPath)} 
                  className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </a>
              )}

              {isLoggedIn ? (
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-red-600 font-medium text-left transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a 
                    onClick={() => navigateTo('/login')} 
                    className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                  >
                    Login
                  </a>
                  <a 
                    onClick={() => navigateTo('/register')} 
                    className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;