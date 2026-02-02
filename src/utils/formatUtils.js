
/**
 * Format a number as currency (INR).
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted currency string.
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Format a date string.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};
