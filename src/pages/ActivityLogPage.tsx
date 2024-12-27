import { useState, useEffect } from "react";
import { getActivityLogs, getActivityLogsForUser } from "../services/activityLogApi";
import { extractUserDetails } from "../utils/jwtUtil";
import ActivityLog from "../components/ActivityLog";

const ActivityLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userDetails = extractUserDetails();
  const userId = userDetails?.userId || "";
  const isAdmin = userDetails?.roles.includes("ADMIN");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = isAdmin ? await getActivityLogs() : await getActivityLogsForUser(userId);
        setLogs(data);
      } catch {
        setError("Failed to fetch activity logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [isAdmin, userId]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Activity Logs</h2>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <ActivityLog logs={logs} />
    </div>
  );
};

export default ActivityLogPage;