import React from 'react';
import Icon from 'components/AppIcon';

const OrderSummary = ({ orders }) => {
  // Calculate summary statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inProductionOrders = orders.filter(order => order.status === 'in_production').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const urgentOrders = orders.filter(order => {
    const dueDate = new Date(order.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 3 && order.status !== 'completed' && order.status !== 'shipped';
  }).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: 'Package',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Pending',
      value: pendingOrders,
      icon: 'Clock',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'In Production',
      value: inProductionOrders,
      icon: 'Factory',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Completed',
      value: completedOrders,
      icon: 'CheckCircle',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    }
  ];

  const recentOrders = orders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-warning-100 text-warning-700',
      'in_production': 'bg-primary-100 text-primary-700',
      'quality_check': 'bg-accent-100 text-accent-700',
      'completed': 'bg-success-100 text-success-700',
      'shipped': 'bg-secondary-100 text-secondary-700'
    };
    return statusColors[status] || 'bg-secondary-100 text-secondary-700';
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full btn-primary flex items-center justify-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>Create New Order</span>
          </button>
          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
            <Icon name="Download" size={16} />
            <span>Export Orders</span>
          </button>
          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
            <Icon name="Upload" size={16} />
            <span>Import Orders</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
        <div className="space-y-4">
          {summaryCards.map((card, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon name={card.icon} size={20} className={card.color} />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{card.title}</p>
                <p className="text-lg font-semibold text-text-primary">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue Metrics</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary">Total Revenue</p>
            <p className="text-xl font-bold text-success-600">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Average Order Value</p>
            <p className="text-lg font-semibold text-text-primary">{formatCurrency(averageOrderValue)}</p>
          </div>
        </div>
      </div>

      {/* Urgent Orders Alert */}
      {urgentOrders > 0 && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error-600" />
            <h3 className="text-sm font-semibold text-error-700">Urgent Orders</h3>
          </div>
          <p className="text-sm text-error-600">
            {urgentOrders} order{urgentOrders > 1 ? 's' : ''} due within 3 days
          </p>
          <button className="mt-2 text-sm text-error-700 hover:text-error-800 font-medium">
            View urgent orders →
          </button>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
          <button className="text-sm text-primary hover:text-primary-700 font-medium">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{order.id}</p>
                <p className="text-xs text-text-secondary truncate">{order.customerName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Lines Status */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Production Lines</h3>
        <div className="space-y-3">
          {['Line A', 'Line B', 'Line C'].map((line) => {
            const lineOrders = orders.filter(order => order.productionLine === line && order.status === 'in_production');
            const isActive = lineOrders.length > 0;
            
            return (
              <div key={line} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-success' : 'bg-secondary-300'}`} />
                  <span className="text-sm font-medium text-text-primary">{line}</span>
                </div>
                <span className="text-sm text-text-secondary">
                  {lineOrders.length} active
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-primary-50 rounded-lg border border-primary-200 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="HelpCircle" size={16} className="text-primary-600" />
          <h3 className="text-sm font-semibold text-primary-700">Need Help?</h3>
        </div>
        <p className="text-sm text-primary-600 mb-3">
          Get assistance with order management and production workflows.
        </p>
        <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
