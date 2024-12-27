import React, { useState } from "react";
import { createSubscription, SubscriptionResponse, CreateSubscriptionRequest } from "../services/subscriptionApi";

interface SubscriptionFormProps {
  onSuccess: (newSubscription: SubscriptionResponse) => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CreateSubscriptionRequest>({
    amount: 0,
    serviceName: "",
    interval: "monthly",
    fromAccountId: "",
    toAccountId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSubscription = await createSubscription(formData);
      onSuccess(newSubscription); 
    } catch (err) {
      console.error("Error creating subscription:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl text-purple-400 mb-4">Create Subscription</h2>

      <input
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
        type="text"
        name="serviceName"
        placeholder="Service Name"
        value={formData.serviceName}
        onChange={handleChange}
      />
      <input
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
        type="text"
        name="fromAccountId"
        placeholder="From Account ID"
        value={formData.fromAccountId}
        onChange={handleChange}
      />
      <input
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
        type="text"
        name="toAccountId"
        placeholder="To Account ID"
        value={formData.toAccountId}
        onChange={handleChange}
      />
      <select
        name="interval"
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
        value={formData.interval}
        onChange={handleChange}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button
        type="submit"
        className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-400"
      >
        Create Subscription
      </button>
    </form>
  );
};

export default SubscriptionForm;