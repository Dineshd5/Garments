import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { formatCurrency } from '../../../utils/formatUtils';

const ProductCard = ({ 
  product, 
  viewMode, 
  isBulkMode, 
  isSelected, 
  onSelect, 
  onView, 
  getStockStatusColor 
}) => {
  if (viewMode === 'list') {
    return (
      <div className="card hover:shadow-elevation-2 transition-all duration-200">
        <div className="flex items-center space-x-4">
          {/* Bulk Selection */}
          {isBulkMode && (
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
              />
            </div>
          )}

          {/* Product Image */}
          <div className="flex-shrink-0 w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-text-primary truncate">
                    {product.name}
                  </h3>
                  {product.isNew && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  SKU: {product.sku} • {product.category} • {product.fabricType}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-text-primary">
                    {formatCurrency(product.basePrice)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.availability)}`}>
                    {product.availability}
                  </span>
                  <span className="text-sm text-text-secondary">
                    Stock: {product.stockLevel}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {product.variants} variants
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={onView}
                  className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-150"
                  title="View Details"
                >
                  <Icon name="Eye" size={16} />
                </button>
                <button
                  className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-150"
                  title="Edit Product"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-150"
                  title="Duplicate Product"
                >
                  <Icon name="Copy" size={16} />
                </button>
                <button
                  className="p-2 text-secondary-600 hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-150"
                  title="More Options"
                >
                  <Icon name="MoreVertical" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Bulk Selection */}
      {isBulkMode && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
          />
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-48 bg-secondary-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
              New
            </span>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={onView}
              className="p-2 bg-white text-text-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
              title="View Details"
            >
              <Icon name="Eye" size={16} />
            </button>
            <button
              className="p-2 bg-white text-text-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
              title="Edit Product"
            >
              <Icon name="Edit" size={16} />
            </button>
            <button
              className="p-2 bg-white text-text-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
              title="Duplicate"
            >
              <Icon name="Copy" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary">
            SKU: {product.sku}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-text-primary">
            {formatCurrency(product.basePrice)}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.availability)}`}>
            {product.availability}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Category:</span>
            <span className="text-text-primary font-medium">{product.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Stock:</span>
            <span className="text-text-primary font-medium">{product.stockLevel}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Variants:</span>
            <span className="text-text-primary font-medium">{product.variants}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{product.fabricType}</span>
            <span>Min Order: {product.minimumOrder}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
