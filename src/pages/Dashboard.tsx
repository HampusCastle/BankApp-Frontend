/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BudgetReport from "../components/BudgetReport";
import CreditCard from "../components/CreditCard";
import { getJwtToken } from "../utils/jwtUtil";
import { getMonthlyExpensesForAllAccounts } from "../services/budgetApi";
import { AxiosError } from "axios";
import {
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaPiggyBank,
  FaCalendarAlt,
  FaBell,
  FaNewspaper,
} from "react-icons/fa";

const DashboardPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [expensesSummary, setExpensesSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
      fetchMonthlyExpensesForAllAccounts(decodedToken.userId);
    }
  }, []);

  const fetchMonthlyExpensesForAllAccounts = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getMonthlyExpensesForAllAccounts(userId);
      setExpensesSummary(response);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("Failed to load expenses");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="flex justify-center mb-10">
        <CreditCard />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/accounts")}
        >
          <FaMoneyCheckAlt size={36} className="text-white" />
          <p className="mt-4 text-sm">Bank Accounts</p>
        </div>
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/subscriptions")}
        >
          <FaExchangeAlt size={36} className="text-white" />
          <p className="mt-4 text-sm">Subscriptions</p>
        </div>
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/savings-goals")}
        >
          <FaPiggyBank size={36} className="text-white" />
          <p className="mt-4 text-sm">Savings Goals</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/scheduled-payments")}
        >
          <FaCalendarAlt size={36} className="text-white" />
          <p className="mt-4 text-sm">Scheduled Payments</p>
        </div>
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/market-news")}
        >
          <FaNewspaper size={36} className="text-white" />
          <p className="mt-4 text-sm">Market News</p>
        </div>
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 w-40 h-40"
          onClick={() => handleNavigate("/notifications")}
        >
          <FaBell size={36} className="text-white" />
          <p className="mt-4 text-sm">Notifications</p>
        </div>
      </div>

      {loading ? (
        <p>Loading budget report...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        expensesSummary && (
          <div className="bg-gray-800 w-full py-6 px-10 mt-10 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Overall Budget Report</h3>
            <BudgetReport userId={userId!} accountId={""} />
          </div>
        )
      )}
    </div>
  );
};

export default DashboardPage;