import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OrdersTable = ({ 
  orders, 
  stages, 
  onOrderSelect, 
  onStageTransition, 
  onQualityApproval, 
  getPriorityColor, 
  getStatusColor 
}) => {
  const [sortField, setSortField] = useState('estimatedCompletion');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === orders.length 
        ? [] 
        : orders.map(order => order.id)
    );
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'estimatedCompletion') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getQualityStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success-50';
      case 'rejected':
        return 'text-error bg-error-50';
      case 'pending':
        return 'text-warning bg-warning-50';
      default:
        return 'text-secondary bg-secondary-50';
    }
  };

  const getCurrentStageInfo = (stageId) => {
    return stages.find(stage => stage.id === stageId);
  };

  return (
    <div className="overflow-hidden">
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedOrders.map((order) => {
          const currentStage = getCurrentStageInfo(order.currentStage);
          return (
            <div 
              key={order.id}
              className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:shadow-elevation-1 transition-all duration-200"
              onClick={() => onOrderSelect(order)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{order.id}</h3>
                  <p className="text-sm text-text-secondary">{order.customer}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                  {order.priority}
                </span>
              </div>
              
              <p className="text-sm text-text-primary mb-3">{order.product}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-text-secondary">Quantity: </span>
                  <span className="font-medium text-text-primary">{order.quantity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Progress: </span>
                  <span className="font-medium text-text-primary">{order.progress}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {currentStage && <Icon name={currentStage.icon} size={16} className="text-primary-600" />}
                  <span className="text-sm font-medium text-text-primary">{currentStage?.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityStatusColor(order.qualityStatus)}`}>
                  {order.qualityStatus}
                </span>
              </div>
              
              <div className="w-full bg-secondary-100 rounded-full h-2 mb-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-text-secondary">
                <p>Operator: {order.assignedOperator}</p>
                <p>Est. Completion: {formatDateTime(order.estimatedCompletion)}</p>
              </div>
              
              {order.issues.length > 0 && (
                <div className="mt-3 p-2 bg-error-50 rounded border border-error-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="AlertTriangle" size={14} className="text-error" />
                    <span className="text-xs font-medium text-error">Issues ({order.issues.length})</span>
                  </div>
                  <p className="text-xs text-error">{order.issues[0]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary-500"
                />
              </th>
              <th 
                className="p-4 text-left text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-150"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Order ID</span>
                  {sortField === 'id' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th 
                className="p-4 text-left text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-150"
                onClick={() => handleSort('customer')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  {sortField === 'customer' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Product</th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Current Stage</th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Operator</th>
              <th 
                className="p-4 text-left text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-150"
                onClick={() => handleSort('estimatedCompletion')}
              >
                <div className="flex items-center space-x-1">
                  <span>Est. Completion</span>
                  {sortField === 'estimatedCompletion' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </div>
              </th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Quality</th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Progress</th>
              <th className="p-4 text-left text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => {
              const currentStage = getCurrentStageInfo(order.currentStage);
              const isSelected = selectedOrders.includes(order.id);
              
              return (
                <tr 
                  key={order.id}
                  className={`border-b border-border hover:bg-secondary-50 transition-colors duration-150 ${isSelected ? 'bg-primary-50' : ''}`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-border focus:ring-primary-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-text-primary">{order.customer}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-text-primary">{order.product}</p>
                      <p className="text-sm text-text-secondary">Qty: {order.quantity}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {currentStage && <Icon name={currentStage.icon} size={16} className="text-primary-600" />}
                      <span className="text-text-primary">{currentStage?.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-text-primary">{order.assignedOperator}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-text-primary">{formatDateTime(order.estimatedCompletion)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityStatusColor(order.qualityStatus)}`}>
                      {order.qualityStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-100 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-text-primary">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onOrderSelect(order)}
                        className="p-1 text-secondary-600 hover:text-primary-600 transition-colors duration-150"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      <button 
                        className="p-1 text-secondary-600 hover:text-primary-600 transition-colors duration-150"
                        title="Edit Order"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      {order.issues.length > 0 && (
                        <button 
                          className="p-1 text-error hover:text-error-700 transition-colors duration-150"
                          title={`${order.issues.length} Issues`}
                        >
                          <Icon name="AlertTriangle" size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
