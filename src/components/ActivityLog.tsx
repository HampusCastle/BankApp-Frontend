import BackButton from "./BackButton";

interface Log {
  id: string;
  action: string;
  timestamp: string;
}

interface ActivityLogProps {
  logs: Log[];
}

const ActivityLog = ({ logs }: ActivityLogProps) => {
  return (
    <div>
      <BackButton />
      <ul>
        {logs.length > 0 ? (
          logs.map((log) => (
            <li key={log.id} className="p-4 bg-gray-800 rounded mb-2">
              <div>
                <p className="font-semibold">{log.action}</p>
                <p>{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))
        ) : (
          <li>No activity logs available.</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityLog;