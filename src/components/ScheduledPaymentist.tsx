import { ScheduledPaymentResponse } from "../services/scheduledPaymentApi";

interface ScheduledPaymentListProps {
  payments: ScheduledPaymentResponse[];
  onDelete: (id: string) => void;
  onEdit: (payment: ScheduledPaymentResponse) => void;
}

const ScheduledPaymentList = ({ payments, onDelete, onEdit }: ScheduledPaymentListProps) => (
    <ul className="space-y-4">
      {payments.map((payment, index) => (
        <li
          key={payment.id || `${payment.fromAccountId}-${payment.toAccountId}-${index}`}
          className="bg-gray-700 p-4 rounded mb-4"
        >
          <div>
            <p><strong>From:</strong> {payment.fromAccountId}</p>
            <p><strong>To:</strong> {payment.toAccountId}</p>
            <p><strong>Amount:</strong> ${payment.amount}</p>
            <p><strong>Schedule:</strong> {payment.schedule}</p>
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => onEdit(payment)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
  onClick={() => {
    const paymentId = payment.id || payment.paymentId;
    if (paymentId) {
      onDelete(paymentId);
    } else {
      console.error("Cannot delete payment: ID is undefined");
    }
  }}
  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
>
  Delete
</button>
          </div>
        </li>
      ))}
    </ul>
  );

export default ScheduledPaymentList;