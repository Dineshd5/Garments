import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, onClose, fabricTypes }) => {
  const availabilityOptions = ['In Stock', 'Low Stock', 'Out of Stock'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = ['White', 'Black', 'Navy', 'Gray', 'Red', 'Blue', 'Green'];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleArrayFilterChange = (key, value) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onFiltersChange({
      ...filters,
      [key]: newArray
    });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseFloat(value) || 0;
    onFiltersChange({
      ...filters,
      priceRange: newRange
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      fabricType: '',
      priceRange: [0, 1000],
      availability: '',
      sizes: [],
      colors: []
    });
  };

  const hasActiveFilters = () => {
    return filters.category || 
           filters.fabricType || 
           filters.availability || 
           filters.sizes.length > 0 || 
           filters.colors.length > 0 ||
           filters.priceRange[0] > 0 || 
           filters.priceRange[1] < 1000;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary-600" />
            <h2 className="text-lg font-semibold text-text-primary">Advanced Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-150"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Fabric Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Fabric Type
            </label>
            <div className="space-y-2">
              {fabricTypes.map(fabric => (
                <label key={fabric} className="flex items-center">
                  <input
                    type="radio"
                    name="fabricType"
                    value={fabric === 'All' ? '' : fabric}
                    checked={filters.fabricType === (fabric === 'All' ? '' : fabric)}
                    onChange={(e) => handleFilterChange('fabricType', e.target.value)}
                    className="w-4 h-4 text-primary-600 border-border focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-secondary">{fabric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">Min Price</label>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="input-field text-sm"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">Max Price</label>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="input-field text-sm"
                    placeholder="1000"
                    min="0"
                  />
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                Current range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Availability
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value=""
                  checked={filters.availability === ''}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-4 h-4 text-primary-600 border-border focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-text-secondary">All</span>
              </label>
              {availabilityOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    value={option}
                    checked={filters.availability === option}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-4 h-4 text-primary-600 border-border focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-secondary">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Available Sizes
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizeOptions.map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleArrayFilterChange('sizes', size)}
                    className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-secondary">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Available Colors
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map(color => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => handleArrayFilterChange('colors', color)}
                    className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-secondary">{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between space-x-3">
            <button
              onClick={clearAllFilters}
              disabled={!hasActiveFilters()}
              className="text-sm text-secondary-600 hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Clear All
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
