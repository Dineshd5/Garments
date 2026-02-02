import { supabase } from 'lib/supabase';
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import OrderTable from './components/OrderTable';
import OrderFilters from './components/OrderFilters';
import OrderModal from './components/OrderModal';
import OrderSummary from './components/OrderSummary';
import BulkActions from './components/BulkActions';
import ImportModal from 'components/ImportModal';
import { exportToCSV } from '../../utils/exportUtils';

const OrderManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImportOrders = async (data) => {
    // Transform import data to match DB structure if needed
    // For now, we'll try to insert directly or just map keys
    // This assumes CSV headers match our schema or we map them
    
    // Simple mapping example (assuming CSV has camelCase headers matching our internal model)
    // We would need to map back to snake_case for Supabase
    const dbData = data.map(row => ({
       customer_name: row.customerName,
       product_name: row.productName,
       quantity: parseInt(row.quantity),
       total_amount: parseFloat(row.totalAmount),
       status: 'pending', // Default status
       order_date: new Date().toISOString(),
       order_number: `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}` 
    }));

    const { error } = await supabase.from('orders').insert(dbData);
    if (error) throw error;
    
    // Refresh list
    fetchOrders();
    alert(`Successfully imported ${data.length} orders.`);
  };

  const handleSaveOrder = async (orderData) => {
     try {
       // Convert camelCase to snake_case for Supabase
       const dbPayload = {
         customer_name: orderData.customerName,
         customer_email: orderData.customerEmail,
         product_name: orderData.productName,
         quantity: parseInt(orderData.quantity),
         total_amount: parseFloat(orderData.totalAmount || (orderData.quantity * orderData.unitPrice)),
         status: orderData.status,
         priority: orderData.priority,
         production_line: orderData.productionLine,
         specifications: orderData.specifications,
         design_notes: orderData.design,
         unit_price: parseFloat(orderData.unitPrice),
         due_date: orderData.dueDate || null,
       };

       if (selectedOrder && selectedOrder.dbId) {
          // Update existing
          const { error } = await supabase
            .from('orders')
            .update(dbPayload)
            .eq('id', selectedOrder.dbId);
          if (error) throw error;
       } else {
          // Create new
          const { error } = await supabase
            .from('orders')
            .insert([{
               ...dbPayload,
               order_date: new Date().toISOString(),
               order_number: `ORD-${Date.now()}` // Generate ID
            }]);
          if (error) throw error;
       }
       
       fetchOrders();
       setIsOrderModalOpen(false);
       setSelectedOrder(null);
     } catch (err) {
       console.error('Error saving order:', err);
       alert('Failed to save order: ' + err.message);
     }
  };
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      setSelectedOrder(null);
      setIsOrderModalOpen(true);
      // Clean URL without refresh
      window.history.replaceState({}, '', '/order-management');
    }
  }, [location]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    customer: '',
    product: '',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'orderDate',
    direction: 'desc'
  });

  // State for data fetching
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from Supabase
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match component expectations (snake_case to camelCase)
      const formattedData = (data || []).map(order => ({
        id: order.order_number, // using order_number as display ID
        dbId: order.id, // keep real UUID if needed
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        productName: order.product_name,
        design: order.design_notes,
        quantity: order.quantity,
        unitPrice: parseFloat(order.unit_price || 0),
        totalAmount: parseFloat(order.total_amount || 0),
        status: order.status,
        priority: order.priority,
        orderDate: order.order_date,
        dueDate: order.due_date,
        productionLine: order.production_line,
        assignedTo: order.assigned_to,
        progress: order.progress,
        specifications: order.specifications,
        timeline: order.timeline || []
      }));

      setOrders(formattedData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesStatus = filters.status === 'all' || order.status === filters.status;
      const matchesCustomer = !filters.customer || order.customerName.toLowerCase().includes(filters.customer.toLowerCase());
      const matchesProduct = !filters.product || order.productName.toLowerCase().includes(filters.product.toLowerCase());
      const matchesSearch = !filters.search || 
        order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.productName.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesCustomer && matchesProduct && matchesSearch;
    });

    // Sort orders
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'orderDate' || sortConfig.key === 'dueDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [orders, filters, sortConfig]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOrderSelect = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredAndSortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredAndSortedOrders.map(order => order.id));
    }
  };

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on orders:`, selectedOrders);
    // Handle bulk actions here
    setSelectedOrders([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-200 ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'} pt-16`}>
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-2">
                Order Management
              </h1>
              <p className="text-text-secondary">
                Track and manage T-shirt production orders from creation to delivery
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button 
                onClick={() => exportToCSV(orders, 'orders-export')}
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedOrder(null);
                  setIsOrderModalOpen(true);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>New Order</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filters */}
              <OrderFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                totalResults={filteredAndSortedOrders.length}
              />

              {/* Bulk Actions */}
              {selectedOrders.length > 0 && (
                <BulkActions 
                  selectedCount={selectedOrders.length}
                  onBulkAction={handleBulkAction}
                  onClearSelection={() => setSelectedOrders([])}
                />
              )}

              {/* Orders Table */}
              <OrderTable 
                orders={filteredAndSortedOrders}
                selectedOrders={selectedOrders}
                sortConfig={sortConfig}
                onOrderSelect={handleOrderSelect}
                onSelectAll={handleSelectAll}
                onOrderView={handleOrderView}
                onSort={handleSort}
              />
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-1">
              <OrderSummary 
                orders={orders} 
                onImportClick={() => setIsImportModalOpen(true)}
              />
            </div>
          </div>
        </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {isOrderModalOpen && (
        <OrderModal 
          order={selectedOrder}
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            setSelectedOrder(null);
          }}
          onSave={handleSaveOrder}
        />
      )}

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportOrders}
        title="Import Orders"
        requiredFields={['customerName', 'productName', 'quantity', 'totalAmount']}
      />
    </div>
  );
};

export default OrderManagement;
