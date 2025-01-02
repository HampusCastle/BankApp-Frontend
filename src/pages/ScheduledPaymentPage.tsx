import { useEffect, useState, useCallback } from "react";
import {
  getScheduledPayments,
  createScheduledPayment,
  updateScheduledPayment,
  deleteScheduledPayment,
  ScheduledPaymentResponse,
  CreateScheduledPaymentRequest,
} from "../services/scheduledPaymentApi";
import ScheduledPaymentList from "../components/ScheduledPaymentist";
import ScheduledPaymentForm from "../components/ScheduledPaymentForm";
import { extractUserDetails } from "../utils/jwtUtil";

const ScheduledPaymentPage = () => {
  const [payments, setPayments] = useState<ScheduledPaymentResponse[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<CreateScheduledPaymentRequest | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userDetails = extractUserDetails();
  const userId = userDetails?.userId;

  const fetchPayments = useCallback(async () => {
    if (!userId) {
      setError("User details are missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getScheduledPayments();
      setPayments(data);
    } catch (err) {
      console.error("Error fetching scheduled payments:", err);
      setError("Error fetching scheduled payments.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleCreateOrUpdate = async (payment: CreateScheduledPaymentRequest) => {
    if (!userId) {
      setError("User details are missing. Please log in again.");
      return;
    }
  
    try {
      if (payment.id) {
        await updateScheduledPayment(payment.id, payment);
      } else {
        await createScheduledPayment(payment);
      }
  
      await fetchPayments();
      setSelectedPayment(undefined);
    } catch (err) {
      console.error("Error creating or updating payment:", err);
      setError("Failed to create or update the scheduled payment.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!userId) {
      setError("User details are missing. Please log in again.");
      return;
    }
  
    try {
      await deleteScheduledPayment(id);
      fetchPayments();
    } catch (err) {
      console.error("Error deleting scheduled payment:", err);
      setError("Failed to delete scheduled payment.");
    }
  };

  const handleEdit = (payment: ScheduledPaymentResponse) => {
    setSelectedPayment({
      id: payment.paymentId || payment.id,
      fromAccountId: payment.fromAccountId,
      toAccountId: payment.toAccountId,
      amount: payment.amount,
      nextPaymentDate: payment.nextPaymentDate,
      schedule: payment.schedule,
    });
  };

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Scheduled Payments</h1>
      {loading && <p className="text-yellow-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ScheduledPaymentForm onSubmit={handleCreateOrUpdate} paymentToEdit={selectedPayment} />
      <ScheduledPaymentList payments={payments} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default ScheduledPaymentPage;