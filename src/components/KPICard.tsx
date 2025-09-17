import React from 'react';
import { KPIData } from '../types';

interface KPICardProps {
  data: KPIData | null;
  loading: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-red-500">Failed to load KPI data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Summary of Data Since January 2016</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {data.total_reports.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {data.median_days_missing} days
          </div>
          <div className="text-sm text-gray-600">Median Days Missing</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            {data.pct_still_missing}%
          </div>
          <div className="text-sm text-gray-600">Still Missing</div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;