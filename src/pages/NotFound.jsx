import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} className="text-primary-600" />
          </div>
          <h1 className="text-6xl font-bold text-primary-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg font-medium hover:bg-secondary-200 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Need Help?</h3>
          <p className="text-sm text-text-secondary mb-4">
            If you believe this is an error, please contact our support team.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-primary hover:text-primary-700 text-sm font-medium"
          >
            <Icon name="HelpCircle" size={16} className="mr-1" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
