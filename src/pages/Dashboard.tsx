import React, { useEffect, useState, useCallback } from "react";
import { getAllAccounts, getAccountBalance } from "../services/accountApi";
import RecurringPaymentForm from "../components/RecurringPaymentForm";
import RecurringPaymentList from "../components/RecurringPaymentList";
import { extractUserDetails } from "../utils/jwtUtil";
import { getRecurringPayments, RecurringPaymentResponse } from "../services/recurringPaymentApi";
import { Bars3Icon, XMarkIcon, CreditCardIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import CreditCard from "../components/CreditCard";

interface AccountDetailsResponse {
  id: string;
  name: string;
  accountType: string;
  balance: number;
  userId: string;
}

const DashboardPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountDetailsResponse[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: number | null }>({});
  const [userId, setUserId] = useState<string>("");
  const [recurringPayments, setRecurringPayments] = useState<RecurringPaymentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);

      const initialBalances = data.reduce((acc, account) => {
        acc[account.id] = null;
        return acc;
      }, {} as { [key: string]: number | null });
      setBalances(initialBalances);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  const fetchBalance = async (accountId: string) => {
    try {
      const balance = await getAccountBalance(accountId);
      setBalances((prev) => ({ ...prev, [accountId]: balance }));

      setTimeout(() => {
        setBalances((prev) => ({ ...prev, [accountId]: null }));
      }, 5000);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const fetchRecurringPayments = useCallback(async () => {
    try {
      const data = await getRecurringPayments(userId);
      setRecurringPayments(data);
    } catch (err) {
      console.error("Error fetching recurring payments:", err);
    } finally {
      setLoading(false)
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDetails = extractUserDetails(token);
      if (userDetails) {
        setUserId(userDetails.userId);
      }
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchRecurringPayments(); 
    }
  }, [userId, fetchRecurringPayments]); 

  const handleNewPayment = (newPayment: RecurringPaymentResponse) => {
    setRecurringPayments((prevPayments) => [newPayment, ...prevPayments]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <nav className="relative flex justify-between items-center p-4 bg-gray-900 shadow-lg">
        <div className="relative text-2xl font-bold text-purple-400">
          <span className="relative z-10">Financepus</span>
          <div className="absolute -z-10 left-0 top-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-50"></div>
        </div>
        <button className="md:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <Bars3Icon className="w-8 h-8 text-white" />
        </button>
      </nav>

      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 shadow-2xl flex flex-col p-6">
          <button
            onClick={() => setSidebarOpen(false)}
            className="self-end text-gray-300 hover:text-white mb-6"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-4">
            <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center">
              Dashboard
            </a>
            <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center">
              Cards
            </a>
            <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center">
              Subscriptions
            </a>
            <a href="#" className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-center">
              Settings
            </a>
          </nav>
        </div>
      )}

      <section className="flex flex-col p-6 md:p-12 space-y-8">
        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white">Your Cards</h2>
          <div className="flex justify-center items-center">
            <CreditCard />
          </div>
          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-purple-500 transition">
              <CreditCardIcon className="w-5 h-5 text-purple-400" />
              Add Money
            </button>
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-purple-500 transition">
              <ArrowDownTrayIcon className="w-5 h-5 text-purple-400" />
              Send Transfer
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white">Your Accounts</h2>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <div
                key={account.id}
                className="p-4 bg-gray-700 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{account.name}</h3>
                  <p className="text-gray-400">Type: {account.accountType}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => fetchBalance(account.id)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg transition"
                  >
                    View Balance
                  </button>
                  {balances[account.id] !== null && (
                    <p className="text-gray-300">
                      Balance: <span className="font-semibold">${balances[account.id]}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No accounts available. Create one to get started.</p>
          )}
        </div>

        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white">Recurring Payments</h2>
          <RecurringPaymentForm onSuccess={handleNewPayment} />
          {loading ? (
            <p className="text-gray-400">Loading recurring payments...</p>
          ) : (
            <RecurringPaymentList userId={userId} payments={recurringPayments} />
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;