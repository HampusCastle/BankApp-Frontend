import { useState, useEffect, useCallback } from "react";
import { getTransactionHistory } from "../services/transactionApi";
import { TransactionDetailsResponse } from "../services/transactionApi";
import { extractUserDetails } from "../utils/jwtUtil";

interface TransactionFiltersProps {
  setTransactions: (transactions: TransactionDetailsResponse[]) => void;
}

const TransactionFilters = ({ setTransactions }: TransactionFiltersProps) => {
  const userDetails = extractUserDetails();
  const accountId = userDetails ? userDetails.userId : ""; 
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    accountId: accountId, 
  });

  const fetchTransactionHistory = useCallback(async () => {
    try {
      const data = await getTransactionHistory(filters);
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transaction history:", err);
    }
  }, [filters, setTransactions]); 

  useEffect(() => {
    fetchTransactionHistory(); 
  }, [filters, fetchTransactionHistory]); 

  return (
    <form className="space-y-4">
      <input
        type="date"
        value={filters.fromDate}
        onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        className="p-2 rounded"
      />
      <input
        type="date"
        value={filters.toDate}
        onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        className="p-2 rounded"
      />
      <input
        type="text"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        placeholder="Category"
        className="p-2 rounded"
      />
      <button type="button" onClick={fetchTransactionHistory} className="p-2 bg-blue-500 rounded text-white">
        Filter
      </button>
    </form>
  );
};

export default TransactionFilters;
