import { SavingsGoal } from "../types/SavingsGoal";

interface SavingsGoalProps {
  savingsGoals: SavingsGoal[];
  onEdit: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
}

const SavingsGoalList = ({ savingsGoals, onEdit, onDelete }: SavingsGoalProps) => (
  <div>
    <h2 className="text-3xl font-bold text-purple-400 mb-6">Your Savings Goals</h2>
    {savingsGoals.length > 0 ? (
      <ul>
        {savingsGoals.map((goal) => (
          <li key={goal.id} className="bg-gray-700 p-4 rounded mb-4">
            <p><strong>Name:</strong> {goal.name}</p>
            <p><strong>Target Amount:</strong> ${goal.targetAmount}</p>
            <p><strong>Target Date:</strong> {goal.targetDate}</p>
            <p><strong>Current Amount:</strong> ${goal.currentAmount}</p>
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(goal)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(goal.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No savings goals available</p>
    )}
  </div>
);

export default SavingsGoalList;