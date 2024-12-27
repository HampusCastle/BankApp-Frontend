import { useState, useEffect } from "react";
import { CreateSubscriptionRequest } from "../services/subscriptionApi";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubscriptionRequest) => void;
}

function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
}: SubscriptionModalProps) {
  const [formData, setFormData] = useState<CreateSubscriptionRequest>({
    amount: 0,
    serviceName: "",
    interval: "monthly",
    fromAccountId: "",
    toAccountId: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        amount: 0,
        serviceName: "",
        interval: "monthly",
        fromAccountId: "",
        toAccountId: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkBg p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-primary">Add Subscription</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
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
          <select
            name="interval"
            value={formData.interval}
            onChange={handleChange}
            className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Subscription
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionModal;
