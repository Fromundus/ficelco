import File from "./File";

export type PowerRate = {
  id: number;
  month: string;
  year: string;
  files: File[];
  rows: PowerRateRow[];
  status: string;
  created_at: string;
  updated_at: string;
} | null;

export type PowerRateRow = {
  id: number;
  monthly_rate_id: number;
  municipalities: string;
  residential: string;
  commercial: string;
  public_building: string;
  streetlight: string;
  created_at: string;
  updated_at: string;
} | null;