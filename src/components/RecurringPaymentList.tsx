import { RecurringPaymentResponse, deleteRecurringPayment } from '../services/recurringPaymentApi';
import BackButton from './BackButton';

interface RecurringPaymentListProps {
  payments: RecurringPaymentResponse[];
  onDelete: (id: string) => void;
  onEdit: (payment: RecurringPaymentResponse) => void;
}

const RecurringPaymentList = ({ payments, onDelete, onEdit }: RecurringPaymentListProps) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteRecurringPayment(id);
      onDelete(id);
    } catch (err) {
      console.error('Error deleting recurring payment:', err);
    }
  };

  return (
    <div>
      <BackButton />
      <h2 className="text-xl text-purple-400 mb-4">Recurring Payments</h2>
      {payments.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment.id} className="bg-gray-700 p-4 rounded mb-4">
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>From Account:</strong> {payment.fromAccountId}</p>
              <p><strong>To Account:</strong> {payment.toAccountId}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Next Payment Date:</strong> {new Date(payment.nextPaymentDate).toLocaleDateString()}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => onEdit(payment)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No recurring payments available.</p>
      )}
    </div>
  );
};

export default RecurringPaymentList;