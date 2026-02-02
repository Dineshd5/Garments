import React from 'react';
import Icon from 'components/AppIcon';

const OrderFilters = ({ filters, onFilterChange, totalResults }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_production', label: 'In Production' },
    { value: 'quality_check', label: 'Quality Check' },
    { value: 'completed', label: 'Completed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      dateRange: 'all',
      customer: '',
      product: '',
      search: ''
    });
  };

  const hasActiveFilters = filters.status !== 'all' || 
                          filters.dateRange !== 'all' || 
                          filters.customer || 
                          filters.product || 
                          filters.search;

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          />
          <input
            type="text"
            placeholder="Search orders by ID, customer, or product..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleInputChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Customer
          </label>
          <input
            type="text"
            placeholder="Filter by customer..."
            value={filters.customer}
            onChange={(e) => handleInputChange('customer', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Product Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Product
          </label>
          <input
            type="text"
            placeholder="Filter by product..."
            value={filters.product}
            onChange={(e) => handleInputChange('product', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter Summary and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
          <span className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{totalResults}</span> orders found
          </span>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary-700 transition-colors"
            >
              <Icon name="X" size={14} />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleInputChange('status', 'pending')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filters.status === 'pending' ?'bg-warning-100 text-warning-700' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleInputChange('status', 'in_production')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filters.status === 'in_production' ?'bg-primary-100 text-primary-700' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            In Production
          </button>
          <button
            onClick={() => handleInputChange('status', 'quality_check')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filters.status === 'quality_check' ?'bg-accent-100 text-accent-700' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            Quality Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
