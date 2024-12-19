/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { transferFunds, TransferRequest } from '../services/transferApi';

interface TransferFormProps {
  onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    const token = localStorage.getItem('token') || ''; // Retrieve token
    const transferRequest: TransferRequest = {
      fromAccountId,
      toAccountId,
      amount: Number(amount),
    };
    try {
      await transferFunds(transferRequest, token);
      alert('Transfer successful');
      onSuccess();
      setFromAccountId('');
      setToAccountId('');
      setAmount('');
    } catch (error) {
      alert('Transfer failed. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-gray-700 rounded">
      <h3 className="text-lg font-bold text-white mb-4">Send Transfer</h3>
      <input
        type="text"
        placeholder="From Account ID"
        value={fromAccountId}
        onChange={(e) => setFromAccountId(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
      />
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
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        Send
      </button>
    </div>
  );
};

export default TransferForm;