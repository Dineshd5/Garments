import React, { useState } from 'react';
import Icon from '../AppIcon';

const UserContextPanel = ({ user, onLogout, onSettingsClick, onProfileClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultUser = {
    name: 'John Smith',
    role: 'Production Manager',
    department: 'Manufacturing',
    avatar: null,
    permissions: ['view_dashboard', 'manage_orders', 'view_production']
  };

  const currentUser = user || defaultUser;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleSettings = () => {
    setIsOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const handleProfile = () => {
    setIsOpen(false);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role) => {
    const roleColors = {
      'Production Manager': 'bg-primary-100 text-primary-700',
      'Factory Supervisor': 'bg-accent-100 text-accent-700',
      'Quality Inspector': 'bg-success-100 text-success-700',
      'Inventory Manager': 'bg-secondary-100 text-secondary-700',
      'Sales Representative': 'bg-warning-100 text-warning-700'
    };
    return roleColors[role] || 'bg-secondary-100 text-secondary-700';
  };

  return (
    <div className="relative">
      {/* User Trigger Button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-3 p-3 w-full text-left hover:bg-secondary-50 transition-colors duration-150 rounded-lg"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-primary-700">
              {getInitials(currentUser.name)}
            </span>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {currentUser.name}
          </p>
          <p className="text-xs text-text-secondary truncate">
            {currentUser.role}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-secondary-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-1100 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-lg shadow-elevation-2 border border-border z-1200">
            {/* User Details Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-base font-semibold text-primary-700">
                      {getInitials(currentUser.name)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">
                    {currentUser.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(currentUser.role)}`}>
                      {currentUser.role}
                    </span>
                  </div>
                  {currentUser.department && (
                    <p className="text-xs text-text-secondary mt-1">
                      {currentUser.department} Department
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button 
                onClick={handleProfile}
                className="w-full px-4 py-3 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
              >
                <Icon name="User" size={16} />
                <div>
                  <span className="block font-medium">Profile Settings</span>
                  <span className="block text-xs text-text-secondary">Manage your account</span>
                </div>
              </button>

              <button 
                onClick={handleSettings}
                className="w-full px-4 py-3 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-150 flex items-center space-x-3"
              >
                <Icon name="Settings" size={16} />
                <div>
                  <span className="block font-medium">Preferences</span>
                  <span className="block text-xs text-text-secondary">Customize your experience</span>
                </div>
              </button>

              <button className="w-full px-4 py-3 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-150 flex items-center space-x-3">
                <Icon name="Shield" size={16} />
                <div>
                  <span className="block font-medium">Security</span>
                  <span className="block text-xs text-text-secondary">Password & authentication</span>
                </div>
              </button>

              <button className="w-full px-4 py-3 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-150 flex items-center space-x-3">
                <Icon name="HelpCircle" size={16} />
                <div>
                  <span className="block font-medium">Help & Support</span>
                  <span className="block text-xs text-text-secondary">Get assistance</span>
                </div>
              </button>
            </div>

            {/* Logout Section */}
            <div className="border-t border-border py-2">
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm text-error hover:bg-error-50 transition-colors duration-150 flex items-center space-x-3"
              >
                <Icon name="LogOut" size={16} />
                <div>
                  <span className="block font-medium">Sign Out</span>
                  <span className="block text-xs text-error-600">End your session</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserContextPanel;
