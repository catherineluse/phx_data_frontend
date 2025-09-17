export interface KPIData {
  total_reports: number;
  median_days_missing: number;
  pct_still_missing: number;
}

export interface MonthlyReportData {
  mon: string;
  reports: number;
  ma_6mo: number;
  ma_12mo: number;
}

export interface MonthlyReportWithAnomalyData extends MonthlyReportData {
  mean_12mo: number;
  sd_12mo: number;
  zscore_12mo: number | null;
}

export interface TimeToLocatedData {
  bucket: string;
  count: number;
  pct_of_total: number;
}

export interface DemographicsData {
  mon: string;
  [key: string]: number | string;
}