import { SavingsGoal } from "../types/SavingsGoal";
import axiosInstance from "../utils/axiosInstance";

export interface CreateSavingsGoalRequest {
  name: string;
  targetAmount: number;
  targetDate: string;
}

export const createSavingsGoal = async (data: CreateSavingsGoalRequest) => {
  const response = await axiosInstance.post('/savings-goals', data);
  return response.data;
};

export const getSavingsGoalsByUser = async (userId: string) => {
  const response = await axiosInstance.get(`/savings-goals/user/${userId}`);
  return response.data || [];
};

export const getSavingsGoalById = async (id: string) => {
  const response = await axiosInstance.get(`/savings-goals/${id}`);
  return response.data;
};

export const updateSavingsGoal = async (id: string, data: Partial<SavingsGoal>) => {
  const response = await axiosInstance.patch(`/savings-goals/${id}`, data);
  return response.data;
};

export const deleteSavingsGoal = async (id: string) => {
  await axiosInstance.delete(`/savings-goals/${id}`);
};