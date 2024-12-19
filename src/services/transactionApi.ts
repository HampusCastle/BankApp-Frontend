/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axiosInstance';

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
  token: string,
  filters: TransactionHistoryRequest
): Promise<TransactionDetailsResponse[]> => {
  try {
    const response = await axiosInstance.get<TransactionDetailsResponse[]>('/transactions/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching transaction history:', error.response?.data || error.message);
    throw error;
  }
};