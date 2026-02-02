import React from 'react';
import Icon from 'components/AppIcon';

const ProductionTimeline = () => {
  const timelineData = [
    {
      id: 1,
      stage: "Design Approval",
      orders: 23,
      status: "completed",
      progress: 100,
      duration: "2-3 days"
    },
    {
      id: 2,
      stage: "Material Sourcing",
      orders: 18,
      status: "active",
      progress: 75,
      duration: "3-5 days"
    },
    {
      id: 3,
      stage: "Cutting & Preparation",
      orders: 15,
      status: "active",
      progress: 60,
      duration: "1-2 days"
    },
    {
      id: 4,
      stage: "Sewing & Assembly",
      orders: 12,
      status: "active",
      progress: 40,
      duration: "5-7 days"
    },
    {
      id: 5,
      stage: "Quality Control",
      orders: 8,
      status: "pending",
      progress: 20,
      duration: "1-2 days"
    },
    {
      id: 6,
      stage: "Packaging & Shipping",
      orders: 5,
      status: "pending",
      progress: 10,
      duration: "1-3 days"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-success-500',
      active: 'bg-primary-500',
      pending: 'bg-secondary-300'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: 'CheckCircle',
      active: 'Clock',
      pending: 'Circle'
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Production Timeline</h2>
          <p className="text-sm text-text-secondary">Current orders through manufacturing stages</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary-600" />
          <span className="text-sm font-medium text-text-secondary">Live Updates</span>
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-secondary-200"></div>
          
          <div className="grid grid-cols-6 gap-4">
            {timelineData.map((stage, index) => (
              <div key={stage.id} className="relative">
                {/* Timeline Node */}
                <div className={`w-4 h-4 rounded-full ${getStatusColor(stage.status)} relative z-10 mx-auto mb-4`}></div>
                
                {/* Stage Card */}
                <div className="bg-background rounded-lg border border-border p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon 
                      name={getStatusIcon(stage.status)} 
                      size={16} 
                      className={`${stage.status === 'completed' ? 'text-success-600' : 
                                   stage.status === 'active' ? 'text-primary-600' : 'text-secondary-400'}`}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">{stage.stage}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-text-secondary">{stage.orders} orders</p>
                    <p className="text-xs text-text-secondary">{stage.duration}</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-secondary-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getStatusColor(stage.status)}`}
                        style={{ width: `${stage.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{stage.progress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-4">
        {timelineData.map((stage, index) => (
          <div key={stage.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(stage.status)} flex-shrink-0`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-primary">{stage.stage}</h3>
                <span className="text-xs text-text-secondary">{stage.progress}%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                <span>{stage.orders} orders</span>
                <span>{stage.duration}</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${getStatusColor(stage.status)}`}
                  style={{ width: `${stage.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionTimeline;
