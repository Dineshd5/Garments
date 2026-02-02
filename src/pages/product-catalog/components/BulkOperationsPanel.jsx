import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { exportToCSV } from "../../../utils/exportUtils"; // Adjust path based on structure

const BulkOperationsPanel = ({ selectedCount, onOperation, onClearSelection, selectedProducts }) => {
  const [isOperationMenuOpen, setIsOperationMenuOpen] = useState(false);

  const bulkOperations = [
    {
      id: 'update-price',
      label: 'Update Prices',
      icon: 'DollarSign',
      description: 'Bulk price adjustment'
    },
    {
      id: 'change-category',
      label: 'Change Category',
      icon: 'Grid3X3',
      description: 'Move to different category'
    },
    {
      id: 'update-status',
      label: 'Update Status',
      icon: 'ToggleLeft',
      description: 'Change availability status'
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      description: 'Export selected products'
    },
    {
      id: 'duplicate',
      label: 'Duplicate Products',
      icon: 'Copy',
      description: 'Create copies of selected items'
    },
    {
      id: 'delete',
      label: 'Delete Products',
      icon: 'Trash2',
      description: 'Remove selected products',
      danger: true
    }
  ];

  const handleOperationClick = (operationId) => {
    setIsOperationMenuOpen(false);
    if (operationId === 'export-data') {
      // Find the actual product objects that match the selected IDs
      // Note: This requires selectedProducts to be passed as prop
      if (selectedProducts && selectedProducts.length) {
         exportToCSV(selectedProducts, 'products-export');
      } else {
         alert("Export functionality requires full product data");
      }
    }
    onOperation(operationId);
    console.log(`Executing bulk operation: ${operationId} on ${selectedCount} products`);
    // Handle bulk operation logic here
  };

  return (
    <div className="card mb-6 bg-primary-50 border-primary-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary-600" />
            <span className="font-medium text-primary-700">
              {selectedCount} of {totalCount} products selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onSelectAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-150"
            >
              {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
            </button>
            
            {selectedCount > 0 && (
              <button
                onClick={onClearSelection}
                className="text-sm text-secondary-600 hover:text-text-primary font-medium transition-colors duration-150"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-primary-600">
              Bulk Actions:
            </span>
            
            <div className="relative">
              <button
                onClick={() => setIsOperationMenuOpen(!isOperationMenuOpen)}
                className="btn-primary"
                disabled={selectedCount === 0}
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Actions
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </button>

              {isOperationMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-1100"
                    onClick={() => setIsOperationMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-lg shadow-elevation-2 border border-border z-1200">
                    <div className="p-2">
                      {bulkOperations.map(operation => (
                        <button
                          key={operation.id}
                          onClick={() => handleOperationClick(operation.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors duration-150 ${
                            operation.danger
                              ? 'text-error hover:bg-error-50' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                          }`}
                        >
                          <Icon 
                            name={operation.icon} 
                            size={16} 
                            className={operation.danger ? 'text-error' : 'text-secondary-400'} 
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {operation.label}
                            </div>
                            <div className="text-xs opacity-75">
                              {operation.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-primary-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-primary-600">
              <span>Quick Actions:</span>
              <button 
                onClick={() => handleOperationClick('update-price')}
                className="hover:text-primary-700 font-medium transition-colors duration-150"
              >
                Update Prices
              </button>
              <button 
                onClick={() => handleOperationClick('change-category')}
                className="hover:text-primary-700 font-medium transition-colors duration-150"
              >
                Change Category
              </button>
              <button 
                onClick={() => handleOperationClick('export-data')}
                className="hover:text-primary-700 font-medium transition-colors duration-150"
              >
                Export Selected
              </button>
            </div>
            
            <div className="text-primary-600">
              Total value: ${(selectedCount * 15.99).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperationsPanel;
