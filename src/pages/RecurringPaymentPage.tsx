/* eslint-disable @typescript-eslint/no-unused-vars */
import { extractUserDetails } from "../utils/jwtUtil";
import { useEffect, useState, useCallback } from "react";
import { getRecurringPayments } from "../services/recurringPaymentApi";
import RecurringPaymentForm from "../components/RecurringPaymentForm";
import RecurringPaymentList from "../components/RecurringPaymentList";
import { RecurringPaymentResponse } from "../services/recurringPaymentApi";

const RecurringPaymentPage = () => {
  const [payments, setPayments] = useState<RecurringPaymentResponse[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<RecurringPaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const userDetails = extractUserDetails();
      if (userDetails && userDetails.userId) {
        const data = await getRecurringPayments();
        setPayments(data);
      } else {
        setError("User details not found.");
      }
    } catch (err) {
      setError("Error fetching recurring payments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleCreateOrUpdate = (newPayment: RecurringPaymentResponse) => {
    setPayments((prevPayments) =>
      selectedPayment
        ? prevPayments.map((payment) =>
            payment.id === selectedPayment.id ? newPayment : payment
          )
        : [...prevPayments, newPayment]
    );
    setSelectedPayment(null);
    fetchPayments();
  };

  const handleDelete = (id: string) => {
    setPayments((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
    fetchPayments();
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
      <RecurringPaymentList payments={payments} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default RecurringPaymentPage;