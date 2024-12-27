import { useState, useEffect } from "react";
import { CreateScheduledPaymentRequest } from "../services/scheduledPaymentApi";

interface ScheduledPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateScheduledPaymentRequest) => void;
  initialData?: CreateScheduledPaymentRequest;
  isEditing?: boolean;
}

function ScheduledPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    nextPaymentDate: 0,
    schedule: "daily",
  },
  isEditing = false,
}: ScheduledPaymentModalProps) {
  const [formData, setFormData] = useState<CreateScheduledPaymentRequest>({
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    nextPaymentDate: 0, 
    schedule: "daily",
  });

  useEffect(() => {
    if (isOpen && initialData && formData.id !== initialData.id) {
      setFormData(initialData);  
    }
  }, [isOpen, initialData, formData.id]);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      nextPaymentDate: new Date(formData.nextPaymentDate).getTime(),  
    };
    onSubmit(updatedFormData);
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
        <h2 className="text-2xl font-bold mb-4 text-primary">
          {isEditing ? "Edit Scheduled Payment" : "Add Scheduled Payment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fromAccountId"
            value={formData.fromAccountId}
            onChange={handleChange}
            placeholder="From Account ID"
            required
            className="w-full mb-4 p-2 bg-darkBg text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="toAccountId"
            value={formData.toAccountId}
            onChange={handleChange}
            placeholder="To Account ID"
            required
            className="w-full mb-4 p-2 bg-darkBg text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="w-full mb-4 p-2 bg-darkBg text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="datetime-local"
            name="nextPaymentDate"
            value={formData.nextPaymentDate ? new Date(formData.nextPaymentDate).toISOString().slice(0, 16) : ""}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 bg-darkBg text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="w-full mb-4 p-2 bg-darkBg text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isEditing ? "Update Payment" : "Create Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScheduledPaymentModal;