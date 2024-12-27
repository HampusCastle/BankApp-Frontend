/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMonthlyExpensesForAllAccounts } from "../services/budgetApi";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

interface ExpensesSummary {
  totalExpenses: number;
  categories: { [key: string]: number };
}

interface BudgetReportProps {
  userId: string;
  accountId: string;
}

const categoryLabels: { [key: string]: string } = {
  ADDED_FUNDS: "Added Funds",
  WITHDRAW_FUNDS: "Withdraw Funds",
  SENT: "Sent",
  RECEIVED: "Received",
  TRANSFER: "Transfer",
  SUBSCRIPTIONS: "Subscriptions",
  RECURRING_PAYMENT: "Recurring Payments",
  SAVINGS_GOAL: "Savings Goal",
  OTHER: "Other",
};

const BudgetReport = ({ userId }: BudgetReportProps) => {
  const [expenses, setExpenses] = useState<ExpensesSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMonthlyExpensesForAllAccounts(userId);
        setExpenses(data);
      } catch {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const categories = expenses?.categories || {};
  const totalExpenses = expenses?.totalExpenses || 0;

  const chartData = categories
    ? {
        labels: Object.keys(categories).map(
          (category) => categoryLabels[category] || category
        ),
        datasets: [
          {
            data: Object.values(categories),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#9966FF"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#9966FF"],
          },
        ],
      }
    : { labels: [], datasets: [] };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            const percentage = ((value / totalExpenses) * 100).toFixed(2);
            return `${tooltipItem.label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded">
      {expenses ? (
        <>
          <h2 className="text-xl font-semibold">Total Expenses: ${expenses.totalExpenses}</h2>
          <div className="mt-6">
            <Pie data={chartData} options={options} />
          </div>
        </>
      ) : (
        <p>No expenses data available</p>
      )}
    </div>
  );
};

export default BudgetReport;