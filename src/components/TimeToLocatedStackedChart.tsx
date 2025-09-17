import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeToLocatedByDemographicData } from '../types';

interface TimeToLocatedStackedChartProps {
  data: TimeToLocatedByDemographicData[] | null;
  loading: boolean;
  title: string;
  demographicType: 'race' | 'sex' | 'misstype';
}

const TimeToLocatedStackedChart: React.FC<TimeToLocatedStackedChartProps> = ({
  data,
  loading,
  title,
  demographicType
}) => {
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
        <p className="text-red-500">Failed to load {title.toLowerCase()} data</p>
      </div>
    );
  }

  // Transform data for stacked bar chart
  const chartData: any[] = [];
  const bucketOrder = ['0-1d', '2-7d', '8-20d', '21-89d', '90+d', 'Still Missing', 'Unknown/Invalid'];

  // Group data by bucket and demographic category
  const groupedData: { [bucket: string]: { [category: string]: number } } = {};
  const allCategories = new Set<string>();

  data.forEach(item => {
    const bucket = item.bucket;
    const categoryKey = demographicType === 'race' ? 'race_category' :
                       demographicType === 'sex' ? 'sex_category' : 'misstype_category';
    const category = item[categoryKey] || 'Unknown';
    const count = typeof item.count === 'string' ? parseInt(item.count, 10) : item.count;

    if (!groupedData[bucket]) {
      groupedData[bucket] = {};
    }
    groupedData[bucket][category] = (groupedData[bucket][category] || 0) + count;
    allCategories.add(category);
  });

  // Convert to chart format
  bucketOrder.forEach(bucket => {
    if (groupedData[bucket]) {
      const bucketData: any = { bucket };
      Array.from(allCategories).forEach(category => {
        bucketData[category] = groupedData[bucket][category] || 0;
      });
      chartData.push(bucketData);
    }
  });

  // Color palette for different demographics
  const getColorPalette = (type: string) => {
    switch (type) {
      case 'race':
        return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];
      case 'sex':
        return ['#3b82f6', '#ec4899', '#6b7280'];
      case 'misstype':
        return ['#3b82f6', '#10b981', '#6b7280'];
      default:
        return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];
    }
  };

  const colors = getColorPalette(demographicType);
  const categories = Array.from(allCategories);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
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
                value.toLocaleString(),
                name
              ]}
              labelFormatter={(label: string) => formatBucketLabel(label)}
            />
            <Legend />
            {categories.map((category, index) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="1"
                fill={colors[index % colors.length]}
                name={category}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        * Shows demographic breakdown within each time-to-located category.
        Each bar represents the total for that time period, divided by demographic group.
        <br />
        * Still Missing: Person not yet found (no located date but valid last seen date)
        <br />
        * Unknown/Invalid: Cases where last seen date is missing or located date is before last seen date
      </p>
    </div>
  );
};

export default TimeToLocatedStackedChart;