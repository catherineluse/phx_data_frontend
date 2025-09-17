import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TimeToLocatedData } from '../types';

interface TimeToLocatedChartProps {
  data: TimeToLocatedData[] | null;
  loading: boolean;
}

const TimeToLocatedChart: React.FC<TimeToLocatedChartProps> = ({ data, loading }) => {
  const formatBucketLabel = (bucket: string) => {
    switch (bucket) {
      case '0-1d': return '0 to 1 day';
      case '2-7d': return '2 to 7 days';
      case '8-20d': return '8 to 20 days';
      case '21-89d': return '21 to 89 days';
      case '90+d': return '90+ days';
      case 'Still Missing': return 'Still Missing';
      case 'Unknown/Invalid': return 'Unknown/Invalid';
      default: return bucket;
    }
  };

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
        <p className="text-red-500">Failed to load time to located data</p>
      </div>
    );
  }

  const getBarColor = (bucket: string) => {
    switch (bucket) {
      case '0-1d': return '#10b981';
      case '2-7d': return '#3b82f6';
      case '8-20d': return '#f59e0b';
      case '21-89d': return '#f97316';
      case '90+d': return '#ef4444';
      case 'Still Missing': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Time to Located Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bucket"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis  />
            <Tooltip
              formatter={(value: number, name: string) => [
                name === 'count' ? value.toLocaleString() : `${value}%`,
                name === 'count' ? 'Count' : 'Percentage'
              ]}
              labelFormatter={(label: string) => formatBucketLabel(label)}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.bucket)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item) => (
          <div key={item.bucket} className="flex items-center">
            <span className="font-medium">{item.bucket}:</span>
            <span className="ml-2">{item.count.toLocaleString()} ({item.pct_of_total}%)</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        * Still Missing: Person not yet found (no located date but valid last seen date)
        <br />
        * Unknown/Invalid: Cases where last seen date is missing or located date is before last seen date
      </p>
    </div>
  );
};

export default TimeToLocatedChart;