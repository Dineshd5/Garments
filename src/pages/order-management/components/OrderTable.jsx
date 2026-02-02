import React from 'react';
import Icon from 'components/AppIcon';
import { formatCurrency, formatDate } from '../../../utils/formatUtils';

const OrderTable = ({ 
  orders, 
  selectedOrders, 
  sortConfig, 
  onOrderSelect, 
  onSelectAll, 
  onOrderView, 
  onSort 
}) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-warning-100 text-warning-700',
      'in_production': 'bg-primary-100 text-primary-700',
      'quality_check': 'bg-accent-100 text-accent-700',
      'completed': 'bg-success-100 text-success-700',
      'shipped': 'bg-secondary-100 text-secondary-700',
      'cancelled': 'bg-error-100 text-error-700'
    };
    return statusColors[status] || 'bg-secondary-100 text-secondary-700';
  };

  const getStatusText = (status) => {
    const statusText = {
      'pending': 'Pending',
      'in_production': 'In Production',
      'quality_check': 'Quality Check',
      'completed': 'Completed',
      'shipped': 'Shipped',
      'cancelled': 'Cancelled'
    };
    return statusText[status] || status;
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'high': 'text-error-600',
      'medium': 'text-warning-600',
      'low': 'text-success-600'
    };
    return priorityColors[priority] || 'text-secondary-600';
  };






  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-secondary-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary-600" />
      : <Icon name="ArrowDown" size={14} className="text-primary-600" />;
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => onSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Order ID</span>
                  {getSortIcon('id')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => onSort('customerName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  {getSortIcon('customerName')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Product Details
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => onSort('quantity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  {getSortIcon('quantity')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => onSort('totalAmount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  {getSortIcon('totalAmount')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Status
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100 transition-colors"
                onClick={() => onSort('dueDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Production Line
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr 
                key={order.id}
                className="hover:bg-secondary-50 transition-colors cursor-pointer"
                onClick={() => onOrderView(order)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => onOrderSelect(order.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{order.id}</span>
                    <Icon 
                      name="Flag" 
                      size={12} 
                      className={getPriorityColor(order.priority)}
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-text-primary">{order.customerName}</div>
                    <div className="text-sm text-text-secondary">{order.customerEmail}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-text-primary">{order.productName}</div>
                    <div className="text-sm text-text-secondary">{order.design}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-text-primary">{order.quantity.toLocaleString()}</span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-text-primary">{formatCurrency(order.totalAmount)}</div>
                    <div className="text-sm text-text-secondary">{formatCurrency(order.unitPrice)}/unit</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    {order.status === 'in_production' && (
                      <div className="w-full bg-secondary-200 rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-text-primary">{formatDate(order.dueDate)}</span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-text-primary">{order.productionLine}</div>
                    <div className="text-sm text-text-secondary">{order.assignedTo}</div>
                  </div>
                </td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center space-x-1">
                    <button 
                      className="p-1 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      onClick={() => onOrderView(order)}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button 
                      className="p-1 text-secondary-600 hover:text-accent-600 hover:bg-accent-50 rounded transition-colors"
                      title="Edit Order"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button 
                      className="p-1 text-secondary-600 hover:text-success-600 hover:bg-success-50 rounded transition-colors"
                      title="Duplicate Order"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="bg-surface border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onOrderSelect(order.id)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-text-primary">{order.id}</span>
                    <Icon 
                      name="Flag" 
                      size={12} 
                      className={getPriorityColor(order.priority)}
                    />
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} mt-1`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onOrderView(order)}
                className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-text-secondary">Customer:</span>
                <span className="ml-2 text-sm text-text-primary">{order.customerName}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Product:</span>
                <span className="ml-2 text-sm text-text-primary">{order.productName}</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-sm font-medium text-text-secondary">Quantity:</span>
                  <span className="ml-2 text-sm text-text-primary">{order.quantity.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-text-secondary">Amount:</span>
                  <span className="ml-2 text-sm font-semibold text-text-primary">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Due:</span>
                <span className="ml-2 text-sm text-text-primary">{formatDate(order.dueDate)}</span>
              </div>
            </div>

            {order.status === 'in_production' && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary font-medium">{order.progress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No orders found</h3>
          <p className="text-text-secondary">Try adjusting your filters or create a new order.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
