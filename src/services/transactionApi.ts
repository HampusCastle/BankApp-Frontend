/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../utils/axiosInstance';

export interface TransactionHistoryRequest {
  accountId: string;
  fromDate?: string;
  toDate?: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionDetailsResponse {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  timestamp: number;
  categoryId: string;
}

export const getTransactionHistory = async (
  filters: TransactionHistoryRequest
): Promise<TransactionDetailsResponse[]> => {
  try {
    const response = await axiosInstance.get<TransactionDetailsResponse[]>('/transactions/history', {
      params: filters,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching transaction history:', error.response?.data || error.message);
    throw error;
  }
};