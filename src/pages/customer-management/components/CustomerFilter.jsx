import React from 'react';
import Icon from 'components/AppIcon';

const CustomerFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  locationFilter,
  onLocationChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'new york', label: 'New York' },
    { value: 'los angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'miami', label: 'Miami' },
    { value: 'seattle', label: 'Seattle' }
  ];

  const sortOptions = [
    { value: 'lastOrder', label: 'Last Order Date' },
    { value: 'companyName', label: 'Company Name' },
    { value: 'totalOrders', label: 'Total Orders' },
    { value: 'totalRevenue', label: 'Total Revenue' }
  ];

  return (
    <div className="card mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="input-field pr-8 appearance-none bg-surface"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" 
            />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => onLocationChange(e.target.value)}
              className="input-field pr-8 appearance-none bg-surface"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" 
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="input-field pr-8 appearance-none bg-surface"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" 
              />
            </div>

            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-border rounded-md hover:bg-secondary-50 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              <Icon 
                name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || statusFilter !== 'all' || locationFilter !== 'all') && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              Search: {searchTerm}
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
              Status: {statusOptions.find(opt => opt.value === statusFilter)?.label}
              <button
                onClick={() => onStatusChange('all')}
                className="ml-1 text-secondary-500 hover:text-secondary-700"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {locationFilter !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
              Location: {locationOptions.find(opt => opt.value === locationFilter)?.label}
              <button
                onClick={() => onLocationChange('all')}
                className="ml-1 text-accent-500 hover:text-accent-700"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          <button
            onClick={() => {
              onSearchChange('');
              onStatusChange('all');
              onLocationChange('all');
            }}
            className="text-xs text-secondary-500 hover:text-secondary-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;
