import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const QuickActionsPanel = ({ selectedOrder, onStageTransition, onQualityApproval }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);

  const quickActions = [
    {
      id: 'move-stage',
      label: 'Move to Next Stage',
      icon: 'ArrowRight',
      color: 'bg-primary text-white',
      action: () => setShowTransitionModal(true)
    },
    {
      id: 'quality-approve',
      label: 'Quality Approval',
      icon: 'Shield',
      color: 'bg-success text-white',
      action: () => setShowQualityModal(true)
    },
    {
      id: 'add-note',
      label: 'Add Note',
      icon: 'MessageSquare',
      color: 'bg-accent text-white',
      action: () => console.log('Add note')
    },
    {
      id: 'escalate',
      label: 'Escalate Issue',
      icon: 'AlertTriangle',
      color: 'bg-error text-white',
      action: () => console.log('Escalate issue')
    }
  ];

  const stages = [
    { id: 'cutting', name: 'Cutting', icon: 'Scissors' },
    { id: 'sewing', name: 'Sewing', icon: 'Zap' },
    { id: 'printing', name: 'Printing', icon: 'Palette' },
    { id: 'quality', name: 'Quality Control', icon: 'Shield' },
    { id: 'packaging', name: 'Packaging', icon: 'Package' }
  ];

  const handleStageTransition = (newStage) => {
    if (selectedOrder) {
      onStageTransition(selectedOrder.id, newStage);
      setShowTransitionModal(false);
    }
  };

  const handleQualityDecision = (approved) => {
    if (selectedOrder) {
      onQualityApproval(selectedOrder.id, approved);
      setShowQualityModal(false);
    }
  };

  return (
    <>
      {/* Quick Actions Panel */}
      <div className={`fixed bottom-4 right-4 z-1200 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-16'}`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-primary text-white rounded-full shadow-elevation-2 flex items-center justify-center hover:bg-primary-700 transition-colors duration-200 mb-4 ml-auto"
        >
          <Icon name={isExpanded ? 'X' : 'Zap'} size={24} />
        </button>

        {/* Actions Panel */}
        {isExpanded && (
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            
            {selectedOrder ? (
              <div className="space-y-4">
                {/* Selected Order Info */}
                <div className="bg-secondary-50 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-text-primary text-sm">{selectedOrder.id}</h4>
                  <p className="text-xs text-text-secondary">{selectedOrder.customer}</p>
                  <p className="text-xs text-text-secondary">{selectedOrder.product}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg ${action.color} hover:opacity-90 transition-opacity duration-200`}
                    >
                      <Icon name={action.icon} size={16} />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="MousePointer" size={32} className="text-secondary-400 mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Select an order to see quick actions</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stage Transition Modal */}
      {showTransitionModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Move Order to Stage</h3>
              <p className="text-text-secondary">Select the next stage for order {selectedOrder.id}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {stages.map((stage) => {
                  const isCurrentStage = stage.id === selectedOrder.currentStage;
                  const isDisabled = isCurrentStage;
                  
                  return (
                    <button
                      key={stage.id}
                      onClick={() => !isDisabled && handleStageTransition(stage.id)}
                      disabled={isDisabled}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200 ${
                        isCurrentStage
                          ? 'bg-primary-50 border-primary-200 text-primary-700 cursor-not-allowed' :'border-border hover:bg-secondary-50 text-text-primary'
                      }`}
                    >
                      <Icon name={stage.icon} size={20} />
                      <span className="font-medium">{stage.name}</span>
                      {isCurrentStage && (
                        <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <button 
                onClick={() => setShowTransitionModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quality Approval Modal */}
      {showQualityModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Quality Control Decision</h3>
              <p className="text-text-secondary">Make a quality decision for order {selectedOrder.id}</p>
            </div>
            
            <div className="p-6">
              <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-text-primary mb-2">{selectedOrder.product}</h4>
                <p className="text-sm text-text-secondary mb-2">Quantity: {selectedOrder.quantity}</p>
                <p className="text-sm text-text-secondary">Current Status: {selectedOrder.qualityStatus}</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleQualityDecision(true)}
                  className="w-full flex items-center justify-center space-x-2 p-4 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200"
                >
                  <Icon name="CheckCircle" size={20} />
                  <span className="font-medium">Approve Quality</span>
                </button>
                
                <button
                  onClick={() => handleQualityDecision(false)}
                  className="w-full flex items-center justify-center space-x-2 p-4 bg-error text-white rounded-lg hover:bg-error-700 transition-colors duration-200"
                >
                  <Icon name="XCircle" size={20} />
                  <span className="font-medium">Reject Quality</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <button 
                onClick={() => setShowQualityModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsPanel;
