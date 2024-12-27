import axiosInstance from '../utils/axiosInstance';

export interface Notification {
  id: string;
  message: string;
  timestamp: number;
  type: string;
  read: boolean;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get<Notification[]>('/notifications');
  return response.data;
};