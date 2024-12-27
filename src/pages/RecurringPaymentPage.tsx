import { useEffect, useState } from "react";
import { getRecurringPayments } from "../services/recurringPaymentApi";
import RecurringPaymentForm from "../components/RecurringPaymentForm";
import RecurringPaymentList from "../components/RecurringPaymentList";
import { RecurringPaymentResponse } from "../services/recurringPaymentApi";

const RecurringPaymentPage = () => {
  const [payments, setPayments] = useState<RecurringPaymentResponse[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<RecurringPaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const data = await getRecurringPayments(userId);
          setPayments(data);
        }
      } catch {
        setError("Error fetching recurring payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleCreateOrUpdate = (newPayment: RecurringPaymentResponse) => {
    setPayments((prevPayments) =>
      selectedPayment
        ? prevPayments.map((payment) =>
            payment.id === selectedPayment.id ? newPayment : payment
          )
        : [...prevPayments, newPayment]
    );
    setSelectedPayment(null);
  };

  const handleDelete = (id: string) => {
    setPayments((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
  };

  const handleEdit = (payment: RecurringPaymentResponse) => {
    setSelectedPayment(payment);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Recurring Payments</h2>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <RecurringPaymentForm onSuccess={handleCreateOrUpdate} paymentToEdit={selectedPayment} />
      <RecurringPaymentList 
        payments={payments}
        onDelete={handleDelete}
        onEdit={handleEdit}
         />
    </div>
  );
};

export default RecurringPaymentPage;