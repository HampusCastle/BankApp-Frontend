import axiosInstance from '../utils/axiosInstance';

export const postActivityLog = async (userId: string, action: string, details: string) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:8080/activity-logs/log',
      { userId, action, details }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting activity log', error);
    throw error;
  }
};

export const getActivityLogs = async () => {
  try {
    const response = await axiosInstance.get('http://localhost:8080/activity-logs/my-logs');
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs', error);
    throw error;
  }
};

export const getActivityLogsForUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/activity-logs/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs for user', error);
    throw error;
  }
};