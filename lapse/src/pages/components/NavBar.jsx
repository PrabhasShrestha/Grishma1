import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Target, Menu, X, User } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check token on mount and update login/admin state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.role === 'admin');
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Lapse
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/features" 
              className={({ isActive }) => 
                `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
            >
              Features
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => 
                `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
            >
              How it Works
            </NavLink>
            <NavLink 
              to="/aboutus" 
              className={({ isActive }) => 
                `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contactus" 
              className={({ isActive }) => 
                `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
            >
              Contact Us
            </NavLink>
            {isLoggedIn && (
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => 
                  `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
                }
              >
                Tasks
              </NavLink>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-slate-600 hover:text-indigo-600 transition-colors ${isActive ? 'font-bold text-indigo-600' : ''}`
                }
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <NavLink 
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </NavLink>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-4">
            <NavLink 
              to="/features" 
              className={({ isActive }) => 
                `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => 
                `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </NavLink>
            <NavLink 
              to="/aboutus" 
              className={({ isActive }) => 
                `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contactus" 
              className={({ isActive }) => 
                `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>
            {isLoggedIn && (
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => 
                  `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Tasks
              </NavLink>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `block text-slate-600 hover:text-indigo-600 ${isActive ? 'font-bold text-indigo-600' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <NavLink 
                to="/register"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;