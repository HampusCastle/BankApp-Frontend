import { useState, useEffect } from "react";
import { addFundsToAccount, withdrawFundsFromAccount } from "../services/accountApi";
import { transferFunds } from "../services/transferApi";
import { getTransactionHistory } from "../services/transactionApi";
import TransactionHistory from "./TransactionHistory";
import { TransactionDetailsResponse } from "../services/transactionApi";
import BackButton from "./BackButton";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
}

const AccountDetailsModal = ({ isOpen, onClose, accountId }: AccountDetailsModalProps) => {
  const [fundsAmount, setFundsAmount] = useState<number>(0);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [transferAccountId, setTransferAccountId] = useState<string>('');
  const [transactions, setTransactions] = useState<TransactionDetailsResponse[]>([]);
  const [activeTab, setActiveTab] = useState<"history" | "transfer" | "funds">("history");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionHistory({ accountId });
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transaction history:", err);
      }
    };

    if (activeTab === "history" && accountId) {
      fetchTransactions();
    }
  }, [activeTab, accountId]);

  const handleAddFunds = async () => {
    if (fundsAmount <= 0) return;
    try {
      await addFundsToAccount(accountId, { amount: fundsAmount });
      onClose();
    } catch {
      console.error("Failed to add funds");
    }
  };

  const handleWithdrawFunds = async () => {
    if (fundsAmount <= 0) return;
    try {
      await withdrawFundsFromAccount(accountId, { amount: fundsAmount });
      onClose();
    } catch {
      console.error("Failed to withdraw funds");
    }
  };

  const handleTransferFunds = async () => {
    if (transferAmount <= 0 || !transferAccountId) return;
    try {
      await transferFunds({ fromAccountId: accountId, toAccountId: transferAccountId, amount: transferAmount });
      onClose();
    } catch {
      console.error("Failed to transfer funds");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkBg p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative z-60">
        <BackButton onCloseModal={onClose} />
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 ${activeTab === "history" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"} rounded`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`px-4 py-2 ${activeTab === "transfer" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"} rounded`}
          >
            Transfer
          </button>
          <button
            onClick={() => setActiveTab("funds")}
            className={`px-4 py-2 ${activeTab === "funds" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"} rounded`}
          >
            Add/Withdraw
          </button>
        </div>

        {activeTab === "history" && <TransactionHistory transactions={transactions} />}
        {activeTab === "transfer" && (
          <>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
              className="p-2 bg-gray-700 rounded-lg text-white w-full"
              placeholder="Amount to Transfer"
            />
            <input
              type="text"
              value={transferAccountId}
              onChange={(e) => setTransferAccountId(e.target.value)}
              className="p-2 bg-gray-700 rounded-lg text-white mt-2 w-full"
              placeholder="Transfer To Account ID"
            />
            <button
              onClick={handleTransferFunds}
              className="ml-2 px-4 py-2 bg-secondary rounded-lg text-white w-full mt-2"
            >
              Transfer Funds
            </button>
          </>
        )}
        {activeTab === "funds" && (
          <>
            <input
              type="number"
              value={fundsAmount}
              onChange={(e) => setFundsAmount(Number(e.target.value))}
              className="p-2 bg-gray-700 rounded-lg text-white w-full"
              placeholder="Amount to Add/Withdraw"
            />
            <div className="flex mt-2 space-x-2">
              <button
                onClick={handleAddFunds}
                className="ml-2 px-4 py-2 bg-accentGreen rounded-lg text-white w-full"
              >
                Add Funds
              </button>
              <button
                onClick={handleWithdrawFunds}
                className="ml-2 px-4 py-2 bg-accentRed rounded-lg text-white w-full"
              >
                Withdraw Funds
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsModal;