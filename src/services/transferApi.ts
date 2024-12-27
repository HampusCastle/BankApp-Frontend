/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  categoryId?: string;
}

export interface TransferResponse {
  message: string;
  status: string;
  transactionId?: string;
}

const logError = (error: any) => {
  console.error("Error transferring funds:", error.response?.data || error.message);
};

export const transferFunds = async (transferData: TransferRequest): Promise<TransferResponse> => {
  try {
    const response = await axiosInstance.post<TransferResponse>("/transfers", transferData);
    return response.data;
  } catch (error: any) {
    logError(error);
    throw error;
  }
};