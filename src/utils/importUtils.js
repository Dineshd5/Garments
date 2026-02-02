import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Parse a file (CSV or Excel) and return the data as an array of objects.
 * @param {File} file - The file to parse.
 * @param {Function} onComplete - Callback function called when parsing is complete.
 * @param {Function} onError - Callback function called when an error occurs.
 */
export const parseImportFile = (file, onComplete, onError) => {
    if (!file) {
        if (onError) onError('No file provided');
        return;
    }

    const fileExt = file.name.split('.').pop().toLowerCase();

    if (fileExt === 'csv') {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors && results.errors.length > 0) {
                    console.error('CSV Parsing Errors:', results.errors);
                    if (onError) onError(`Error parsing CSV: ${results.errors[0].message}`);
                } else {
                    onComplete(results.data);
                }
            },
            error: (error) => {
                console.error('CSV File Error:', error);
                if (onError) onError(`File reading error: ${error.message}`);
            }
        });
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" }); // defval to handle empty cells if needed
                onComplete(jsonData);
            } catch (err) {
                console.error('Excel Parsing Error:', err);
                if (onError) onError(`Error parsing Excel: ${err.message}`);
            }
        };
        reader.onerror = (err) => {
            if (onError) onError(`File reading error: ${err.message}`);
        };
        reader.readAsArrayBuffer(file);
    } else {
        if (onError) onError('Unsupported file type. Please upload .csv, .xlsx, or .xls');
    }
};


/**
 * Validate imported data against a schema.
 * @param {Array} data - The array of objects to validate.
 * @param {Array} requiredFields - List of field names that must be present.
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateImportData = (data, requiredFields) => {
    if (!data || data.length === 0) {
        return { valid: false, message: 'Imported file contains no data.' };
    }

    // Check headers in the first row
    const firstRow = data[0];
    const missingFields = requiredFields.filter(field => !Object.prototype.hasOwnProperty.call(firstRow, field));

    if (missingFields.length > 0) {
        return {
            valid: false,
            message: `Missing required columns: ${missingFields.join(', ')}. Please check your CSV format.`
        };
    }

    return { valid: true, message: 'Data validation successful.' };
};
