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
    isAnomaly: Math.abs(item.zscore_12mo || 0) >= 2
  }));

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isAnomaly) {
      return <circle cx={cx} cy={cy} r={4} fill="#ef4444" stroke="#ef4444" strokeWidth={2} />;
    }
    return null;
  };

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
              labelFormatter={(value) => `Date: ${value}`}
              formatter={(value: number, name: string) => [
                value,
                name === 'reports' ? 'Reports' :
                name === 'mean_12mo' ? '12-mo Average' :
                name === 'zscore_12mo' ? 'Z-Score' : name
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="#2563eb"
              strokeWidth={2}
              dot={<CustomDot />}
              name="Reports"
            />
            <Line
              type="monotone"
              dataKey="mean_12mo"
              stroke="#16a34a"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="12-mo Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Red dots indicate anomalies (Z-score ≥ 2 or ≤ -2)
      </p>
    </div>
  );
};

export default MonthlyReportsChart;