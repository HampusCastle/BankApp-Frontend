interface Notification {
  id: string;
  message: string;
  timestamp: number;
}

interface Props {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="bg-gray-800 p-4 rounded-md shadow-md">
              <p className="text-white">{notification.message}</p>
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
  );
};

export default NotificationList;