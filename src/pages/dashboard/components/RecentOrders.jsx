import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "ORD-2024-001",
      customer: "Fashion Forward Inc.",
      product: "Cotton Basic Tee",
      quantity: 500,
      status: "In Production",
      priority: "high",
      dueDate: "2024-01-15",
      value: "$2,500"
    },
    {
      id: "ORD-2024-002",
      customer: "Urban Style Co.",
      product: "Premium Polo Shirt",
      quantity: 300,
      status: "Quality Check",
      priority: "medium",
      dueDate: "2024-01-18",
      value: "$4,200"
    },
    {
      id: "ORD-2024-003",
      customer: "Retail Giants Ltd.",
      product: "Graphic Print Tee",
      quantity: 1000,
      status: "Material Sourcing",
      priority: "high",
      dueDate: "2024-01-20",
      value: "$8,500"
    },
    {
      id: "ORD-2024-004",
      customer: "Local Boutique",
      product: "Organic Cotton Tee",
      quantity: 150,
      status: "Design Approval",
      priority: "low",
      dueDate: "2024-01-25",
      value: "$1,800"
    },
    {
      id: "ORD-2024-005",
      customer: "Sports Apparel Inc.",
      product: "Athletic Performance Tee",
      quantity: 750,
      status: "Packaging",
      priority: "medium",
      dueDate: "2024-01-12",
      value: "$6,750"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      "In Production": "bg-primary-100 text-primary-700",
      "Quality Check": "bg-warning-100 text-warning-700",
      "Material Sourcing": "bg-secondary-100 text-secondary-700",
      "Design Approval": "bg-accent-100 text-accent-700",
      "Packaging": "bg-success-100 text-success-700"
    };
    return colors[status] || "bg-secondary-100 text-secondary-700";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-error-600",
      medium: "text-warning-600",
      low: "text-success-600"
    };
    return colors[priority] || "text-secondary-600";
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: "AlertTriangle",
      medium: "Clock",
      low: "CheckCircle"
    };
    return icons[priority] || "Circle";
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Recent Orders</h2>
        <Link 
          to="/order-management"
          className="text-sm text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors duration-150">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-medium text-text-primary">{order.id}</h3>
                  <Icon 
                    name={getPriorityIcon(order.priority)} 
                    size={12} 
                    className={getPriorityColor(order.priority)}
                  />
                </div>
                <p className="text-sm text-text-secondary">{order.customer}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Product</p>
                <p className="text-text-primary font-medium">{order.product}</p>
              </div>
              <div>
                <p className="text-text-secondary">Quantity</p>
                <p className="text-text-primary font-medium">{order.quantity.toLocaleString()} units</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={12} />
                  <span>{order.value}</span>
                </div>
              </div>
              <button className="text-primary hover:text-primary-700 text-xs font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
