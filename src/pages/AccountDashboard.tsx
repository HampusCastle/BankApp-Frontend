/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  getAllAccounts,
  getAccountById,
  deleteAccount,
  addFundsToAccount,
  withdrawFundsFromAccount,
  AccountDetailsResponse,
} from '../services/accountApi';
import { transferFunds, TransferRequest } from '../services/transferApi';
import { getTransactionHistory, TransactionDetailsResponse } from '../services/transactionApi';
import CreateAccountForm from '../components/CreateAccountForm';

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState<AccountDetailsResponse[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetailsResponse | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<TransactionDetailsResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [toAccountId, setToAccountId] = useState<string>('');
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    category: '',
    minAmount: undefined,
    maxAmount: undefined,
  });

  const fetchAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch accounts.');
    }
  };

  const fetchAccountDetails = async (accountId: string) => {
    try {
      const account = await getAccountById(accountId);
      setSelectedAccount(account);
      setError(null);

      const token = localStorage.getItem('token') || '';
      const transactions = await getTransactionHistory(token, { ...filters, accountId });
      setTransactionHistory(transactions);
    } catch (err) {
      setError('Failed to fetch account details.');
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    try {
      await deleteAccount(accountId);
      setSelectedAccount(null);
      fetchAccounts();
      setError(null);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        'Failed to delete account. You cannot delete an account with positive or negative balance.';
      setError(message);
    }
  };

  const handleAddFunds = async () => {
    if (!selectedAccount || !amount || isNaN(Number(amount))) return;

    try {
      const response = await addFundsToAccount(selectedAccount.id, { amount: Number(amount) });
      alert(response.message);
      setAmount('');
      fetchAccountDetails(selectedAccount.id);
      fetchAccounts();
    } catch (err) {
      setError('Failed to add funds.');
    }
  };

  const handleWithdrawFunds = async () => {
    if (!selectedAccount || !amount || isNaN(Number(amount))) return;

    try {
      const response = await withdrawFundsFromAccount(selectedAccount.id, { amount: Number(amount) });
      alert(response.message);
      setAmount('');
      fetchAccountDetails(selectedAccount.id);
      fetchAccounts();
    } catch (err) {
      setError('Failed to withdraw funds.');
    }
  };

  const handleTransfer = async () => {
    if (!selectedAccount || !toAccountId || !amount || isNaN(Number(amount))) return;

    const transferRequest: TransferRequest = {
      fromAccountId: selectedAccount.id,
      toAccountId: toAccountId,
      amount: Number(amount),
    };

    try {
      const token = localStorage.getItem('token') || '';
      const response = await transferFunds(transferRequest, token);
      alert(response.message);
      setToAccountId('');
      setAmount('');
      fetchAccountDetails(selectedAccount.id);
      fetchAccounts();
    } catch (err) {
      setError('Failed to transfer funds.');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAccount) {
      fetchAccountDetails(selectedAccount.id);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Your Accounts</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Account Form */}
        <CreateAccountForm onSuccess={fetchAccounts} />

        {/* Account List or Detailed View */}
        <div>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {selectedAccount ? (
            /* Detailed View */
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Account Details</h2>
              <p>
                <strong>Name:</strong> {selectedAccount.name}
              </p>
              <p>
                <strong>Type:</strong> {selectedAccount.accountType}
              </p>
              <p>
                <strong>Balance:</strong> ${selectedAccount.balance}
              </p>

              {/* Add/Withdraw Funds */}
              <div className="mt-4">
                <label className="block text-gray-400 mb-2">
                  Enter amount to Add or Withdraw:
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex gap-4 mt-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
                    onClick={handleAddFunds}
                  >
                    Add Funds
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition"
                    onClick={handleWithdrawFunds}
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>

              {/* Transfer Funds */}
              <div className="mt-6">
                <label className="block text-gray-400 mb-2">
                  Enter Account ID to Transfer Funds To:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  placeholder="To Account ID"
                  value={toAccountId}
                  onChange={(e) => setToAccountId(e.target.value)}
                />
                <button
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  onClick={handleTransfer}
                >
                  Transfer Funds
                </button>
              </div>

              {/* Transaction History */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-purple-400">Transaction History</h3>

                {/* Filter Form */}
                <form onSubmit={handleSubmitFilter} className="mb-4">
                  <div className="flex space-x-4">
                    <input
                      type="date"
                      name="fromDate"
                      value={filters.fromDate}
                      onChange={handleFilterChange}
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="date"
                      name="toDate"
                      value={filters.toDate}
                      onChange={handleFilterChange}
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="text"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      placeholder="Category"
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="number"
                      name="minAmount"
                      value={filters.minAmount}
                      onChange={handleFilterChange}
                      placeholder="Min Amount"
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="number"
                      name="maxAmount"
                      value={filters.maxAmount}
                      onChange={handleFilterChange}
                      placeholder="Max Amount"
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                    >
                      Filter
                    </button>
                  </div>
                </form>

                {/* Transaction History */}
                {transactionHistory.length > 0 ? (
                  transactionHistory.map((transaction, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded mb-2">
                      <p>
                        <strong>From Account:</strong> {transaction.fromAccountId} <br />
                        <strong>To Account:</strong> {transaction.toAccountId} <br />
                        <strong>Amount:</strong> ${transaction.amount} <br />
                        <strong>Category:</strong> {transaction.categoryId} <br />
                        <strong>Date:</strong> {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No transactions found for this account.</p>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  onClick={() => handleDeleteAccount(selectedAccount.id)}
                >
                  Delete Account
                </button>
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
                  onClick={() => setSelectedAccount(null)}
                >
                  Back to Accounts
                </button>
              </div>
            </div>
          ) : (
            /* Account List */
            accounts.map((account) => (
              <div
                key={account.id}
                className="p-4 bg-gray-800 rounded flex justify-between items-center hover:bg-gray-700 transition cursor-pointer"
                onClick={() => fetchAccountDetails(account.id)}
              >
                <div>
                  <h2 className="text-xl font-semibold">{account.name}</h2>
                  <p>Type: {account.accountType}</p>
                  <p>Balance: ${account.balance}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;