import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { generatePDFReport, formatCurrency } from '../utils/reportUtils';

const ReportsModal = ({ isOpen, onClose, data }) => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: 'DollarSign', desc: 'Revenue and order amounts' },
    { id: 'production', label: 'Production Status', icon: 'Factory', desc: 'Orders by status and line' },
    { id: 'inventory', label: 'Inventory Summary', icon: 'Package', desc: 'Stock levels (Coming Soon)' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        if (selectedReport === 'sales') {
          // Flatten mock data if needed or use real data prop
          // Assuming 'data' prop contains orders or we fetch/pass distinct data
          // For now, let's assume 'data' is the 'orders' array from Dashboard context/prop
          
          const reportData = data || []; 
          const columns = [
             { header: 'Order ID', dataKey: 'id' },
             { header: 'Customer', dataKey: 'customerName' },
             { header: 'Date', dataKey: 'orderDate' },
             { header: 'Total', dataKey: (row) => formatCurrency(row.totalAmount || 0) },
             { header: 'Status', dataKey: 'status' }
          ];
          
          generatePDFReport('Monthly Sales Report', columns, reportData, 'sales_report');
        } else if (selectedReport === 'production') {
           const reportData = (data || []).filter(o => o.status === 'in_production' || o.status === 'pending');
           const columns = [
             { header: 'Order ID', dataKey: 'id' },
             { header: 'Product', dataKey: 'productName' },
             { header: 'Line', dataKey: 'productionLine' },
             { header: 'Due Date', dataKey: 'dueDate' },
             { header: 'Progress', dataKey: (row) => row.progress + '%' }
          ];
          generatePDFReport('Production Status Report', columns, reportData, 'production_report');
        } else {
           alert("This report type requires more data integration.");
        }
        
        onClose();
      } catch (err) {
        console.error(err);
        alert("Failed to generate report");
      } finally {
        setIsGenerating(false);
      }
    }, 800); // Simulate processing delay
  };

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-md border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Generate Reports</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-text-secondary mb-4">Select the type of report you want to generate:</p>
          
          <div className="space-y-3">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`
                  w-full flex items-center p-4 rounded-lg border text-left transition-all
                  ${selectedReport === type.id 
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
                    : 'border-border hover:border-primary-300 hover:bg-secondary-50'
                  }
                `}
              >
                <div className={`p-2 rounded-full mr-4 ${selectedReport === type.id ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-500'}`}>
                  <Icon name={type.icon} size={20} />
                </div>
                <div>
                  <h3 className={`font-medium ${selectedReport === type.id ? 'text-primary-900' : 'text-text-primary'}`}>{type.label}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">{type.desc}</p>
                </div>
                {selectedReport === type.id && (
                  <Icon name="Check" size={18} className="ml-auto text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-secondary-50/50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-700 shadow-sm hover:shadow-md transition-all disabled:opacity-70"
          >
             {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Icon name="FileText" size={18} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsModal;
