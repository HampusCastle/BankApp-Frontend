import { useState, useEffect } from "react";
import { getSavingsGoalsByUser, createSavingsGoal, updateSavingsGoal, deleteSavingsGoal } from "../services/savingsgoalApi";
import { extractUserDetails } from "../utils/jwtUtil";
import SavingsGoalModal from "../components/SavingsGoalModal";
import SavingsGoalList from "../components/SavingsGoal";
import { SavingsGoal } from "../types/SavingsGoal";

const SavingsGoalPage = () => {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);

  useEffect(() => {
    const fetchSavingsGoals = async () => {
      const userDetails = extractUserDetails();
      const userId = userDetails?.userId;

      if (!userId) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const goals = await getSavingsGoalsByUser(userId);
        setSavingsGoals(goals);
      } catch (error) {
        console.error("Error fetching savings goals:", error);
      }
    };

    fetchSavingsGoals();
  }, []);

  const handleAddGoal = async (goalData: SavingsGoal) => {
    try {
      const newGoal = await createSavingsGoal(goalData);
      setSavingsGoals((prevGoals) => [...prevGoals, newGoal]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  };

  const handleUpdateGoal = async (updatedGoal: SavingsGoal) => {
    try {
      const updatedGoalData = await updateSavingsGoal(updatedGoal.id, updatedGoal);
      setSavingsGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === updatedGoalData.id ? updatedGoalData : goal
        )
      );
      setEditingGoal(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating savings goal:", error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteSavingsGoal(id);
      setSavingsGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Error deleting savings goal:", error);
    }
  };

  const openModalForAdd = () => {
    setEditingGoal(null);
    setModalOpen(true);
  };

  const openModalForEdit = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Your Savings Goals</h1>
      <button
        onClick={openModalForAdd}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Goal
      </button>
      <SavingsGoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}
        initialData={editingGoal || { id: '', name: '', targetAmount: 0, targetDate: '', currentAmount: 0 }}
        isEditing={editingGoal !== null}
      />
      <SavingsGoalList
        savingsGoals={savingsGoals}
        onEdit={openModalForEdit}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
};

export default SavingsGoalPage;
