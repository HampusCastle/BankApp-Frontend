import axiosInstance from '../utils/axiosInstance';

export interface CreateScheduledPaymentRequest {
  id?: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  nextPaymentDate: number;
  schedule: string;
}

export interface ScheduledPaymentResponse {
  message: string;
  paymentId?: string;
  amount?: number;
}

export const createScheduledPayment = async (
  data: CreateScheduledPaymentRequest
): Promise<ScheduledPaymentResponse> => {
  const response = await axiosInstance.post('/scheduled-payments', data);
  return response.data;
};

export const updateScheduledPayment = async (
  id: string,
  data: CreateScheduledPaymentRequest
): Promise<ScheduledPaymentResponse> => {
  const response = await axiosInstance.put(`/scheduled-payments/${id}`, data);
  return response.data;
};

export const deleteScheduledPayment = async (
  id: string
): Promise<ScheduledPaymentResponse> => {
  const response = await axiosInstance.delete(`/scheduled-payments/${id}`);
  return response.data;
};