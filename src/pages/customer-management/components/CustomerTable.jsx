import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CustomerTable = ({ 
  customers, 
  onCustomerSelect, 
  onCreateOrder, 
  onScheduleFollowUp, 
  onUpdateStatus 
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

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
      suspended: { color: 'bg-error-100 text-error-700', label: 'Suspended' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleRowSelect = (customerId) => {
    setSelectedRows(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === customers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(customers.map(c => c.id));
    }
  };

  const handleQuickAction = (e, action, customer) => {
    e.stopPropagation();
    switch (action) {
      case 'order':
        onCreateOrder(customer);
        break;
      case 'followup':
        onScheduleFollowUp(customer);
        break;
      case 'email':
        window.open(`mailto:${customer.email}`);
        break;
      case 'call':
        window.open(`tel:${customer.phone}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card p-0 overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            Customer Directory ({customers.length})
          </h2>
          
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedRows.length} selected
              </span>
              <button className="btn-secondary text-xs">
                Bulk Actions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === customers.length && customers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Last Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => onCustomerSelect(customer)}
                className="hover:bg-secondary-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(customer.id)}
                    onChange={() => handleRowSelect(customer.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-border focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100 flex-shrink-0">
                      {customer.avatar ? (
                        <Image
                          src={customer.avatar}
                          alt={customer.contactPerson}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Building2" size={20} className="text-secondary-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {customer.companyName}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {customer.contactPerson}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {customer.location}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary font-medium">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary font-medium">
                  {formatCurrency(customer.totalRevenue)}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDate(customer.lastOrderDate)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(customer.accountStatus)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleQuickAction(e, 'order', customer)}
                      className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                      title="Create Order"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAction(e, 'email', customer)}
                      className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                      title="Send Email"
                    >
                      <Icon name="Mail" size={16} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAction(e, 'call', customer)}
                      className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                      title="Call Customer"
                    >
                      <Icon name="Phone" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {customers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onCustomerSelect(customer)}
            className="p-4 border-b border-border hover:bg-secondary-50 transition-colors duration-150"
          >
            <div className="flex items-start space-x-3">
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
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary truncate">
                      {customer.companyName}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {customer.contactPerson}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {customer.location}
                    </p>
                  </div>
                  {getStatusBadge(customer.accountStatus)}
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>{customer.totalOrders} orders</span>
                    <span>{formatCurrency(customer.totalRevenue)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleQuickAction(e, 'call', customer)}
                      className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                      title="Call"
                    >
                      <Icon name="Phone" size={16} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAction(e, 'email', customer)}
                      className="p-2 bg-secondary-50 text-secondary-600 rounded-full hover:bg-secondary-100 transition-colors"
                      title="Email"
                    >
                      <Icon name="Mail" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {customers.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No customers found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search criteria or add a new customer
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
