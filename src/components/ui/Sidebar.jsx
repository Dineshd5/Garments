import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Operational overview and metrics'
    },
    {
      label: 'Orders',
      path: '/order-management',
      icon: 'ShoppingCart',
      description: 'Order lifecycle management'
    },
    {
      label: 'Production',
      path: '/production-workflow',
      icon: 'Factory',
      description: 'Manufacturing workflow monitoring'
    },
    {
      label: 'Customers',
      path: '/customer-management',
      icon: 'Users',
      description: 'Customer relationship management'
    },
    {
      label: 'Products',
      path: '/product-catalog',
      icon: 'Package',
      description: 'Product catalog and specifications'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    // Close mobile menu when link is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-1100 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-surface border-r border-border z-1200
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
      `}>
        <nav className="h-full flex flex-col">
          {/* Navigation Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
              Navigation
            </h2>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navigationItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`
                        nav-link group relative
                        ${isActive ? 'nav-link-active' : 'nav-link-inactive'}
                      `}
                      title={item.description}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={`
                          mr-3 transition-colors duration-150
                          ${isActive ? 'text-primary-600' : 'text-secondary-500 group-hover:text-secondary-700'}
                        `}
                      />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-l-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="bg-primary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Zap" size={16} className="text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Quick Actions</span>
              </div>
              <p className="text-xs text-primary-600 mb-3">
                Access frequently used operations
              </p>
              <button className="w-full bg-primary text-white text-xs py-2 px-3 rounded-md hover:bg-primary-700 transition-colors duration-150 font-medium">
                Create New Order
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
