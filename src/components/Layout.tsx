import { Outlet, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import {
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaPiggyBank,
  FaCalendarAlt,
  FaCogs,
} from "react-icons/fa";

const Layout = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white pb-16">
      <NotificationBell />

      <div className="flex-grow">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between text-white z-50">
        <div
          onClick={() => handleNavigate("/accounts")}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          <FaMoneyCheckAlt size={24} />
          <p className="text-sm">Accounts</p>
        </div>
        <div
          onClick={() => handleNavigate("/subscriptions")}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          <FaExchangeAlt size={24} />
          <p className="text-sm">Subscriptions</p>
        </div>
        <div
          onClick={() => handleNavigate("/savings-goals")}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          <FaPiggyBank size={24} />
          <p className="text-sm">Goals</p>
        </div>
        <div
          onClick={() => handleNavigate("/scheduled-payments")}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          <FaCalendarAlt size={24} />
          <p className="text-sm">Payments</p>
        </div>
        <div
          onClick={() => handleNavigate("/profile")}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          <FaCogs size={24} />
          <p className="text-sm">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;