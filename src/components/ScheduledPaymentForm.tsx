import { useState, useEffect } from "react";
import { CreateScheduledPaymentRequest } from "../services/scheduledPaymentApi";

interface ScheduledPaymentFormProps {
  onSubmit: (data: CreateScheduledPaymentRequest) => void;
  paymentToEdit?: CreateScheduledPaymentRequest;
}

const ScheduledPaymentForm = ({ onSubmit, paymentToEdit }: ScheduledPaymentFormProps) => {
  const [formData, setFormData] = useState<CreateScheduledPaymentRequest>({
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    nextPaymentDate: Date.now(),
    schedule: "daily",
  });

  useEffect(() => {
    if (paymentToEdit) {
      setFormData({
        id: paymentToEdit.id || "",
        fromAccountId: paymentToEdit.fromAccountId || "",
        toAccountId: paymentToEdit.toAccountId || "",
        amount: paymentToEdit.amount || 0,
        nextPaymentDate: paymentToEdit.nextPaymentDate || Date.now(),
        schedule: paymentToEdit.schedule || "daily",
      });
    }
  }, [paymentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? parseFloat(value) || 0
          : name === "nextPaymentDate"
          ? new Date(value).getTime()
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fromAccountId: "",
      toAccountId: "",
      amount: 0,
      nextPaymentDate: Date.now(),
      schedule: "daily",
    });
  };

  const getFormattedDateTime = (timestamp: number) => {
    if (!timestamp || isNaN(timestamp)) return "";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded mb-6">
      <h2 className="text-2xl font-bold mb-4">Add or Edit Payment</h2>
      <input
        type="text"
        name="fromAccountId"
        value={formData.fromAccountId}
        onChange={handleChange}
        placeholder="From Account ID"
        required
        className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <input
        type="text"
        name="toAccountId"
        value={formData.toAccountId}
        onChange={handleChange}
        placeholder="To Account ID"
        required
        className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <input
        type="datetime-local"
        name="nextPaymentDate"
        value={getFormattedDateTime(formData.nextPaymentDate)}
        onChange={handleChange}
        required
        className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <select
        name="schedule"
        value={formData.schedule}
        onChange={handleChange}
        className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ScheduledPaymentForm;