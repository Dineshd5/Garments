import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const LowStockAlerts = () => {
  const lowStockItems = [
    {
      id: 1,
      name: "Cotton Fabric - White",
      category: "Raw Material",
      currentStock: 45,
      minThreshold: 100,
      unit: "yards",
      supplier: "Textile Mills Co.",
      lastRestocked: "2024-01-05",
      urgency: "critical"
    },
    {
      id: 2,
      name: "Polyester Thread - Black",
      category: "Sewing Material",
      currentStock: 12,
      minThreshold: 50,
      unit: "spools",
      supplier: "Thread Masters Ltd.",
      lastRestocked: "2024-01-08",
      urgency: "high"
    },
    {
      id: 3,
      name: "Cotton Fabric - Navy Blue",
      category: "Raw Material",
      currentStock: 78,
      minThreshold: 150,
      unit: "yards",
      supplier: "Textile Mills Co.",
      lastRestocked: "2024-01-03",
      urgency: "medium"
    },
    {
      id: 4,
      name: "Elastic Bands - Medium",
      category: "Accessories",
      currentStock: 25,
      minThreshold: 75,
      unit: "pieces",
      supplier: "Elastic Solutions Inc.",
      lastRestocked: "2024-01-07",
      urgency: "high"
    },
    {
      id: 5,
      name: "Labels - Size M",
      category: "Finishing",
      currentStock: 150,
      minThreshold: 300,
      unit: "pieces",
      supplier: "Label Pro Co.",
      lastRestocked: "2024-01-06",
      urgency: "medium"
    }
  ];

  const getUrgencyColor = (urgency) => {
    const colors = {
      critical: "bg-error-50 border-error-200 text-error-700",
      high: "bg-warning-50 border-warning-200 text-warning-700",
      medium: "bg-accent-50 border-accent-200 text-accent-700"
    };
    return colors[urgency] || colors.medium;
  };

  const getUrgencyIcon = (urgency) => {
    const icons = {
      critical: "AlertTriangle",
      high: "AlertCircle",
      medium: "Info"
    };
    return icons[urgency] || icons.medium;
  };

  const getStockPercentage = (current, min) => {
    return Math.round((current / min) * 100);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-text-primary">Low Stock Alerts</h2>
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
        </div>
        <Link 
          to="/product-catalog"
          className="text-sm text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>Manage Inventory</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className={`border rounded-lg p-4 ${getUrgencyColor(item.urgency)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-2">
                <Icon 
                  name={getUrgencyIcon(item.urgency)} 
                  size={16} 
                  className="mt-0.5"
                />
                <div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs opacity-80">{item.category}</p>
                </div>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide">
                {item.urgency}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Current Stock</span>
                <span className="font-medium">{item.currentStock} {item.unit}</span>
              </div>
              
              <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.urgency === 'critical' ? 'bg-error-500' :
                    item.urgency === 'high'? 'bg-warning-500' : 'bg-accent-500'
                  }`}
                  style={{ width: `${Math.min(getStockPercentage(item.currentStock, item.minThreshold), 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs opacity-80">
                <span>Min: {item.minThreshold} {item.unit}</span>
                <span>{getStockPercentage(item.currentStock, item.minThreshold)}% of minimum</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Truck" size={12} />
                  <span>{item.supplier}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>Last: {new Date(item.lastRestocked).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="w-full mt-2 py-1 px-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors duration-150">
                Reorder Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlerts;
