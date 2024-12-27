import axiosInstance from "../utils/axiosInstance";

export const getMonthlyExpensesForAllAccounts = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/budget-reports/expenses/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching monthly expenses:", error);
    throw error; 
  }
};