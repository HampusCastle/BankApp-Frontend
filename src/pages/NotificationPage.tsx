import { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationApi'; 

interface Notification {
  id: string;
  message: string;
  timestamp: number;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getNotifications();
        setNotifications(data); 
      } catch (err) {
        setError('Error fetching notifications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center">Notifications</h2>

      {loading && <p className="text-gray-400 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className="bg-gray-800 p-4 rounded-md shadow-md">
              <p className="text-white">{notification.message}</p>
              <span className="text-sm text-gray-400">
                {new Date(notification.timestamp).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No notifications available</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationPage;