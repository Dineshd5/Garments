import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import KPICard from './components/KPICard';
import ProductionTimeline from './components/ProductionTimeline';
import RecentOrders from './components/RecentOrders';
import LowStockAlerts from './components/LowStockAlerts';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import ProductionChart from './components/ProductionChart';
import CapacityChart from './components/CapacityChart';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  // Mock KPI data
  const kpiData = [
    {
      id: 1,
      title: "Daily Production",
      value: "2,847",
      unit: "units",
      change: "+12.5%",
      changeType: "increase",
      icon: "Factory",
      color: "primary"
    },
    {
      id: 2,
      title: "Active Orders",
      value: "156",
      unit: "orders",
      change: "+8.2%",
      changeType: "increase",
      icon: "ShoppingCart",
      color: "success"
    },
    {
      id: 3,
      title: "Inventory Level",
      value: "87%",
      unit: "capacity",
      change: "-3.1%",
      changeType: "decrease",
      icon: "Package",
      color: "warning"
    },
    {
      id: 4,
      title: "Quality Score",
      value: "98.2%",
      unit: "pass rate",
      change: "+0.8%",
      changeType: "increase",
      icon: "Shield",
      color: "success"
    }
  ];

  // Mock quick actions
  const quickActions = [
    {
      id: 1,
      title: "Create New Order",
      description: "Start a new production order",
      icon: "Plus",
      color: "primary",
      path: "/order-management"
    },
    {
      id: 2,
      title: "View Production Schedule",
      description: "Check current production timeline",
      icon: "Calendar",
      color: "secondary",
      path: "/production-workflow"
    },
    {
      id: 3,
      title: "Generate Reports",
      description: "Create performance reports",
      icon: "FileText",
      color: "accent",
      path: "/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  Manufacturing Dashboard
                </h1>
                <p className="text-text-secondary">
                  Real-time insights into your T-shirt production operations
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.id} data={kpi} />
            ))}
          </div>

          {/* Production Timeline */}
          <div className="mb-8">
            <ProductionTimeline />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProductionChart />
            <CapacityChart />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <RecentOrders />
            </div>
            <div className="lg:col-span-1">
              <LowStockAlerts />
            </div>
            <div className="lg:col-span-1">
              <UpcomingDeadlines />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
              <Icon name="Zap" size={20} className="text-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  to={action.path}
                  className="group p-4 rounded-lg border border-border hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
                      ${action.color === 'primary' ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-200' :
                        action.color === 'secondary'? 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-200' : 'bg-accent-100 text-accent-600 group-hover:bg-accent-200'}
                    `}>
                      <Icon name={action.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary group-hover:text-primary-700 transition-colors duration-200">
                        {action.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
