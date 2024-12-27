import { useState, useEffect } from "react";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number; 
}

interface SavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: SavingsGoal) => void;
  initialData: SavingsGoal;
  isEditing: boolean;
}

const SavingsGoalModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: SavingsGoalModalProps) => {
  const [formData, setFormData] = useState<SavingsGoal>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'targetAmount' ? parseFloat(value) : value;
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const goalData = { 
      ...formData,
      targetAmount: parseFloat(formData.targetAmount.toString()),
      id: formData.id || ''  
    };

    onSubmit(goalData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkBg p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-white"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-primary mb-4">
          {isEditing ? "Edit Savings Goal" : "Add Savings Goal"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Goal Name"
            required
            className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="Target Amount"
            required
            className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            {isEditing ? "Update Goal" : "Create Goal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavingsGoalModal;