import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from 'contexts/AuthContext';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const notifications = [
    { id: 1, title: 'Production Line 2 Alert', message: 'Temperature threshold exceeded', time: '2 min ago', type: 'warning' },
    { id: 2, title: 'Order #12345 Completed', message: 'Ready for quality inspection', time: '5 min ago', type: 'success' },
    { id: 3, title: 'Inventory Low Alert', message: 'Steel components below minimum', time: '10 min ago', type: 'error' },
  ];

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationOpen(false);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-quick"
            aria-label="Toggle navigation menu"
          >
            <Icon name="Menu" size={20} />
          </button>

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Factory" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary hidden sm:block">
              ManufactureFlow
            </span>
          </Link>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-quick"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationToggle}
              className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-quick relative"
              aria-label="View notifications"
            >
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-elevation-2 border border-border z-1200">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border-light hover:bg-secondary-50 transition-quick">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success' :
                          notification.type === 'warning'? 'bg-warning' : 'bg-error'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{notification.title}</p>
                          <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                          <p className="text-xs text-secondary-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-quick">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-quick"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="#1E3A8A" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-text-primary">{user?.email || 'User'}</span>
              <Icon name="ChevronDown" size={16} className={`transition-transform duration-150 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-elevation-2 border border-border z-1200">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">{user?.email || 'User'}</p>
                  <p className="text-xs text-text-secondary">Production Manager</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-quick flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-quick flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-quick flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-quick flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
