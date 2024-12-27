import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllAccounts } from "../services/accountApi";
import AccountList from "../components/AccountList";
import CreateAccountForm from "../components/CreateAccountForm";
import AccountDetailsModal from "../components/AccountDetailsModal";
import { AccountDetailsResponse } from "../services/accountApi";

const AccountPage = () => {
  const [accounts, setAccounts] = useState<AccountDetailsResponse[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const fetchAccounts = async () => {
    try {
      const data = await getAllAccounts();
      if (Array.isArray(data)) {
        setAccounts(data);
      } else {
        setError("Expected an array of accounts.");
      }
    } catch {
      setError("Failed to fetch accounts.");
    }
  };

  const fetchAccountDetails = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const closeAccountDetails = () => {
    setSelectedAccountId(null);
  };

  useEffect(() => {
    fetchAccounts();
  }, [location]);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Your Accounts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreateAccountForm onSuccess={fetchAccounts} />
        <div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <AccountList accounts={accounts} onAccountClick={fetchAccountDetails} />
          {selectedAccountId && (
            <AccountDetailsModal
              isOpen
              onClose={closeAccountDetails}
              accountId={selectedAccountId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;