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
import ReportsModal from 'components/ReportsModal';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

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
      path: "/order-management?action=new"
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
      description: "Production & Sales analytics",
      icon: "BarChart2",
      color: "accent",
      onClick: () => setIsReportsModalOpen(true)
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
                action.path ? (
                  <Link 
                    key={action.id}
                    to={action.path}
                    className="p-4 bg-white border border-border rounded-lg shadow-sm hover:shadow-md hover:border-primary-200 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-${action.color}-50 text-${action.color}-600 group-hover:bg-${action.color}-100 transition-colors`}>
                        <Icon name={action.icon} size={24} />
                      </div>
                      <Icon name="ArrowRight" size={16} className="text-secondary-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary-700 transition-colors">{action.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{action.description}</p>
                    </div>
                  </Link>
                ) : (
                  <button 
                    key={action.id}
                    onClick={action.onClick}
                    className="p-4 bg-white border border-border rounded-lg shadow-sm hover:shadow-md hover:border-primary-200 transition-all group text-left w-full"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-${action.color}-50 text-${action.color}-600 group-hover:bg-${action.color}-100 transition-colors`}>
                        <Icon name={action.icon} size={24} />
                      </div>
                      <Icon name="ArrowRight" size={16} className="text-secondary-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary-700 transition-colors">{action.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{action.description}</p>
                    </div>
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Reports Modal */}
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        data={[ // Mock data for report preview since Dashboard implies analytics
           { id: "ORD-001", customerName: "Fashion Co", orderDate: "2024-01-20", totalAmount: 5000, status: "completed", productName: "T-Shirt Basic", productionLine: "Line A", dueDate: "2024-02-01", progress: 100 },
           { id: "ORD-002", customerName: "Urban Threads", orderDate: "2024-01-22", totalAmount: 3200, status: "in_production", productName: "Polo Shirt", productionLine: "Line B", dueDate: "2024-02-05", progress: 60 },
           { id: "ORD-003", customerName: "Design Corp", orderDate: "2024-01-25", totalAmount: 8500, status: "pending", productName: "Hoodie", productionLine: "Line A", dueDate: "2024-02-10", progress: 0 }
        ]}
      />
    </div>
  );
};

export default Dashboard;
