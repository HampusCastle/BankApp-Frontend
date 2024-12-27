import React from "react";
import { SubscriptionResponse } from "../services/subscriptionApi";

interface SubscriptionListProps {
  subscriptions: SubscriptionResponse[];
  onDelete: (id: string) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onDelete }) => {
  return (
    <div>
      {subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id} className="bg-gray-700 p-4 rounded mb-4">
              <p><strong>Service:</strong> {sub.serviceName}</p>
              <p><strong>Amount:</strong> ${sub.amount}</p>
              <p><strong>Interval:</strong> {sub.interval}</p>
              <p><strong>Status:</strong> {sub.status}</p>
              {sub.status === "canceled" ? (
                <p><strong>Last Payment Date:</strong> {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
              ) : (
                <p><strong>Next Payment Date:</strong> {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
              )}
              {sub.status === "active" && (
                <button
                  onClick={() => onDelete(sub.id)}
                  className="text-red-500 hover:text-red-400 mt-2"
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No subscriptions available.</p>
      )}
    </div>
  );
};

export default SubscriptionList;