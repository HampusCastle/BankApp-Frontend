/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { getTransactionHistory, TransactionHistoryRequest, TransactionDetailsResponse } from '../services/transactionApi';
import { extractUserDetails } from '../utils/jwtUtil';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionDetailsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionHistoryRequest>({
    fromDate: "",
    toDate: "",
    category: "",
    accountId: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
    },
    []
  );

  const fetchTransactionHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('Token is missing');
        return;
      }

      const data = await getTransactionHistory(token, filters);
      setTransactions(data);
    } catch (error) {
      setError('Error fetching transaction history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const userDetails = extractUserDetails(token);
      if (userDetails) {
        setFilters(prevFilters => ({
          ...prevFilters,
          accountId: userDetails.accountId,
        }));

        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() - 1); // 1 month before

        const endDate = new Date(currentDate);
        endDate.setMonth(currentDate.getMonth() + 1); // 1 month after

        setFilters(prevFilters => ({
          ...prevFilters,
          fromDate: startDate.toISOString().split('T')[0],
          toDate: endDate.toISOString().split('T')[0],
        }));

        fetchTransactionHistory();
      }
    }
  }, []);

  useEffect(() => {
    if (filters.accountId) {
      fetchTransactionHistory();
    }
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTransactionHistory();
  };

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="DEPOSITED_FUNDS">Deposited Funds</option>
            <option value="WITHDRAWN_FUNDS">Withdrawn Funds</option>
            <option value="SENT_MONEY">Sent Money</option>
            <option value="RECEIVED_MONEY">Received Money</option>
            <option value="FUNDS_TRANSFER">Funds Transfer</option>
            <option value="SUBSCRIPTION_PAYMENTS">Subscription Payments</option>
            <option value="AUTOMATIC_PAYMENTS">Automatic Payments</option>
            <option value="SAVINGS_CONTRIBUTION">Savings Contribution</option>
            <option value="MISC_TRANSACTIONS">Miscellaneous Transactions</option>
          </select>
        </div>
        <button type="submit" className="filter-button">Filter Transactions</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li key={index}>
            <strong>From Account:</strong> {transaction.fromAccountId} <br />
            <strong>To Account:</strong> {transaction.toAccountId} <br />
            <strong>Amount:</strong> {transaction.amount} <br />
            <strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()} <br />
            <strong>Category:</strong> {transaction.categoryId.replace(/_/g, ' ').toLowerCase()} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;