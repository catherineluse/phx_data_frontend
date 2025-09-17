import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NCICACICData } from '../types';

interface NCICACICChartProps {
  data: NCICACICData[] | null;
  loading: boolean;
}

const NCICACICChart: React.FC<NCICACICChartProps> = ({ data, loading }) => {
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
        <p className="text-red-500">Failed to load NCIC/ACIC status data</p>
      </div>
    );
  }

  // Transform data for stacked bar chart
  const chartData = data.map(item => ({
    category: item.category,
    Yes: typeof item.yes_count === 'string' ? parseInt(item.yes_count, 10) : item.yes_count,
    No: typeof item.no_count === 'string' ? parseInt(item.no_count, 10) : item.no_count,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">NCIC/ACIC Status Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name
              ]}
            />
            <Legend />
            <Bar dataKey="Yes" fill="#10b981" name="Yes" />
            <Bar dataKey="No" fill="#ef4444" name="No" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <h3 className="font-semibold text-gray-800">System Definitions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>NCIC (National Crime Information Center):</strong> A computerized database maintained by the FBI that provides law enforcement agencies with access to criminal justice information including missing persons records.</p>
          </div>
          <div>
            <p><strong>ACIC (Arizona Crime Information Center):</strong> Arizona's state-level criminal justice information system that interfaces with NCIC and provides local law enforcement with access to state and national criminal justice data.</p>
          </div>
        </div>
        <div className="mt-3">
          <p><strong>Entered:</strong> Case information has been input into the respective database system.</p>
          <p><strong>Cleared:</strong> Case has been resolved or closed in the respective database system.</p>
        </div>
      </div>
    </div>
  );
};

export default NCICACICChart;