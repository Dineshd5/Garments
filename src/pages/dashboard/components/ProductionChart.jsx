import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from 'components/AppIcon';

const ProductionChart = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const productionData = [
    {
      date: 'Jan 06',
      planned: 2800,
      actual: 2650,
      efficiency: 94.6
    },
    {
      date: 'Jan 07',
      planned: 3000,
      actual: 2950,
      efficiency: 98.3
    },
    {
      date: 'Jan 08',
      planned: 2900,
      actual: 2847,
      efficiency: 98.2
    },
    {
      date: 'Jan 09',
      planned: 3100,
      actual: 3050,
      efficiency: 98.4
    },
    {
      date: 'Jan 10',
      planned: 2800,
      actual: 2720,
      efficiency: 97.1
    },
    {
      date: 'Jan 11',
      planned: 3200,
      actual: 3180,
      efficiency: 99.4
    },
    {
      date: 'Jan 12',
      planned: 2950,
      actual: 2900,
      efficiency: 98.3
    }
  ];

  const timeRanges = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary">{entry.dataKey}:</span>
              <span className="font-medium text-text-primary">
                {entry.value.toLocaleString()} units
              </span>
            </div>
          ))}
          {payload[0] && (
            <div className="mt-2 pt-2 border-t border-border-light">
              <span className="text-xs text-text-secondary">
                Efficiency: {payload[0].payload.efficiency}%
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Daily Production Trends</h2>
          <p className="text-sm text-text-secondary">Planned vs Actual Production Output</p>
        </div>
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                timeRange === range.value
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full" aria-label="Daily Production Trends Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={productionData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: '#64748B' }}
            />
            <Bar 
              dataKey="planned" 
              fill="#CBD5E1" 
              name="Planned"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="actual" 
              fill="#1E3A8A" 
              name="Actual"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Target" size={14} className="text-primary-600" />
            <span className="text-xs text-text-secondary">Avg Efficiency</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">97.6%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="TrendingUp" size={14} className="text-success-600" />
            <span className="text-xs text-text-secondary">Best Day</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">99.4%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Calendar" size={14} className="text-accent-600" />
            <span className="text-xs text-text-secondary">Total Units</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">20.3k</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;
