import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const UpcomingDeadlines = () => {
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Fashion Forward Inc. Order",
      orderId: "ORD-2024-001",
      type: "Production Deadline",
      dueDate: "2024-01-15",
      daysLeft: 3,
      priority: "high",
      progress: 75,
      assignee: "Production Team A"
    },
    {
      id: 2,
      title: "Quality Inspection - Batch #45",
      orderId: "ORD-2024-002",
      type: "Quality Check",
      dueDate: "2024-01-16",
      daysLeft: 4,
      priority: "medium",
      progress: 90,
      assignee: "QC Inspector - Sarah"
    },
    {
      id: 3,
      title: "Material Delivery - Cotton Fabric",
      orderId: "PO-2024-008",
      type: "Supplier Delivery",
      dueDate: "2024-01-17",
      daysLeft: 5,
      priority: "high",
      progress: 60,
      assignee: "Procurement Team"
    },
    {
      id: 4,
      title: "Sports Apparel Inc. Shipment",
      orderId: "ORD-2024-005",
      type: "Shipping Deadline",
      dueDate: "2024-01-18",
      daysLeft: 6,
      priority: "medium",
      progress: 85,
      assignee: "Logistics Team"
    },
    {
      id: 5,
      title: "Monthly Production Report",
      orderId: "RPT-2024-001",
      type: "Report Submission",
      dueDate: "2024-01-20",
      daysLeft: 8,
      priority: "low",
      progress: 40,
      assignee: "Management Team"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-error-600 bg-error-50",
      medium: "text-warning-600 bg-warning-50",
      low: "text-success-600 bg-success-50"
    };
    return colors[priority] || colors.medium;
  };

  const getTypeIcon = (type) => {
    const icons = {
      "Production Deadline": "Factory",
      "Quality Check": "Shield",
      "Supplier Delivery": "Truck",
      "Shipping Deadline": "Package",
      "Report Submission": "FileText"
    };
    return icons[type] || "Clock";
  };

  const getDaysLeftColor = (days) => {
    if (days <= 2) return "text-error-600 bg-error-50";
    if (days <= 5) return "text-warning-600 bg-warning-50";
    return "text-success-600 bg-success-50";
  };

  const formatDaysLeft = (days) => {
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h2>
          <Icon name="Clock" size={18} className="text-warning-600" />
        </div>
        <Link 
          to="/production-workflow"
          className="text-sm text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>View Schedule</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {upcomingDeadlines.map((deadline) => (
          <div key={deadline.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors duration-150">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getTypeIcon(deadline.type)} 
                    size={16} 
                    className="text-primary-600"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-primary mb-1">{deadline.title}</h3>
                  <p className="text-xs text-text-secondary">{deadline.orderId}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDaysLeftColor(deadline.daysLeft)}`}>
                {formatDaysLeft(deadline.daysLeft)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{deadline.type}</span>
                <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(deadline.priority)}`}>
                  {deadline.priority}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary font-medium">{deadline.progress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 bg-primary-500 rounded-full transition-all duration-300"
                    style={{ width: `${deadline.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border-light">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="User" size={12} />
                  <span>{deadline.assignee}</span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Calendar" size={12} />
                  <span>Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
