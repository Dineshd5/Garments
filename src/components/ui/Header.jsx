import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from 'contexts/AuthContext';
import UserContextPanel from './UserContextPanel';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, updateProfile, userProfile } = useAuth();
  
  const notifications = [
    { id: 1, title: 'Production Line 2 Alert', message: 'Temperature threshold exceeded', time: '2 min ago', type: 'warning' },
    { id: 2, title: 'Order #12345 Completed', message: 'Ready for quality inspection', time: '5 min ago', type: 'success' },
    { id: 3, title: 'Inventory Low Alert', message: 'Steel components below minimum', time: '10 min ago', type: 'error' },
  ];

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
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
          <UserContextPanel 
            user={{
              name: userProfile?.display_name || user?.email?.split('@')[0] || 'User',
              role: userProfile?.role || 'Production Manager',
              avatar: userProfile?.avatar_url,
              email: user?.email
            }}
            onLogout={handleLogout}
            onProfileClick={() => setIsProfileModalOpen(true)}
            onSettingsClick={() => alert('Preferences coming soon!')}
          />
        </div>
      </div>
      
      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-1300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-lg shadow-elevation-3 border border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Profile Settings</h2>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="text-secondary-400 hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              await updateProfile({
                display_name: formData.get('displayName'),
                role: formData.get('role')
              });
              setIsProfileModalOpen(false);
            }} className="p-6 space-y-4">
              
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-4xl font-bold text-primary-700">
                   {(userProfile?.display_name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Display Name</label>
                <input 
                  name="displayName"
                  defaultValue={userProfile?.display_name || ''}
                  placeholder="Enter your full name"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Role</label>
                <select 
                  name="role"
                  defaultValue={userProfile?.role || 'Production Manager'}
                  className="input-field w-full"
                >
                  <option>Production Manager</option>
                  <option>Factory Supervisor</option>
                  <option>Quality Inspector</option>
                  <option>Inventory Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input 
                  value={user?.email || ''}
                  disabled
                  className="input-field w-full bg-secondary-50 text-secondary-500 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
