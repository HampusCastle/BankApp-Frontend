/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
} from "../services/subscriptionApi";
import SubscriptionModal from "../components/SubscriptionModal";
import SubscriptionList from "../components/SubscriptionList";
import { SubscriptionResponse, CreateSubscriptionRequest } from "../services/subscriptionApi";

function SubscriptionPage() {
  const [activeSubscriptions, setActiveSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [canceledSubscriptions, setCanceledSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const active = await getSubscriptions("active");
        const canceled = await getSubscriptions("canceled");
        setActiveSubscriptions(active);
        setCanceledSubscriptions(canceled);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      }
    };

    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async (data: CreateSubscriptionRequest) => {
    try {
      const newSubscription = await createSubscription(data);
      setActiveSubscriptions((prev) => [...prev, newSubscription]);
      setModalOpen(false);
    } catch (err) {
      setError("Failed to create subscription");
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      await deleteSubscription(id);
      setActiveSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
      setCanceledSubscriptions((prev) => [
        ...prev,
        { ...activeSubscriptions.find((sub) => sub.id === id), status: "canceled" } as SubscriptionResponse
      ]);
    } catch (err) {
      setError("Failed to delete subscription");
    }
  };

  const openModalForAdd = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Subscriptions</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        onClick={openModalForAdd}
        className="mb-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Subscription
      </button>
      <SubscriptionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleAddSubscription}
      />
      <div>
        <h3 className="text-xl text-purple-300">Active Subscriptions</h3>
        <SubscriptionList
          subscriptions={activeSubscriptions}
          onDelete={handleDeleteSubscription}
        />
      </div>
      <div>
        <h3 className="text-xl text-purple-300">Canceled Subscriptions</h3>
        <SubscriptionList
          subscriptions={canceledSubscriptions}
          onDelete={handleDeleteSubscription}
        />
      </div>
    </div>
  );
}

export default SubscriptionPage;
