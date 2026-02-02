/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                'primary': '#1E3A8A', // Deep industrial blue - blue-800
                'primary-50': '#EFF6FF', // Very light blue - blue-50
                'primary-100': '#DBEAFE', // Light blue - blue-100
                'primary-500': '#3B82F6', // Medium blue - blue-500
                'primary-600': '#2563EB', // Darker blue - blue-600
                'primary-700': '#1D4ED8', // Dark blue - blue-700
                'primary-900': '#1E3A8A', // Deep blue - blue-900

                // Secondary Colors
                'secondary': '#64748B', // Professional slate gray - slate-500
                'secondary-50': '#F8FAFC', // Very light slate - slate-50
                'secondary-100': '#F1F5F9', // Light slate - slate-100
                'secondary-200': '#E2E8F0', // Light gray slate - slate-200
                'secondary-300': '#CBD5E1', // Medium light slate - slate-300
                'secondary-400': '#94A3B8', // Medium slate - slate-400
                'secondary-600': '#475569', // Dark slate - slate-600
                'secondary-700': '#334155', // Darker slate - slate-700
                'secondary-800': '#1E293B', // Very dark slate - slate-800
                'secondary-900': '#0F172A', // Near black slate - slate-900

                // Accent Colors
                'accent': '#F59E0B', // Warm amber - amber-500
                'accent-50': '#FFFBEB', // Very light amber - amber-50
                'accent-100': '#FEF3C7', // Light amber - amber-100
                'accent-200': '#FDE68A', // Light yellow amber - amber-200
                'accent-400': '#FBBF24', // Medium amber - amber-400
                'accent-600': '#D97706', // Dark amber - amber-600
                'accent-700': '#B45309', // Darker amber - amber-700

                // Background Colors
                'background': '#F8FAFC', // Clean off-white - slate-50
                'surface': '#FFFFFF', // Pure white - white

                // Text Colors
                'text-primary': '#0F172A', // Near-black - slate-900
                'text-secondary': '#475569', // Medium gray - slate-600

                // Status Colors
                'success': '#059669', // Confident green - emerald-600
                'success-50': '#ECFDF5', // Very light green - emerald-50
                'success-100': '#D1FAE5', // Light green - emerald-100
                'success-500': '#10B981', // Medium green - emerald-500
                'success-700': '#047857', // Dark green - emerald-700

                'warning': '#D97706', // Alert orange - amber-600
                'warning-50': '#FFFBEB', // Very light orange - amber-50
                'warning-100': '#FEF3C7', // Light orange - amber-100
                'warning-500': '#F59E0B', // Medium orange - amber-500
                'warning-700': '#B45309', // Dark orange - amber-700

                'error': '#DC2626', // Clear red - red-600
                'error-50': '#FEF2F2', // Very light red - red-50
                'error-100': '#FEE2E2', // Light red - red-100
                'error-500': '#EF4444', // Medium red - red-500
                'error-700': '#B91C1C', // Dark red - red-700

                // Border Colors
                'border': '#E2E8F0', // Light border - slate-200
                'border-light': '#F1F5F9', // Very light border - slate-100
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            },
            fontWeight: {
                'normal': '400',
                'medium': '500',
                'semibold': '600',
                'bold': '700',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '240': '60rem',
            },
            borderRadius: {
                'DEFAULT': '6px',
                'sm': '4px',
                'md': '6px',
                'lg': '8px',
                'xl': '12px',
            },
            boxShadow: {
                'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
                'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
                'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
                'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
            },
            transitionTimingFunction: {
                'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
                'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            zIndex: {
                '1000': '1000',
                '1100': '1100',
                '1200': '1200',
                '1300': '1300',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
