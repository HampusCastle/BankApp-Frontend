/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../utils/axiosInstance";


export const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  };
  
  export const updateUserProfile = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.put('/users/profile', {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };