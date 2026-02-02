import React from 'react';
import Icon from 'components/AppIcon';

const KPICard = ({ data }) => {
  const { title, value, unit, change, changeType, icon, color } = data;

  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-600',
        border: 'border-primary-200'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success-600',
        border: 'border-success-200'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        border: 'border-warning-200'
      },
      error: {
        bg: 'bg-error-50',
        icon: 'text-error-600',
        border: 'border-error-200'
      }
    };
    return colors[colorType] || colors.primary;
  };

  const getChangeClasses = (type) => {
    return type === 'increase' ?'text-success-600 bg-success-50' :'text-error-600 bg-error-50';
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} ${colorClasses.border} border flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeClasses(changeType)}`}>
          <Icon 
            name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
            size={12} 
          />
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl lg:text-3xl font-bold text-text-primary">{value}</span>
          <span className="text-sm text-text-secondary">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
