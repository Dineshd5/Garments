import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import Icon from 'components/AppIcon';

const CapacityChart = () => {
  const [chartType, setChartType] = useState('line');

  const capacityData = [
    {
      time: '06:00',
      capacity: 85,
      utilization: 78,
      efficiency: 91.8
    },
    {
      time: '08:00',
      capacity: 90,
      utilization: 88,
      efficiency: 97.8
    },
    {
      time: '10:00',
      capacity: 95,
      utilization: 92,
      efficiency: 96.8
    },
    {
      time: '12:00',
      capacity: 88,
      utilization: 85,
      efficiency: 96.6
    },
    {
      time: '14:00',
      capacity: 92,
      utilization: 89,
      efficiency: 96.7
    },
    {
      time: '16:00',
      capacity: 87,
      utilization: 84,
      efficiency: 96.6
    },
    {
      time: '18:00',
      capacity: 82,
      utilization: 79,
      efficiency: 96.3
    }
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
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Capacity Utilization</h2>
          <p className="text-sm text-text-secondary">Real-time production capacity and efficiency</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-md transition-colors duration-150 ${
              chartType === 'line' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
            title="Line Chart"
          >
            <Icon name="TrendingUp" size={16} />
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`p-2 rounded-md transition-colors duration-150 ${
              chartType === 'area' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
            title="Area Chart"
          >
            <Icon name="BarChart3" size={16} />
          </button>
        </div>
      </div>

      <div className="h-64 w-full" aria-label="Capacity Utilization Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={capacityData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: '#64748B' }}
              />
              <Line 
                type="monotone" 
                dataKey="capacity" 
                stroke="#1E3A8A" 
                strokeWidth={3}
                dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
                name="Capacity"
              />
              <Line 
                type="monotone" 
                dataKey="utilization" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="Utilization"
              />
            </LineChart>
          ) : (
            <AreaChart
              data={capacityData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: '#64748B' }}
              />
              <Area 
                type="monotone" 
                dataKey="capacity" 
                stackId="1"
                stroke="#1E3A8A" 
                fill="#1E3A8A"
                fillOpacity={0.3}
                name="Capacity"
              />
              <Area 
                type="monotone" 
                dataKey="utilization" 
                stackId="2"
                stroke="#F59E0B" 
                fill="#F59E0B"
                fillOpacity={0.3}
                name="Utilization"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Gauge" size={14} className="text-primary-600" />
            <span className="text-xs text-text-secondary">Current Capacity</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">87%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Activity" size={14} className="text-accent-600" />
            <span className="text-xs text-text-secondary">Utilization</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">84%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Zap" size={14} className="text-success-600" />
            <span className="text-xs text-text-secondary">Efficiency</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">96.6%</p>
        </div>
      </div>
    </div>
  );
};

export default CapacityChart;
