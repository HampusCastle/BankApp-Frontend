import { useState } from "react";
import { createAccount, CreateAccountRequest } from "../services/accountApi";
import BackButton from "./BackButton";

interface Props {
  onSuccess: () => void;
}

const CreateAccountForm = ({ onSuccess }: Props) => {
  const [formData, setFormData] = useState<CreateAccountRequest>({
    name: "",
    accountType: "",
    balance: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAccount(formData);
      onSuccess();
    } catch {
      setError("Failed to create account.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
      <BackButton />
      <h2 className="text-xl text-purple-400 mb-4">Create New Account</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-400">Account Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Account Type</label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        >
          <option value="">Select</option>
          <option value="SAVINGS">Savings</option>
          <option value="CHECKING">Checking</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">Initial Balance</label>
        <input
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          min="0"
        />
      </div>
      <button type="submit" className="w-full bg-purple-500 py-2 rounded hover:bg-purple-400">
        Create Account
      </button>
    </form>
  );
};

export default CreateAccountForm;