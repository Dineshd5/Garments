import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bulkActions = [
    {
      id: 'update_status',
      label: 'Update Status',
      icon: 'RefreshCw',
      description: 'Change status for selected orders',
      submenu: [
        { id: 'pending', label: 'Mark as Pending', icon: 'Clock' },
        { id: 'in_production', label: 'Start Production', icon: 'Factory' },
        { id: 'quality_check', label: 'Send to Quality Check', icon: 'CheckSquare' },
        { id: 'completed', label: 'Mark as Completed', icon: 'CheckCircle' },
        { id: 'shipped', label: 'Mark as Shipped', icon: 'Truck' }
      ]
    },
    {
      id: 'assign_line',
      label: 'Assign Production Line',
      icon: 'Factory',
      description: 'Assign orders to production lines',
      submenu: [
        { id: 'line_a', label: 'Assign to Line A', icon: 'ArrowRight' },
        { id: 'line_b', label: 'Assign to Line B', icon: 'ArrowRight' },
        { id: 'line_c', label: 'Assign to Line C', icon: 'ArrowRight' }
      ]
    },
    {
      id: 'priority',
      label: 'Set Priority',
      icon: 'Flag',
      description: 'Change priority level',
      submenu: [
        { id: 'high', label: 'High Priority', icon: 'AlertTriangle' },
        { id: 'medium', label: 'Medium Priority', icon: 'Minus' },
        { id: 'low', label: 'Low Priority', icon: 'ArrowDown' }
      ]
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      description: 'Export selected orders to CSV/Excel'
    },
    {
      id: 'duplicate',
      label: 'Duplicate Orders',
      icon: 'Copy',
      description: 'Create copies of selected orders'
    },
    {
      id: 'delete',
      label: 'Delete Orders',
      icon: 'Trash2',
      description: 'Permanently delete selected orders',
      danger: true
    }
  ];

  const handleActionClick = (action, subAction = null) => {
    const actionId = subAction ? `${action.id}_${subAction.id}` : action.id;
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              {selectedCount} order{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              <Icon name="Settings" size={14} />
              <span>Bulk Actions</span>
              <Icon name="ChevronDown" size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-1100"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface rounded-lg shadow-elevation-2 border border-border z-1200 max-h-96 overflow-y-auto">
                  <div className="py-2">
                    {bulkActions.map((action) => (
                      <div key={action.id}>
                        {action.submenu ? (
                          <div className="group relative">
                            <div className={`px-4 py-2 text-sm hover:bg-secondary-50 transition-colors ${action.danger ? 'text-error-600 hover:bg-error-50' : 'text-text-primary'}`}>
                              <div className="flex items-center space-x-3">
                                <Icon name={action.icon} size={16} />
                                <div className="flex-1">
                                  <span className="font-medium">{action.label}</span>
                                  <p className="text-xs text-text-secondary mt-0.5">{action.description}</p>
                                </div>
                                <Icon name="ChevronRight" size={14} className="text-secondary-400" />
                              </div>
                            </div>
                            
                            {/* Submenu */}
                            <div className="absolute left-full top-0 ml-1 w-48 bg-surface rounded-lg shadow-elevation-2 border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-1300">
                              <div className="py-2">
                                {action.submenu.map((subAction) => (
                                  <button
                                    key={subAction.id}
                                    onClick={() => handleActionClick(action, subAction)}
                                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-secondary-50 transition-colors flex items-center space-x-2"
                                  >
                                    <Icon name={subAction.icon} size={14} />
                                    <span>{subAction.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleActionClick(action)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary-50 transition-colors ${action.danger ? 'text-error-600 hover:bg-error-50' : 'text-text-primary'}`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon name={action.icon} size={16} />
                              <div>
                                <span className="font-medium">{action.label}</span>
                                <p className="text-xs text-text-secondary mt-0.5">{action.description}</p>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onClearSelection}
          className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-text-primary transition-colors"
        >
          <Icon name="X" size={14} />
          <span>Clear selection</span>
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center space-x-2 mt-3">
        <button
          onClick={() => onBulkAction('start_production')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-success text-white rounded-md text-xs font-medium hover:bg-success-700 transition-colors"
        >
          <Icon name="Play" size={12} />
          <span>Start Production</span>
        </button>
        
        <button
          onClick={() => onBulkAction('quality_check')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-accent text-white rounded-md text-xs font-medium hover:bg-accent-700 transition-colors"
        >
          <Icon name="CheckSquare" size={12} />
          <span>Quality Check</span>
        </button>
        
        <button
          onClick={() => onBulkAction('export')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-600 text-white rounded-md text-xs font-medium hover:bg-secondary-700 transition-colors"
        >
          <Icon name="Download" size={12} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
