import React, { useState, useEffect } from "react";
import { getRecurringPayments } from "../services/recurringPaymentApi";

interface RecurringPaymentResponse {
  id: string;
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  status: string;
  nextPaymentDate: string;
}

interface RecurringPaymentListProps {
  userId: string;
  payments: RecurringPaymentResponse[]; 
}

const RecurringPaymentList: React.FC<RecurringPaymentListProps> = ({ userId, payments }) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPayments = async () => {
      console.log("Fetching payments for userId:", userId); 
      try {
        if (!payments) {
          const data = await getRecurringPayments(userId); 
          console.log("Recurring payments response:", data);
          if (Array.isArray(data)) {
            if (data.length === 0) {
              setError(""); 
            } else {
              setError(""); 
            }
          } else {
            setError("Invalid response from server.");
          }
        }
      } catch (err) {
        console.error("Error fetching recurring payments:", err);
        setError("Failed to fetch recurring payments.");
      }
    };

    fetchPayments();
  }, [userId, payments]);

  return (
    <div>
      <h2 className="text-xl text-purple-400 mb-4">Recurring Payments</h2>
      {error && <p className="text-red-500">{error}</p>}
      {payments.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment.id} className="bg-gray-700 p-4 rounded mb-4">
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>From Account:</strong> {payment.fromAccountId}</p>
              <p><strong>To Account:</strong> {payment.toAccountId}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Next Payment Date:</strong> {new Date(payment.nextPaymentDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-gray-400">No recurring payments available.</p>
      )}
    </div>
  );
};

export default RecurringPaymentList;