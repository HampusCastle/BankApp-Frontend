import { TransactionDetailsResponse } from "../services/transactionApi";

const TransactionHistory = ({ transactions }: { transactions: TransactionDetailsResponse[] }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500">No transactions found.</p>;
  }

  return (
    <ul className="divide-y divide-gray-600 bg-darkBg rounded-lg p-4">
      {transactions.map((transaction, index) => (
        <li key={index} className="py-4 px-6 bg-gray-800 rounded-lg mb-4">
          <div className="transaction-item text-white">
            <p><strong>From:</strong> {transaction.fromAccountId}</p>
            <p><strong>To:</strong> {transaction.toAccountId}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Date:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
            <p><strong>Category:</strong> {transaction.categoryId}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionHistory;