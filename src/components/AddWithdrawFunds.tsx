import { useState } from "react";
import { addFundsToAccount, withdrawFundsFromAccount } from "../services/accountApi";
import BackButton from "./BackButton";

interface AddWithdrawFundsProps {
  accountId: string;
}

const AddWithdrawFunds = ({ accountId }: AddWithdrawFundsProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [action, setAction] = useState<"add" | "withdraw">("add");

  const handleSubmit = async () => {
    if (amount <= 0) {
      alert("Amount must be greater than zero");
      return;
    }

    try {
      if (action === "add") {
        await addFundsToAccount(accountId, { amount });
      } else {
        await withdrawFundsFromAccount(accountId, { amount });
      }
      alert(`${action === "add" ? "Added" : "Withdrew"} ${amount} successfully!`);
    } catch {
      alert("Operation failed");
    }
  };

  return (
    <div>
      <BackButton />
      <h3 className="text-lg font-bold mb-4">Add or Withdraw Funds</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
      />
      <div className="flex gap-4">
        <button
          onClick={() => {
            setAction("add");
            handleSubmit();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Funds
        </button>
        <button
          onClick={() => {
            setAction("withdraw");
            handleSubmit();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default AddWithdrawFunds;