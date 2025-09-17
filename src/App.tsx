import React, { useState, useEffect } from 'react';
import { analyticsAPI } from './services/api';
import KPICard from './components/KPICard';
import MonthlyReportsChart from './components/MonthlyReportsChart';
import TimeToLocatedChart from './components/TimeToLocatedChart';
import DemographicsChart from './components/DemographicsChart';
import {
  KPIData,
  MonthlyReportWithAnomalyData,
  TimeToLocatedData,
  DemographicsData
} from './types';

function App() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyReportWithAnomalyData[] | null>(null);
  const [timeToLocatedData, setTimeToLocatedData] = useState<TimeToLocatedData[] | null>(null);
  const [misstypeData, setMisstypeData] = useState<DemographicsData[] | null>(null);
  const [sexData, setSexData] = useState<DemographicsData[] | null>(null);
  const [raceData, setRaceData] = useState<DemographicsData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          kpi,
          monthly,
          timeToLocated,
          misstype,
          sex,
          race
        ] = await Promise.all([
          analyticsAPI.getKPI(),
          analyticsAPI.getMonthlyReportsWithAnomaly(),
          analyticsAPI.getTimeToLocatedHistogram(),
          analyticsAPI.getDemographicsByMisstype(),
          analyticsAPI.getDemographicsBySex(),
          analyticsAPI.getDemographicsByRace()
        ]);

        setKpiData(kpi);
        setMonthlyData(monthly);
        setTimeToLocatedData(timeToLocated);
        setMisstypeData(misstype);
        setSexData(sex);
        setRaceData(race);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Phoenix Missing Persons Data Visualization
            </h1>
            <p className="mt-2 text-gray-600">
              Analysis of missing persons reports from Phoenix Police Department
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <KPICard data={kpiData} loading={loading} />

          <MonthlyReportsChart data={monthlyData} loading={loading} />

          <TimeToLocatedChart data={timeToLocatedData} loading={loading} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DemographicsChart
              data={misstypeData}
              loading={loading}
              title="Demographics by Missing Type"
              categories={['Adult', 'Juvenile', 'Unknown']}
              colors={['#3b82f6', '#10b981', '#6b7280']}
            />

            <DemographicsChart
              data={sexData}
              loading={loading}
              title="Demographics by Sex"
              categories={['Male', 'Female', 'Unknown']}
              colors={['#3b82f6', '#ec4899', '#6b7280']}
            />
          </div>

          <DemographicsChart
            data={raceData}
            loading={loading}
            title="Demographics by Race"
            categories={[
              'White',
              'Black',
              'Asian / Pacific Islander',
              'American Indian / Alaskan Native',
              'Unknown'
            ]}
            colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']}
          />
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Data visualization for Phoenix Police Department missing persons reports
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
