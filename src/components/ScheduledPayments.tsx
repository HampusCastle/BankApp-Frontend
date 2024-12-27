/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  createScheduledPayment,
  updateScheduledPayment,
  deleteScheduledPayment,
  CreateScheduledPaymentRequest,
} from "../services/scheduledPaymentApi";
import ScheduledPaymentModal from "./ScheduledPaymentModal";

interface ScheduledPayment {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  nextPaymentDate: number; 
  schedule: string;
}

function ScheduledPayments() {
  const [scheduledPayments, setScheduledPayments] = useState<ScheduledPayment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<ScheduledPayment | null>(null);
  const [error, setError] = useState("");

  const fetchScheduledPayments = async () => {
    try {
      const data: ScheduledPayment[] = [
        {
          id: "1",
          fromAccountId: "12345",
          toAccountId: "67890",
          amount: 100,
          nextPaymentDate: new Date("2024-01-01T10:00").getTime(),
          schedule: "daily",
        },
      ];
      setScheduledPayments(data);
    } catch (err) {
      setError("Failed to fetch scheduled payments.");
    }
  };

  useEffect(() => {
    fetchScheduledPayments();
  }, []);

  const handleAddPayment = async (data: CreateScheduledPaymentRequest) => {
    try {
      const response = await createScheduledPayment(data);
      setScheduledPayments((prev) => [...prev, { ...data, id: response.paymentId || "" }]);
    } catch (err) {
      setError("Failed to create scheduled payment.");
    }
  };

  const handleUpdatePayment = async (data: CreateScheduledPaymentRequest) => {
    if (editingPayment) {
      try {
        await updateScheduledPayment(editingPayment.id, data);
        setScheduledPayments((prev) =>
          prev.map((payment) =>
            payment.id === editingPayment.id ? { ...payment, ...data } : payment
          )
        );
        setEditingPayment(null);
      } catch (err) {
        setError("Failed to update scheduled payment.");
      }
    }
  };

  const handleDeletePayment = async (id: string) => {
    try {
      await deleteScheduledPayment(id);
      setScheduledPayments((prev) => prev.filter((payment) => payment.id !== id));
    } catch (err) {
      setError("Failed to delete scheduled payment.");
    }
  };

  const openModalForAdd = () => {
    setEditingPayment(null);
    setModalOpen(true);
  };

  const openModalForEdit = (payment: ScheduledPayment) => {
    setEditingPayment(payment);
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Scheduled Payments</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        onClick={openModalForAdd}
        className="mb-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Scheduled Payment
      </button>
      <ScheduledPaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingPayment ? handleUpdatePayment : handleAddPayment}
        initialData={editingPayment || undefined}
        isEditing={!!editingPayment}
      />
      <ul className="space-y-4">
        {scheduledPayments.map((payment) => (
          <li
            key={payment.id}
            className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <p>
                <strong>From:</strong> {payment.fromAccountId}
              </p>
              <p>
                <strong>To:</strong> {payment.toAccountId}
              </p>
              <p>
                <strong>Amount:</strong> ${payment.amount}
              </p>
              <p>
                <strong>Next Payment Date:</strong> {new Date(payment.nextPaymentDate).toLocaleString()}
              </p>
              <p>
                <strong>Schedule:</strong> {payment.schedule}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => openModalForEdit(payment)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePayment(payment.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduledPayments;