import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const StageDetailsModal = ({ stage, orders, onClose, onStageTransition, getStatusColor }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 90) return 'text-error bg-error-50';
    if (rate >= 75) return 'text-warning bg-warning-50';
    return 'text-success bg-success-50';
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'orders', label: 'Active Orders', icon: 'List' },
    { id: 'operators', label: 'Operators', icon: 'Users' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(stage.status)}`}>
              <Icon name={stage.icon} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{stage.name}</h2>
              <p className="text-text-secondary">{stage.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-150 ${
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Package" size={16} className="text-primary-600" />
                    <span className="text-sm font-medium text-text-secondary">Active Orders</span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{stage.activeOrders}</p>
                  <p className="text-sm text-text-secondary">of {stage.capacity} capacity</p>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-text-secondary">Avg Processing Time</span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{stage.avgProcessingTime}</p>
                  <p className="text-sm text-text-secondary">per order</p>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Activity" size={16} className="text-success" />
                    <span className="text-sm font-medium text-text-secondary">Utilization Rate</span>
                  </div>
                  <p className={`text-2xl font-bold ${getUtilizationColor(stage.utilizationRate)}`}>
                    {stage.utilizationRate}%
                  </p>
                  <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stage.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stage Status */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-3">Stage Status</h3>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(stage.status)}`}>
                    {stage.status.replace('-', ' ').toUpperCase()}
                  </div>
                  <span className="text-text-secondary">
                    {stage.status === 'on-time' && 'All operations running smoothly'}
                    {stage.status === 'delayed' && 'Some orders experiencing delays'}
                    {stage.status === 'blocked' && 'Operations currently blocked'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  Active Orders ({orders.length})
                </h3>
                <button className="btn-primary text-sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Order
                </button>
              </div>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Package" size={48} className="text-secondary-400 mx-auto mb-4" />
                  <p className="text-text-secondary">No orders currently in this stage</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-secondary-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">{order.id}</h4>
                        <span className="text-sm text-text-secondary">
                          {order.progress}% complete
                        </span>
                      </div>
                      <p className="text-text-secondary mb-2">{order.customer}</p>
                      <p className="text-sm text-text-primary mb-3">{order.product}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-secondary">
                          <p>Operator: {order.assignedOperator}</p>
                          <p>Est. Completion: {formatDateTime(order.estimatedCompletion)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-sm">
                            <Icon name="Edit" size={14} className="mr-1" />
                            Edit
                          </button>
                          <button className="btn-primary text-sm">
                            <Icon name="ArrowRight" size={14} className="mr-1" />
                            Move
                          </button>
                        </div>
                      </div>
                      
                      {order.issues.length > 0 && (
                        <div className="mt-3 p-2 bg-error-50 rounded border border-error-200">
                          <div className="flex items-center space-x-1 mb-1">
                            <Icon name="AlertTriangle" size={14} className="text-error" />
                            <span className="text-xs font-medium text-error">Issues</span>
                          </div>
                          {order.issues.map((issue, index) => (
                            <p key={index} className="text-xs text-error">{issue}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'operators' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Assigned Operators ({stage.operators.length})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage.operators.map((operator, index) => (
                  <div key={index} className="bg-secondary-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{operator}</h4>
                        <p className="text-sm text-text-secondary">Production Operator</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Active Orders: </span>
                        <span className="font-medium text-text-primary">
                          {orders.filter(order => order.assignedOperator === operator).length}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Status: </span>
                        <span className="font-medium text-success">Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Performance Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-3">Efficiency Trends</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Today</span>
                      <span className="font-medium text-text-primary">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">This Week</span>
                      <span className="font-medium text-text-primary">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">This Month</span>
                      <span className="font-medium text-text-primary">85%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-3">Quality Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Pass Rate</span>
                      <span className="font-medium text-success">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Rework Rate</span>
                      <span className="font-medium text-warning">4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Reject Rate</span>
                      <span className="font-medium text-error">2%</span>
                    </div>
                  </div>
                </div>
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
          <button className="btn-primary">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageDetailsModal;
