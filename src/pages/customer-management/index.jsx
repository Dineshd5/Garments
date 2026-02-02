import React, { useState, useMemo } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import CustomerTable from './components/CustomerTable';
import CustomerSummary from './components/CustomerSummary';
import CustomerProfile from './components/CustomerProfile';
import { exportToCSV } from '../../utils/exportUtils';
import CustomerFilters from './components/CustomerFilter';

const CustomerManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastOrder');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock customer data
  const customers = [
    {
      id: 1,
      companyName: "Fashion Forward Inc.",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@fashionforward.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      address: "123 Fashion Ave, New York, NY 10001",
      totalOrders: 45,
      totalRevenue: 125000,
      lastOrderDate: new Date('2024-01-15'),
      accountStatus: "active",
      paymentTerms: "Net 30",
      shippingPreference: "Express",
      relationshipDuration: "2 years",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      notes: `Fashion Forward Inc. is one of our premium clients specializing in high-end retail fashion. They consistently place large orders and have excellent payment history.

Key contact Sarah Johnson is very responsive and professional. They prefer expedited shipping for seasonal collections and have specific quality requirements for fabric softness.`,
      orderHistory: [
        { id: "ORD-2024-001", date: "2024-01-15", amount: 8500, status: "delivered", items: 250 },
        { id: "ORD-2023-089", date: "2023-12-20", amount: 12000, status: "delivered", items: 400 },
        { id: "ORD-2023-078", date: "2023-11-10", amount: 6500, status: "delivered", items: 180 }
      ],
      communications: [
        { id: 1, type: "email", date: "2024-01-16", subject: "Order Confirmation - ORD-2024-001", status: "sent" },
        { id: 2, type: "call", date: "2024-01-10", subject: "Discussed new spring collection requirements", duration: "25 min" },
        { id: 3, type: "meeting", date: "2023-12-15", subject: "Quarterly business review", location: "Client office" }
      ]
    },
    {
      id: 2,
      companyName: "Urban Threads Co.",
      contactPerson: "Michael Chen",
      email: "m.chen@urbanthreads.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      address: "456 Sunset Blvd, Los Angeles, CA 90028",
      totalOrders: 32,
      totalRevenue: 89000,
      lastOrderDate: new Date('2024-01-12'),
      accountStatus: "active",
      paymentTerms: "Net 15",
      shippingPreference: "Standard",
      relationshipDuration: "1.5 years",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      notes: `Urban Threads Co. focuses on streetwear and casual fashion. They have been growing rapidly and increasing order frequency.

Michael Chen is detail-oriented and prefers detailed product specifications. They often request custom designs and have specific color requirements.`,
      orderHistory: [
        { id: "ORD-2024-002", date: "2024-01-12", amount: 7200, status: "in_production", items: 200 },
        { id: "ORD-2023-095", date: "2023-12-28", amount: 9800, status: "delivered", items: 320 },
        { id: "ORD-2023-087", date: "2023-11-25", amount: 5500, status: "delivered", items: 150 }
      ],
      communications: [
        { id: 1, type: "email", date: "2024-01-13", subject: "Production update for ORD-2024-002", status: "sent" },
        { id: 2, type: "call", date: "2024-01-08", subject: "New order specifications discussion", duration: "18 min" }
      ]
    },
    {
      id: 3,
      companyName: "Classic Apparel Ltd.",
      contactPerson: "Emily Rodriguez",
      email: "emily@classicapparel.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      address: "789 Michigan Ave, Chicago, IL 60611",
      totalOrders: 28,
      totalRevenue: 67000,
      lastOrderDate: new Date('2024-01-08'),
      accountStatus: "active",
      paymentTerms: "Net 30",
      shippingPreference: "Economy",
      relationshipDuration: "3 years",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      notes: `Classic Apparel Ltd. specializes in corporate and business casual wear. They are a reliable long-term partner with consistent ordering patterns.

Emily Rodriguez manages procurement and is very organized with clear specifications and timelines.`,
      orderHistory: [
        { id: "ORD-2024-003", date: "2024-01-08", amount: 5800, status: "shipped", items: 160 },
        { id: "ORD-2023-092", date: "2023-12-18", amount: 8200, status: "delivered", items: 280 }
      ],
      communications: [
        { id: 1, type: "email", date: "2024-01-09", subject: "Shipping confirmation for ORD-2024-003", status: "sent" }
      ]
    },
    {
      id: 4,
      companyName: "SportZone Athletics",
      contactPerson: "David Kim",
      email: "david.kim@sportzone.com",
      phone: "+1 (555) 321-0987",
      location: "Miami, FL",
      address: "321 Ocean Drive, Miami, FL 33139",
      totalOrders: 18,
      totalRevenue: 45000,
      lastOrderDate: new Date('2023-12-20'),
      accountStatus: "inactive",
      paymentTerms: "Net 15",
      shippingPreference: "Express",
      relationshipDuration: "8 months",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      notes: `SportZone Athletics focuses on athletic and performance wear. Account has been inactive for several weeks - requires follow-up.

David Kim was responsive but orders have decreased recently. May need to discuss new product offerings or pricing.`,
      orderHistory: [
        { id: "ORD-2023-088", date: "2023-12-20", amount: 4200, status: "delivered", items: 120 },
        { id: "ORD-2023-075", date: "2023-11-05", amount: 6800, status: "delivered", items: 200 }
      ],
      communications: [
        { id: 1, type: "email", date: "2024-01-05", subject: "Follow-up on future orders", status: "pending" },
        { id: 2, type: "call", date: "2023-12-22", subject: "Order delivery confirmation", duration: "12 min" }
      ]
    },
    {
      id: 5,
      companyName: "Trendy Boutique",
      contactPerson: "Lisa Wang",
      email: "lisa@trendyboutique.com",
      phone: "+1 (555) 654-3210",
      location: "Seattle, WA",
      address: "567 Pine Street, Seattle, WA 98101",
      totalOrders: 22,
      totalRevenue: 58000,
      lastOrderDate: new Date('2024-01-05'),
      accountStatus: "active",
      paymentTerms: "Net 30",
      shippingPreference: "Standard",
      relationshipDuration: "1 year",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      notes: `Trendy Boutique is a growing fashion retailer focusing on contemporary women's fashion. They have shown consistent growth in order volume.

Lisa Wang is very fashion-forward and often requests the latest trends and seasonal collections.`,
      orderHistory: [
        { id: "ORD-2024-004", date: "2024-01-05", amount: 6200, status: "in_production", items: 180 },
        { id: "ORD-2023-090", date: "2023-12-15", amount: 7500, status: "delivered", items: 220 }
      ],
      communications: [
        { id: 1, type: "email", date: "2024-01-06", subject: "Production timeline for ORD-2024-004", status: "sent" }
      ]
    }
  ];

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.accountStatus === statusFilter;
      
      const matchesLocation = locationFilter === 'all' || 
                             customer.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      return matchesSearch && matchesStatus && matchesLocation;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'companyName':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        case 'totalOrders':
          aValue = a.totalOrders;
          bValue = b.totalOrders;
          break;
        case 'totalRevenue':
          aValue = a.totalRevenue;
          bValue = b.totalRevenue;
          break;
        case 'lastOrder':
        default:
          aValue = new Date(a.lastOrderDate);
          bValue = new Date(b.lastOrderDate);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [customers, searchTerm, statusFilter, locationFilter, sortBy, sortOrder]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const activeCustomers = customers.filter(c => c.accountStatus === 'active');
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalRevenue, 0);
    const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return {
      totalCustomers: customers.length,
      activeCustomers: activeCustomers.length,
      totalRevenue,
      avgOrderValue,
      totalOrders
    };
  }, [customers]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseProfile = () => {
    setSelectedCustomer(null);
  };

  const handleCreateOrder = (customer) => {
    // Navigate to order creation with pre-filled customer data
    console.log('Creating order for:', customer.companyName);
  };

  const handleScheduleFollowUp = (customer) => {
    console.log('Scheduling follow-up for:', customer.companyName);
  };

  const handleUpdateStatus = (customer, newStatus) => {
    console.log('Updating status for:', customer.companyName, 'to:', newStatus);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-200 ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'} pt-16`}>
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-2">
                Customer Management
              </h1>
              <p className="text-text-secondary">
                Manage customer relationships, track order history, and maintain account information
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button 
                onClick={() => exportToCSV(customers, 'customers-export')}
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Add Customer</span>
              </button>
            </div>
          </div>

          {/* Customer Summary Cards */}
          <CustomerSummary stats={summaryStats} />

          {/* Filters and Search */}
          <CustomerFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Customer Table */}
            <div className="xl:col-span-3">
              <CustomerTable
                customers={filteredCustomers}
                onCustomerSelect={handleCustomerSelect}
                onCreateOrder={handleCreateOrder}
                onScheduleFollowUp={handleScheduleFollowUp}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>

            {/* Customer Profile Panel */}
            <div className="xl:col-span-1">
              {selectedCustomer ? (
                <CustomerProfile
                  customer={selectedCustomer}
                  onClose={handleCloseProfile}
                  onCreateOrder={handleCreateOrder}
                  onScheduleFollowUp={handleScheduleFollowUp}
                />
              ) : (
                <div className="card">
                  <div className="text-center py-12">
                    <Icon name="Users" size={48} className="text-secondary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      Select a Customer
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Click on any customer from the table to view their detailed profile and order history
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerManagement;
