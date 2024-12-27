import { useState, useEffect } from "react";
import {
  createRecurringPayment,
  updateRecurringPayment,
  RecurringPaymentResponse,
} from "../services/recurringPaymentApi";
import BackButton from "./BackButton";

interface RecurringPaymentFormProps {
  onSuccess: (newPayment: RecurringPaymentResponse) => void;
  paymentToEdit?: RecurringPaymentResponse | null;
}

const RecurringPaymentForm = ({ onSuccess, paymentToEdit }: RecurringPaymentFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [fromAccountId, setFromAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [interval, setInterval] = useState<string>("monthly");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (paymentToEdit) {
      setAmount(paymentToEdit.amount);
      setFromAccountId(paymentToEdit.fromAccountId);
      setToAccountId(paymentToEdit.toAccountId);
      setInterval(paymentToEdit.interval);
    }
  }, [paymentToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (paymentToEdit) {
        const updatedPayment = await updateRecurringPayment(paymentToEdit.id, {
          amount,
          fromAccountId,
          toAccountId,
          interval,
        });
        onSuccess(updatedPayment);
      } else {
        const newPayment = await createRecurringPayment({
          amount,
          fromAccountId,
          toAccountId,
          interval,
        });
        onSuccess(newPayment);
      }
    } catch {
      setError("Failed to create/update recurring payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
      <BackButton />
      <h2 className="text-xl text-purple-400 mb-4">
        {paymentToEdit ? "Edit Recurring Payment" : "Create Recurring Payment"}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-400">Amount</label>
        <input
          type="number"
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
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Interval</label>
        <select
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
        {paymentToEdit ? "Update Recurring Payment" : "Create Recurring Payment"}
      </button>
    </form>
  );
};

export default RecurringPaymentForm;