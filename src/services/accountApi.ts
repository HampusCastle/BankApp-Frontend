import axiosInstance from '../utils/axiosInstance';

export interface CreateAccountRequest {
  name: string;
  accountType: string;
  balance: number;
}

export interface AccountDetailsResponse {
  id: string;
  name: string;
  balance: number;
  accountType: string;
  userId: string;
}

export interface AddOrWithdrawFundsRequest {
  amount: number;
}

export interface AccountUpdatedResponse {
  id: string;
  name: string;
  balance: number;
  message: string;
}

export const createAccount = async (data: CreateAccountRequest): Promise<AccountDetailsResponse> => {
  const response = await axiosInstance.post<AccountDetailsResponse>('/accounts/create', data);
  return response.data;
};

export const getAllAccounts = async (): Promise<AccountDetailsResponse[]> => {
  const response = await axiosInstance.get<AccountDetailsResponse[]>('/accounts/my-accounts');
  return response.data;
};

export const getAccountById = async (accountId: string): Promise<AccountDetailsResponse> => {
  const response = await axiosInstance.get<AccountDetailsResponse>(`/accounts/${accountId}`);
  return response.data;
};

export const getAccountBalance = async (accountId: string): Promise<number> => {
  const response = await axiosInstance.get<number>(`/accounts/${accountId}/balance`);
  return response.data;
};

export const withdrawFundsFromAccount = async (
  accountId: string,
  request: AddOrWithdrawFundsRequest
): Promise<AccountUpdatedResponse> => {
  const response = await axiosInstance.post<AccountUpdatedResponse>(
    `/accounts/${accountId}/withdraw`,
    request
  );
  return response.data;
};

export const addFundsToAccount = async (
  accountId: string,
  request: AddOrWithdrawFundsRequest
): Promise<AccountUpdatedResponse> => {
  const response = await axiosInstance.post<AccountUpdatedResponse>(
    `/accounts/${accountId}/add-funds`,
    request
  );
  return response.data;
};

export const deleteAccount = async (accountId: string): Promise<void> => {
  await axiosInstance.delete(`/accounts/${accountId}`);
};