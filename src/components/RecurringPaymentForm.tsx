/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { createRecurringPayment, RecurringPaymentResponse } from "../services/recurringPaymentApi";

interface RecurringPaymentFormProps {
  onSuccess: (newPayment: RecurringPaymentResponse) => void;
}

const RecurringPaymentForm: React.FC<RecurringPaymentFormProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState(0);
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [interval, setInterval] = useState("monthly");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const newPayment = await createRecurringPayment({
        amount,
        fromAccountId,
        toAccountId,
        interval,
        token,
      });

      onSuccess(newPayment);
    } catch (err) {
      setError("Failed to create recurring payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl text-purple-400 mb-4">Create Recurring Payment</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-400">Amount</label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">From Account ID</label>
        <input
          type="text"
          name="fromAccountId"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">To Account ID</label>
        <input
          type="text"
          name="toAccountId"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">Interval</label>
        <select
          name="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-purple-500 py-2 rounded hover:bg-purple-400">
        Create Recurring Payment
      </button>
    </form>
  );
};

export default RecurringPaymentForm;