import axiosInstance from '../utils/axiosInstance';

export interface MarketTrendsRequest {
  symbol: string;
}

export interface MarketTrendsResponse {
  trend: string;
  price: string;
  changePercent: string;
}

export interface FinancialNewsResponse {
  title: string;
  description: string;
  source: string;
  url: string;
}

export const fetchMarketTrends = async (data: MarketTrendsRequest): Promise<MarketTrendsResponse> => {
  const response = await axiosInstance.post<MarketTrendsResponse>('/market-trends', data);
  return response.data;
};

export const fetchFinancialNews = async (): Promise<FinancialNewsResponse[]> => {
  const response = await axiosInstance.get<FinancialNewsResponse[]>('/news/finance');
  return response.data;
};
