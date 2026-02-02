import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import { parseImportFile, validateImportData } from '../utils/importUtils';

const ImportModal = ({ isOpen, onClose, onImport, title = "Import Data", requiredFields = [] }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validExtensions = ['csv', 'xlsx', 'xls'];
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      
      if (!validExtensions.includes(fileExt)) {
        setError('Please upload a valid CSV or Excel file.');
        return;
      }
      setFile(selectedFile);
      setError(null);
      
      // Parse immediately for preview
      parseImportFile(
        selectedFile, 
        (data) => {
          const validation = validateImportData(data, requiredFields);
          if (!validation.valid) {
             setError(validation.message);
             setPreviewData([]);
          } else {
            setPreviewData(data.slice(0, 5)); // Preview first 5 rows
          }
        },
        (errMsg) => setError(errMsg)
      );
    }
  };

  const handleImport = async () => {
    if (!file || error) return;

    setIsProcessing(true);
    // Re-parse to get full data for import
    parseImportFile(
      file,
      async (data) => {
        try {
          await onImport(data);
          onClose();
        } catch (err) {
          setError('Import failed: ' + err.message);
        } finally {
          setIsProcessing(false);
        }
      },
      (errMsg) => {
        setError(errMsg);
        setIsProcessing(false);
      }
    );
  };

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-lg border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <Icon name="UploadCloud" size={48} className="mx-auto text-primary-400 mb-4" />
              <p className="text-text-primary font-medium">Click to upload CSV</p>
              <p className="text-sm text-text-secondary mt-1">or drag and drop here</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden" 
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-secondary-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={24} className="text-primary-600" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-text-primary truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-text-secondary">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setFile(null); setPreviewData([]); setError(null); }}
                  className="text-text-secondary hover:text-error-600"
                >
                  <Icon name="Trash2" size={18} />
                </button>
              </div>

              {error && (
                <div className="p-3 bg-error-50 text-error-700 text-sm rounded-lg flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {previewData.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-secondary-50 px-3 py-2 border-b border-border text-xs font-semibold text-text-secondary">
                    Preview (First 5 rows)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-surface text-text-secondary">
                        <tr>
                          {Object.keys(previewData[0]).map((head, i) => (
                            <th key={i} className="px-3 py-2 border-b border-border whitespace-nowrap">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="px-3 py-2 whitespace-nowrap text-text-primary">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-secondary-50/50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary font-medium"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button 
            onClick={handleImport}
            disabled={!file || !!error || isProcessing}
            className={`
              flex items-center space-x-2 px-6 py-2 rounded-lg font-medium shadow-sm transition-all
              ${!file || !!error || isProcessing
                ? 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-700 hover:shadow-md'
              }
            `}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <Icon name="Upload" size={18} />
                <span>Import Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
