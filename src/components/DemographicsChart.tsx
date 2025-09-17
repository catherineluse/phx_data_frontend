import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DemographicsData } from '../types';

interface DemographicsChartProps {
  data: DemographicsData[] | null;
  loading: boolean;
  title: string;
  categories: string[];
  colors: string[];
}

const DemographicsChart: React.FC<DemographicsChartProps> = ({
  data,
  loading,
  title,
  categories,
  colors
}) => {
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
        <p className="text-red-500">Failed to load {title.toLowerCase()} data</p>
      </div>
    );
  }

  const chartData = data.map(item => {
    const transformed: any = {
      date: new Date(item.mon).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }),
      tooltipDate: new Date(item.mon).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    // Convert all non-date fields to numbers and map category names to keys
    Object.keys(item).forEach(key => {
      if (key !== 'mon') {
        const value = item[key];
        const numericValue = typeof value === 'string' ? parseInt(value, 10) : Number(value);

        // Keep the original key (works for race data with exact matches)
        transformed[key] = numericValue;

        // Also create lowercase versions for misstype/sex data compatibility
        const lowerKey = key.toLowerCase();
        transformed[lowerKey] = numericValue;
      }
    });

    return transformed;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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
                  return `Date: ${payload[0].payload.tooltipDate}`;
                }
                return `Date: ${value}`;
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name
              ]}
            />
            <Legend />
            {categories.map((category, index) => {
              // Try original category name first, then lowercase version
              const dataKey = chartData.length > 0 && chartData[0][category] !== undefined
                ? category
                : category.toLowerCase();

              return (
                <Area
                  key={category}
                  type="monotone"
                  dataKey={dataKey}
                  stackId="1"
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.6}
                  name={category}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DemographicsChart;