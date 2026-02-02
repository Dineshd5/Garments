import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OrderModal = ({ order, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-warning-100 text-warning-700 border-warning-200',
      'in_progress': 'bg-primary-100 text-primary-700 border-primary-200',
      'completed': 'bg-success-100 text-success-700 border-success-200'
    };
    return statusColors[status] || 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const tabs = [
    { id: 'details', label: 'Order Details', icon: 'FileText' },
    { id: 'timeline', label: 'Production Timeline', icon: 'Clock' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  const mockCommunications = [
    {
      id: 1,
      type: 'email',
      from: 'John Smith',
      to: 'orders@fashionforward.com',
      subject: 'Order Confirmation - ORD-2024-001',
      message: 'Thank you for your order. We have received your specifications and will begin production as scheduled.',
      timestamp: '2024-01-15T10:30:00Z',
      direction: 'outgoing'
    },
    {
      id: 2,
      type: 'email',
      from: 'orders@fashionforward.com',
      to: 'John Smith',
      subject: 'Design Approval Required',
      message: 'Please review and approve the attached design mockup before we proceed with production.',
      timestamp: '2024-01-16T14:20:00Z',
      direction: 'incoming'
    },
    {
      id: 3,
      type: 'note',
      from: 'Sarah Johnson',
      message: 'Customer requested rush delivery. Adjusted production schedule accordingly.',
      timestamp: '2024-01-18T09:15:00Z',
      direction: 'internal'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{order.id}</h2>
            <p className="text-text-secondary">{order.customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">Order Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Order ID</label>
                      <p className="text-text-primary">{order.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Order Date</label>
                      <p className="text-text-primary">{formatDate(order.orderDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Due Date</label>
                      <p className="text-text-primary">{formatDate(order.dueDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">Customer Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Company Name</label>
                      <p className="text-text-primary">{order.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Email</label>
                      <p className="text-text-primary">{order.customerEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Priority</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                        order.priority === 'high' ? 'bg-error-100 text-error-700' :
                        order.priority === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                      }`}>
                        {order.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Product Name</label>
                      <p className="text-text-primary">{order.productName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Design</label>
                      <p className="text-text-primary">{order.design}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Quantity</label>
                      <p className="text-text-primary">{order.quantity.toLocaleString()} units</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Unit Price</label>
                      <p className="text-text-primary">{formatCurrency(order.unitPrice)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Total Amount</label>
                      <p className="text-xl font-semibold text-text-primary">{formatCurrency(order.totalAmount)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Production Line</label>
                      <p className="text-text-primary">{order.productionLine}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Specifications</h3>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <pre className="text-sm text-text-primary whitespace-pre-wrap font-mono">
                    {order.specifications}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Production Timeline</h3>
              
              {/* Progress Bar */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">Overall Progress</span>
                  <span className="text-text-primary font-medium">{order.progress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-4">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-success text-white' :
                      step.status === 'in_progress'? 'bg-primary text-white' : 'bg-secondary-200 text-secondary-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <Icon name="Check" size={16} />
                      ) : step.status === 'in_progress' ? (
                        <Icon name="Clock" size={16} />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{step.stage}</h4>
                      <p className="text-sm text-text-secondary">
                        {step.date ? formatDate(step.date) : 'Not scheduled'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                      {step.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Communication History</h3>
                <button className="btn-primary flex items-center space-x-2">
                  <Icon name="Plus" size={16} />
                  <span>New Message</span>
                </button>
              </div>

              <div className="space-y-4">
                {mockCommunications.map((comm) => (
                  <div key={comm.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          comm.direction === 'outgoing' ? 'bg-primary-100' :
                          comm.direction === 'incoming'? 'bg-accent-100' : 'bg-secondary-100'
                        }`}>
                          <Icon 
                            name={comm.type === 'email' ? 'Mail' : 'FileText'} 
                            size={16} 
                            className={
                              comm.direction === 'outgoing' ? 'text-primary-600' :
                              comm.direction === 'incoming'? 'text-accent-600' : 'text-secondary-600'
                            }
                          />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{comm.from}</p>
                          {comm.to && (
                            <p className="text-sm text-text-secondary">to {comm.to}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-text-secondary">
                        {new Date(comm.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {comm.subject && (
                      <h4 className="font-medium text-text-primary mb-2">{comm.subject}</h4>
                    )}
                    
                    <p className="text-text-secondary">{comm.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Icon name="Edit" size={16} />
            <span>Edit Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
