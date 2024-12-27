import React, { useState, useEffect } from 'react';
import BudgetReport from '../components/BudgetReport';
import { getJwtToken } from '../utils/jwtUtil';

const BudgetPage = () => {
  const [accountId, setAccountId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [isUserIdFetched, setIsUserIdFetched] = useState<boolean>(false);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId);
      setIsUserIdFetched(true);
    }
  }, []);

  const handleAccountIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountId(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Budget Report</h1>

      {!isUserIdFetched ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={accountId}
              onChange={handleAccountIdChange}
              placeholder="Enter Account ID"
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
          </div>

          {accountId && (
            <BudgetReport userId={userId} accountId={accountId} />
          )}
        </>
      )}
    </div>
  );
};

export default BudgetPage;