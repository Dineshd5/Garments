import React from 'react';
import Icon from 'components/AppIcon';

const ProductionTimeline = ({ stages, onStageClick, getStatusColor }) => {
  const getUtilizationColor = (rate) => {
    if (rate >= 90) return 'text-error bg-error-50';
    if (rate >= 75) return 'text-warning bg-warning-50';
    return 'text-success bg-success-50';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Production Timeline</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-text-secondary">On Time</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-text-secondary">Delayed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-text-secondary">Blocked</span>
          </div>
        </div>
      </div>

      {/* Desktop Timeline View */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-border"></div>
          
          <div className="flex justify-between items-start">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center relative">
                {/* Stage Node */}
                <div 
                  className={`w-12 h-12 rounded-full border-4 bg-surface cursor-pointer transition-all duration-200 hover:scale-110 ${getStatusColor(stage.status)}`}
                  onClick={() => onStageClick(stage)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name={stage.icon} size={20} />
                  </div>
                </div>
                
                {/* Stage Info Card */}
                <div 
                  className="mt-4 bg-surface border border-border rounded-lg p-4 w-48 cursor-pointer hover:shadow-elevation-2 transition-all duration-200"
                  onClick={() => onStageClick(stage)}
                >
                  <h3 className="font-semibold text-text-primary mb-2">{stage.name}</h3>
                  <p className="text-xs text-text-secondary mb-3">{stage.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary">Active Orders</span>
                      <span className="text-sm font-medium text-text-primary">{stage.activeOrders}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary">Capacity</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getUtilizationColor(stage.utilizationRate)}`}>
                        {stage.utilizationRate}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary">Avg Time</span>
                      <span className="text-sm font-medium text-text-primary">{stage.avgProcessingTime}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stage.utilizationRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Connection Line */}
                {index < stages.length - 1 && (
                  <div className="absolute top-6 left-12 w-full h-0.5 bg-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Stacked View */}
      <div className="lg:hidden space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">
            <div 
              className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:shadow-elevation-1 transition-all duration-200"
              onClick={() => onStageClick(stage)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(stage.status)}`}>
                  <Icon name={stage.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">{stage.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">{stage.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Orders: </span>
                      <span className="font-medium text-text-primary">{stage.activeOrders}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Capacity: </span>
                      <span className={`font-medium ${getUtilizationColor(stage.utilizationRate)}`}>
                        {stage.utilizationRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Time: </span>
                      <span className="font-medium text-text-primary">{stage.avgProcessingTime}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stage.utilizationRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Icon name="ChevronRight" size={20} className="text-secondary-400" />
              </div>
            </div>
            
            {/* Connection Arrow for Mobile */}
            {index < stages.length - 1 && (
              <div className="flex justify-center py-2">
                <Icon name="ArrowDown" size={16} className="text-secondary-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionTimeline;
