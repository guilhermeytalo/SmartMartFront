export interface ProductData {
  product_id: string | number;
  total_profit: number;
  [key: string]: unknown;
}

export interface ChartDataItem {
  product_id: string | number;
  profit: number;
  fill: string;
  label: string;
}

export interface MonthlyData {
  month: string;
  quantity: number;
  profit: number;
}