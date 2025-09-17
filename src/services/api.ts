import axios from 'axios';
import { KPIData, MonthlyReportData, MonthlyReportWithAnomalyData, TimeToLocatedData, DemographicsData } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const analyticsAPI = {
  getKPI: (): Promise<KPIData> =>
    api.get('/analytics/kpi').then(res => res.data),

  getMonthlyReports: (): Promise<MonthlyReportData[]> =>
    api.get('/analytics/monthly-reports').then(res => res.data),

  getMonthlyReportsWithAnomaly: (): Promise<MonthlyReportWithAnomalyData[]> =>
    api.get('/analytics/monthly-reports-with-anomaly').then(res => res.data),

  getTimeToLocatedHistogram: (): Promise<TimeToLocatedData[]> =>
    api.get('/analytics/time-to-located-histogram').then(res => res.data),

  getDemographicsByMisstype: (): Promise<DemographicsData[]> =>
    api.get('/analytics/demographics/misstype').then(res => res.data),

  getDemographicsBySex: (): Promise<DemographicsData[]> =>
    api.get('/analytics/demographics/sex').then(res => res.data),

  getDemographicsByRace: (): Promise<DemographicsData[]> =>
    api.get('/analytics/demographics/race').then(res => res.data),
};