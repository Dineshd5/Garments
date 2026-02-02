import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a PDF report from data.
 * @param {string} title - The title of the report.
 * @param {Array} columns - Array of column definitions (header, dataKey).
 * @param {Array} data - Array of data objects.
 * @param {string} filename - Output filename (without extension).
 */
export const generatePDFReport = (title, columns, data, filename) => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Add Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);

    // Add Table
    doc.autoTable({
        startY: 40,
        head: [columns.map(col => col.header)],
        body: data.map(row => columns.map(col => {
            // Handle nested properties or simple keys
            const val = typeof col.dataKey === 'function' ? col.dataKey(row) : row[col.dataKey];
            return val === undefined || val === null ? '' : String(val);
        })),
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Primary color
        styles: { fontSize: 8, cellPadding: 2 }
    });

    // Save PDF
    doc.save(`${filename}.pdf`);
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};
