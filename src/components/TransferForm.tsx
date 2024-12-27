/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { transferFunds, TransferRequest } from "../services/transferApi";

interface TransferFormProps {
  fromAccountId: string;
  onSuccess: () => void; 
}

const TransferForm = ({ fromAccountId, onSuccess }: TransferFormProps) => {
  const [toAccountId, setToAccountId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidForm = (): boolean => {
    return fromAccountId.trim() !== "" && toAccountId.trim() !== "" && Number(amount) > 0;
  };

  const handleTransfer = async () => {
    if (!isValidForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const transferRequest: TransferRequest = {
      fromAccountId,
      toAccountId,
      amount: Number(amount),
    };

    setIsLoading(true);
    try {
      await transferFunds(transferRequest);
      alert("Transfer successful!");
      onSuccess(); 
      setToAccountId("");
      setAmount("");
    } catch (error) {
      alert("Transfer failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 bg-gray-700 rounded">
      <h3 className="text-lg font-bold text-white mb-4">Send Transfer</h3>
      <input
        type="text"
        placeholder="To Account ID"
        value={toAccountId}
        onChange={(e) => setToAccountId(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
      />
      <button
        onClick={handleTransfer}
        className={`w-full p-2 rounded ${
          isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500 transition"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Send"}
      </button>
    </div>
  );
};

export default TransferForm;