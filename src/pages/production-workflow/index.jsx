import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ProductionTimeline from './components/ProductionTimeline';
import OrdersTable from './components/OrdersTable';
import StageDetailsModal from './components/StageDetailsModal';
import QuickActionsPanel from './components/QuickActionsPanel';

const ProductionWorkflow = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Mock production stages data
  const productionStages = [
    {
      id: 'cutting',
      name: 'Cutting',
      icon: 'Scissors',
      capacity: 100,
      activeOrders: 15,
      utilizationRate: 75,
      avgProcessingTime: '2.5 hours',
      status: 'on-time',
      operators: ['John Doe', 'Jane Smith'],
      description: 'Fabric cutting and pattern preparation'
    },
    {
      id: 'sewing',
      name: 'Sewing',
      icon: 'Zap',
      capacity: 80,
      activeOrders: 22,
      utilizationRate: 90,
      avgProcessingTime: '4 hours',
      status: 'delayed',
      operators: ['Mike Johnson', 'Sarah Wilson', 'Tom Brown'],
      description: 'Stitching and assembly operations'
    },
    {
      id: 'printing',
      name: 'Printing',
      icon: 'Palette',
      capacity: 60,
      activeOrders: 8,
      utilizationRate: 45,
      avgProcessingTime: '1.5 hours',
      status: 'on-time',
      operators: ['Lisa Garcia', 'David Lee'],
      description: 'Screen printing and design application'
    },
    {
      id: 'quality',
      name: 'Quality Control',
      icon: 'Shield',
      capacity: 40,
      activeOrders: 12,
      utilizationRate: 85,
      avgProcessingTime: '30 minutes',
      status: 'blocked',
      operators: ['Emma Davis', 'Chris Taylor'],
      description: 'Quality inspection and approval'
    },
    {
      id: 'packaging',
      name: 'Packaging',
      icon: 'Package',
      capacity: 50,
      activeOrders: 6,
      utilizationRate: 40,
      avgProcessingTime: '20 minutes',
      status: 'on-time',
      operators: ['Alex Rodriguez', 'Maria Martinez'],
      description: 'Final packaging and labeling'
    }
  ];

  // Mock orders in production data
  const ordersInProduction = [
    {
      id: 'ORD-2024-001',
      customer: 'Fashion Forward Inc.',
      product: 'Premium Cotton T-Shirt - Navy Blue',
      quantity: 500,
      currentStage: 'sewing',
      assignedOperator: 'Mike Johnson',
      estimatedCompletion: '2024-01-15 14:30',
      qualityStatus: 'pending',
      priority: 'high',
      progress: 65,
      startDate: '2024-01-10',
      issues: []
    },
    {
      id: 'ORD-2024-002',
      customer: 'Urban Style Co.',
      product: 'Organic Cotton T-Shirt - White',
      quantity: 300,
      currentStage: 'printing',
      assignedOperator: 'Lisa Garcia',
      estimatedCompletion: '2024-01-16 10:00',
      qualityStatus: 'approved',
      priority: 'medium',
      progress: 45,
      startDate: '2024-01-12',
      issues: []
    },
    {
      id: 'ORD-2024-003',
      customer: 'Sports Gear Ltd.',
      product: 'Performance T-Shirt - Black',
      quantity: 750,
      currentStage: 'quality',
      assignedOperator: 'Emma Davis',
      estimatedCompletion: '2024-01-17 16:00',
      qualityStatus: 'rejected',
      priority: 'high',
      progress: 80,
      startDate: '2024-01-08',
      issues: ['Color mismatch in batch #3', 'Stitching quality below standard']
    },
    {
      id: 'ORD-2024-004',
      customer: 'Casual Wear Plus',
      product: 'Basic Cotton T-Shirt - Gray',
      quantity: 200,
      currentStage: 'cutting',
      assignedOperator: 'John Doe',
      estimatedCompletion: '2024-01-18 12:00',
      qualityStatus: 'pending',
      priority: 'low',
      progress: 25,
      startDate: '2024-01-14',
      issues: []
    },
    {
      id: 'ORD-2024-005',
      customer: 'Trendy Threads',
      product: 'Vintage Style T-Shirt - Burgundy',
      quantity: 400,
      currentStage: 'packaging',
      assignedOperator: 'Alex Rodriguez',
      estimatedCompletion: '2024-01-15 09:00',
      qualityStatus: 'approved',
      priority: 'medium',
      progress: 95,
      startDate: '2024-01-05',
      issues: []
    }
  ];

  // Mock production metrics
  const productionMetrics = {
    totalOrdersInProduction: 25,
    onTimeDelivery: 87,
    qualityPassRate: 94,
    averageLeadTime: '5.2 days',
    dailyOutput: 1250,
    efficiency: 82
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleStageTransition = (orderId, newStage) => {
    // Mock stage transition logic
    console.log(`Moving order ${orderId} to ${newStage}`);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleQualityApproval = (orderId, approved) => {
    // Mock quality approval logic
    console.log(`Quality ${approved ? 'approved' : 'rejected'} for order ${orderId}`);
    setRefreshTrigger(prev => prev + 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-success bg-success-50 border-success-200';
      case 'delayed':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'blocked':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50';
      case 'medium':
        return 'text-warning bg-warning-50';
      case 'low':
        return 'text-success bg-success-50';
      default:
        return 'text-secondary bg-secondary-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-200 ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'} pt-16`}>
        <div className="p-4 lg:p-6 max-w-full">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                Production Workflow
              </h1>
              <p className="text-text-secondary">
                Monitor and manage manufacturing stages with real-time tracking
              </p>
            </div>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-0">
              <div className="bg-surface rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-text-secondary">On-Time</span>
                </div>
                <p className="text-lg font-bold text-text-primary">{productionMetrics.onTimeDelivery}%</p>
              </div>
              <div className="bg-surface rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm font-medium text-text-secondary">Quality</span>
                </div>
                <p className="text-lg font-bold text-text-primary">{productionMetrics.qualityPassRate}%</p>
              </div>
              <div className="bg-surface rounded-lg p-3 border border-border col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-secondary">Efficiency</span>
                </div>
                <p className="text-lg font-bold text-text-primary">{productionMetrics.efficiency}%</p>
              </div>
            </div>
          </div>

          {/* Production Timeline */}
          <div className="mb-8">
            <ProductionTimeline 
              stages={productionStages}
              onStageClick={handleStageClick}
              getStatusColor={getStatusColor}
            />
          </div>

          {/* Orders in Production Table */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="p-4 lg:p-6 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-1">
                    Orders in Production
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {ordersInProduction.length} orders currently being processed
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button className="btn-secondary text-sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Filter
                  </button>
                  <button className="btn-primary text-sm">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            
            <OrdersTable 
              orders={ordersInProduction}
              stages={productionStages}
              onOrderSelect={handleOrderSelect}
              onStageTransition={handleStageTransition}
              onQualityApproval={handleQualityApproval}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
            />
          </div>

          {/* Quick Actions Panel */}
          <QuickActionsPanel 
            selectedOrder={selectedOrder}
            onStageTransition={handleStageTransition}
            onQualityApproval={handleQualityApproval}
          />
        </div>
      </main>

      {/* Stage Details Modal */}
      {selectedStage && (
        <StageDetailsModal 
          stage={selectedStage}
          orders={ordersInProduction.filter(order => order.currentStage === selectedStage.id)}
          onClose={() => setSelectedStage(null)}
          onStageTransition={handleStageTransition}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

export default ProductionWorkflow;
