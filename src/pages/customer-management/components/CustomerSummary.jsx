import React from 'react';
import Icon from 'components/AppIcon';

const CustomerSummary = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: 'Users',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Customers',
      value: stats.activeCustomers,
      icon: 'UserCheck',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: 'DollarSign',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(stats.avgOrderValue),
      icon: 'TrendingUp',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-semibold text-text-primary">
                {card.value}
              </p>
              <div className="flex items-center mt-2">
                <Icon 
                  name={card.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={card.changeType === 'positive' ? 'text-success-600' : 'text-error-600'} 
                />
                <span className={`text-sm ml-1 ${card.changeType === 'positive' ? 'text-success-600' : 'text-error-600'}`}>
                  {card.change}
                </span>
                <span className="text-sm text-text-secondary ml-1">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerSummary;
