import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyReportWithAnomalyData } from '../types';

interface MonthlyReportsChartProps {
  data: MonthlyReportWithAnomalyData[] | null;
  loading: boolean;
}

const MonthlyReportsChart: React.FC<MonthlyReportsChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-red-500">Failed to load monthly reports data</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    ...item,
    date: new Date(item.mon).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }),
    tooltipDate: new Date(item.mon).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Reports with Anomaly Detection</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value, payload) => {
                if (payload && payload[0] && payload[0].payload) {
                  return `Month: ${payload[0].payload.tooltipDate}`;
                }
                return `Month: ${value}`;
              }}
              formatter={(value: number, name: string) => [
                `${value} reports`,
                name === 'reports' ? 'Reports' : name
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Reports"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyReportsChart;