import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbMap = {
    'dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    'order-management': { label: 'Order Management', icon: 'ShoppingCart' },
    'production-workflow': { label: 'Production Workflow', icon: 'Factory' },
    'customer-management': { label: 'Customer Management', icon: 'Users' },
    'product-catalog': { label: 'Product Catalog', icon: 'Package' },
    'login': { label: 'Login', icon: 'LogIn' }
  };

  // Don't show breadcrumb on login page
  if (location.pathname === '/login') {
    return null;
  }

  // For root path, show dashboard
  if (pathnames.length === 0) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
        <Icon name="Home" size={16} className="text-secondary-400" />
        <span className="text-text-primary font-medium">Dashboard</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      {/* Home Link */}
      <Link 
        to="/dashboard" 
        className="flex items-center hover:text-primary-600 transition-colors duration-150"
      >
        <Icon name="Home" size={16} className="text-secondary-400" />
      </Link>

      {/* Breadcrumb Items */}
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbInfo = breadcrumbMap[pathname];

        if (!breadcrumbInfo) {
          return null;
        }

        return (
          <React.Fragment key={pathname}>
            {/* Separator */}
            <Icon name="ChevronRight" size={14} className="text-secondary-300" />
            
            {/* Breadcrumb Item */}
            {isLast ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                <Icon name={breadcrumbInfo.icon} size={16} className="text-primary-600" />
                <span>{breadcrumbInfo.label}</span>
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="flex items-center space-x-1 hover:text-primary-600 transition-colors duration-150"
              >
                <Icon name={breadcrumbInfo.icon} size={16} className="text-secondary-400" />
                <span>{breadcrumbInfo.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
