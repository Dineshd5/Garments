import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CustomerProfile = ({ customer, onClose, onCreateOrder, onScheduleFollowUp }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success-100 text-success-700', label: 'Active' },
      inactive: { color: 'bg-warning-100 text-warning-700', label: 'Inactive' },
      suspended: { color: 'bg-error-100 text-error-700', label: 'Suspended' },
      delivered: { color: 'bg-success-100 text-success-700', label: 'Delivered' },
      in_production: { color: 'bg-primary-100 text-primary-700', label: 'In Production' },
      shipped: { color: 'bg-accent-100 text-accent-700', label: 'Shipped' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' }
  ];

  return (
    <div className="card p-0 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100 flex-shrink-0">
              {customer.avatar ? (
                <Image
                  src={customer.avatar}
                  alt={customer.contactPerson}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Building2" size={24} className="text-secondary-400" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {customer.companyName}
              </h3>
              <p className="text-sm text-text-secondary">
                {customer.contactPerson}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={() => onCreateOrder(customer)}
            className="btn-primary text-sm flex items-center space-x-1"
          >
            <Icon name="Plus" size={14} />
            <span>New Order</span>
          </button>
          <button
            onClick={() => onScheduleFollowUp(customer)}
            className="btn-secondary text-sm flex items-center space-x-1"
          >
            <Icon name="Calendar" size={14} />
            <span>Follow-up</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-secondary-400" />
                  <span className="text-sm text-text-secondary">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-secondary-400" />
                  <span className="text-sm text-text-secondary">{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-secondary-400" />
                  <span className="text-sm text-text-secondary">{customer.address}</span>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Account Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary">Status</p>
                  <div className="mt-1">
                    {getStatusBadge(customer.accountStatus)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Payment Terms</p>
                  <p className="text-sm text-text-primary mt-1">{customer.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Shipping Preference</p>
                  <p className="text-sm text-text-primary mt-1">{customer.shippingPreference}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Relationship Duration</p>
                  <p className="text-sm text-text-primary mt-1">{customer.relationshipDuration}</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary-50 rounded-lg p-3">
                  <p className="text-xs text-text-secondary">Total Orders</p>
                  <p className="text-lg font-semibold text-text-primary">{customer.totalOrders}</p>
                </div>
                <div className="bg-secondary-50 rounded-lg p-3">
                  <p className="text-xs text-text-secondary">Total Revenue</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(customer.totalRevenue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Notes</h4>
              <div className="bg-secondary-50 rounded-lg p-3">
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {customer.notes}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-text-primary">Order History</h4>
              <span className="text-xs text-text-secondary">
                {customer.orderHistory.length} orders
              </span>
            </div>
            
            <div className="space-y-3">
              {customer.orderHistory.map((order) => (
                <div key={order.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
                    <div>
                      <span>Date: {formatDate(order.date)}</span>
                    </div>
                    <div>
                      <span>Items: {order.items}</span>
                    </div>
                    <div>
                      <span>Amount: {formatCurrency(order.amount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-text-primary">Communication History</h4>
              <button className="btn-secondary text-xs">
                <Icon name="Plus" size={14} className="mr-1" />
                Add Note
              </button>
            </div>
            
            <div className="space-y-3">
              {customer.communications.map((comm) => (
                <div key={comm.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={comm.type === 'email' ? 'Mail' : comm.type === 'call' ? 'Phone' : 'Users'} 
                      size={16} 
                      className="text-secondary-400" 
                    />
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {comm.type}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatDate(comm.date)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{comm.subject}</p>
                  {comm.duration && (
                    <p className="text-xs text-text-secondary">Duration: {comm.duration}</p>
                  )}
                  {comm.location && (
                    <p className="text-xs text-text-secondary">Location: {comm.location}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
