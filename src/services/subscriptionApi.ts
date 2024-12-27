/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../utils/axiosInstance";

export interface CreateSubscriptionRequest {
  amount: number;
  serviceName: string;
  interval: string;
  fromAccountId: string;
  toAccountId: string;
}

export interface SubscriptionResponse {
  id: string;
  userId: string;
  amount: number;
  serviceName: string;
  interval: string;
  status: string;
  categoryId: string;
  nextPaymentDate: number;
  fromAccountId: string;
  toAccountId: string;
}

export const createSubscription = async (
  data: CreateSubscriptionRequest
): Promise<SubscriptionResponse> => {
  try {
    const response = await axiosInstance.post<SubscriptionResponse>("/subscriptions", data);
    return response.data;
  } catch (err) {
    throw new Error("Failed to create subscription");
  }
};

export const getSubscriptions = async (
  status: string
): Promise<SubscriptionResponse[]> => {
  try {
    const response = await axiosInstance.get<SubscriptionResponse[]>(`/subscriptions/${status}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch subscriptions");
  }
};

export const deleteSubscription = async (id: string) => {
  try {
    await axiosInstance.delete(`/subscriptions/${id}`);
  } catch (err) {
    throw new Error("Failed to delete subscription");
  }
};