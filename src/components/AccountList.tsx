import { AccountDetailsResponse } from "../services/accountApi";
import BackButton from "./BackButton";

interface AccountListProps {
  accounts: Array<AccountDetailsResponse & { isSavingsGoal?: boolean }>;
  onAccountClick: (accountId: string) => void;
}

const AccountList = ({ accounts = [], onAccountClick }: AccountListProps) => {
  if (!Array.isArray(accounts) || accounts.length === 0) {
    return (
      <div>
        <BackButton />
        <p className="text-gray-400">No accounts available.</p>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      {accounts.map((account) => (
        <div
          key={`${account.isSavingsGoal ? "savings-" : "account-"}${account.id}`}
          className="p-4 bg-gray-700 rounded-lg mb-4 cursor-pointer hover:bg-gray-600"
          onClick={() => onAccountClick(account.id)}
        >
          <p className="text-white">{account.name}</p>
          <p className="text-gray-400">Balance: ${account.balance}</p>
          <p className="text-gray-400">Type: {account.accountType}</p>
        </div>
      ))}
    </div>
  );
};

export default AccountList;