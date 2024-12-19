/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/transferService.ts
import axios from 'axios';

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

const API_BASE_URL = 'http://localhost:8080'; 

export const transferFunds = async (transferData: TransferRequest, token: string): Promise<TransferResponse> => {
    try {
        const response = await axios.post<TransferResponse>(
            `${API_BASE_URL}/transfers`,
            transferData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Error transferring funds:', error.response?.data || error.message);
        throw error;
    }
};