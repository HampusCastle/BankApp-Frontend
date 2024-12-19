/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from './axiosInstance';

export interface CreateRecurringPaymentRequest {
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  interval: string;
  token: string;
}

export interface RecurringPaymentResponse {
  id: string;
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  status: string;
  nextPaymentDate: string;
}

export const createRecurringPayment = async (
  data: CreateRecurringPaymentRequest
): Promise<RecurringPaymentResponse> => {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.post<RecurringPaymentResponse>('/recurring-payments', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw new Error("Failed to create recurring payment");
  }
};

export const getRecurringPayments = async (userId: string): Promise<RecurringPaymentResponse[]> => {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.get<RecurringPaymentResponse[]>(`/recurring-payments/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetching recurring payments for URL: /recurring-payments/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching recurring payments:", err);
    throw err;
  }
};