/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationApi';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        setUnreadCount(data.filter((notification) => !notification.read).length);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      if (!prev) {
        markAllAsRead();
      }
      return !prev;
    });
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 p-2 cursor-pointer" onClick={toggleDropdown}>
        <FaBell size={24} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {unreadCount}
          </span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-12 right-4 bg-gray-800 p-4 rounded-lg shadow-md w-64">
          <h4 className="text-lg font-semibold text-white">Notifications</h4>
          {notifications.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-2 rounded-md ${
                    notification.read ? 'bg-gray-600' : 'bg-gray-700'
                  } text-white`}
                >
                  <p>{notification.message}</p>
                  <span className="text-sm text-gray-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No notifications available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;