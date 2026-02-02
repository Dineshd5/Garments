import { supabase } from 'lib/supabase';
import React, { useState, useMemo, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import FilterPanel from './components/FilterPanel';
import BulkOperationsPanel from './components/BulkOperationsPanel';

const ProductCatalog = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: '',
    fabricType: '',
    priceRange: [0, 1000],
    availability: '',
    sizes: [],
    colors: []
  });

  // State for data fetching
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match component expectations if needed
      // Currently the schema matches well, but we ensure arrays are defaulted
      const formattedData = (data || []).map(product => ({
        ...product,
        sizes: product.sizes || [],
        colors: product.colors || [],
        specifications: product.specifications || {},
        basePrice: parseFloat(product.base_price || 0), // Ensure number
        stockLevel: product.stock_level,
        fabricType: product.fabric_type,
        productionTime: product.production_time,
        minimumOrder: product.minimum_order,
        isNew: product.is_new
      }));

      setProducts(formattedData);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Basic", "Premium", "Athletic", "Vintage", "Eco-Friendly"];
  const fabricTypes = ["All", "100% Cotton", "Cotton Blend", "Polyester Blend", "Organic Cotton"];

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || filters.category === 'All' || product.category === filters.category;
      const matchesFabric = !filters.fabricType || filters.fabricType === 'All' || product.fabricType === filters.fabricType;
      const matchesPrice = product.basePrice >= filters.priceRange[0] && product.basePrice <= filters.priceRange[1];
      const matchesAvailability = !filters.availability || product.availability === filters.availability;

      return matchesSearch && matchesCategory && matchesFabric && matchesPrice && matchesAvailability;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.basePrice - b.basePrice;
        case 'stock':
          return b.stockLevel - a.stockLevel;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const getStockStatusColor = (availability) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-success-100 text-success-700';
      case 'Low Stock':
        return 'bg-warning-100 text-warning-700';
      case 'Out of Stock':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-200 ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'}`}>
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
                Product Catalog
              </h1>
              <p className="text-text-secondary">
                Manage T-shirt designs, specifications, and pricing information
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsBulkMode(!isBulkMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isBulkMode 
                    ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <Icon name="CheckSquare" size={16} className="mr-2" />
                Bulk Mode
              </button>
              
              <button className="btn-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Product
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Products</p>
                  <p className="text-2xl font-semibold text-text-primary">{products.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-primary-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">In Stock</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {products.filter(p => p.availability === 'In Stock').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Low Stock</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {products.filter(p => p.availability === 'Low Stock').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-warning-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Categories</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {categories.length - 1}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Grid3X3" size={24} className="text-accent-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 lg:max-w-md">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search products, SKU, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                {/* Category Filter */}
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="input-field w-auto"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="stock">Sort by Stock</option>
                  <option value="newest">Sort by Newest</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center bg-secondary-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-150 ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-150 ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>

                {/* Advanced Filters */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="btn-secondary"
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-text-secondary">
                Showing {filteredProducts.length} of {products.length} products
                {selectedProducts.length > 0 && (
                  <span className="ml-2 text-primary-600 font-medium">
                    ({selectedProducts.length} selected)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Bulk Operations Panel */}
          {isBulkMode && selectedProducts.length > 0 && (
            <BulkOperationsPanel 
              selectedCount={selectedProducts.length}
              selectedProducts={products.filter(p => selectedProducts.includes(p.id))}
              onOperation={handleBulkOperation}
              onClearSelection={() => setSelectedProducts([])}
            />
          )}

          {/* Products Grid/List */}
          <div className={`
            ${viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
            }
          `}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                isBulkMode={isBulkMode}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={() => handleProductSelect(product.id)}
                onView={() => setSelectedProduct(product)}
                getStockStatusColor={getStockStatusColor}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Package" size={32} className="text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
              <p className="text-text-secondary mb-6">
                {searchQuery || Object.values(filters).some(f => f && f.length > 0)
                  ? "Try adjusting your search or filters" :"Get started by adding your first product"
                }
              </p>
              <button className="btn-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Product
              </button>
            </div>
          )}
        </div>
        )}
      </main>

      {/* Filter Panel */}
      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
          fabricTypes={fabricTypes}
        />
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          getStockStatusColor={getStockStatusColor}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
