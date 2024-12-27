import { useState, useEffect } from "react";
import { getAllAccounts } from "../services/accountApi";
import TransferForm from "../components/TransferForm";

const TransferPage = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAccountId = localStorage.getItem("accountId");
    if (storedAccountId) {
      setFromAccountId(storedAccountId);
    }
  }, []);

  const handleTransferSuccess = async () => {
    console.log("Transfer successful! Fetching updated account list.");
  };

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Fund Transfer</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <TransferForm fromAccountId={fromAccountId} onSuccess={handleTransferSuccess} />
    </div>
  );
};

export default TransferPage;