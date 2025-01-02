/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '../utils/axiosInstance';

export interface CreateRecurringPaymentRequest {
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  interval: string;
}

export interface RecurringPaymentResponse {
  id: string;
  userId: string;
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  interval: string;
  status: string;
  nextPaymentDate: string;
}

export const createRecurringPayment = async (
  data: CreateRecurringPaymentRequest
): Promise<RecurringPaymentResponse> => {
  try {
    const response = await axiosInstance.post<RecurringPaymentResponse>('/recurring-payments', data);
    return response.data;
  } catch (err) {
    throw new Error("Failed to create recurring payment");
  }
};

export const getRecurringPayments = async (): Promise<RecurringPaymentResponse[]> => {
  try {
    const response = await axiosInstance.get<RecurringPaymentResponse[]>(`/recurring-payments`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch recurring payments:", err);
    throw new Error("Failed to fetch recurring payments");
  }
};

export const deleteRecurringPayment = async (id: string) => {
  try {
    await axiosInstance.delete(`/recurring-payments/${id}`);
  } catch (err) {
    throw new Error("Failed to delete recurring payment");
  }
};

export const updateRecurringPayment = async (
  id: string,
  data: any
): Promise<RecurringPaymentResponse> => {
  try {
    const response = await axiosInstance.put<RecurringPaymentResponse>(`/recurring-payments/${id}`, data);
    return response.data;
  } catch (err) {
    throw new Error("Failed to update recurring payment");
  }
};