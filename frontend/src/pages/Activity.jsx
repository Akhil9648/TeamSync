import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ListChecks, UserCog, Activity, Download, ArrowLeft } from 'lucide-react';

const getActivityIcon = (type) => {
  switch (type) {
    case 'team': return <Users size={20} className="text-blue-600" />;
    case 'task': return <ListChecks size={20} className="text-green-600" />;
    case 'user': return <UserCog size={20} className="text-purple-600" />;
    default: return <Activity size={20} className="text-slate-600" />;
  }
};

const ActivityPage = () => {
  const navigate = useNavigate();
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchActivityLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching with token:', token ? 'Token exists' : 'No token');  // Debug
      
      const response = await fetch('/api/activity', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Response status:', response.status);  // Debug
      console.log('Response ok:', response.ok);  // Debug
      
      if (!response.ok) {
        const errorData = await response.text();  // Get error details
        console.error('Error response:', errorData);  // Debug
        throw new Error('Failed to fetch activity logs');
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);  // Debug
      setActivityLogs(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch activity logs error:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchActivityLogs();
}, []);


  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/activity/export', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to export logs');
      
      // Download as JSON file
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activity-logs-${new Date().toISOString()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export logs: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-slate-600">Loading activity logs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Logs</h2>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          <Download size={20} />
          Export Logs
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {activityLogs.length > 0 ? (
            activityLogs.map((log) => (
              <div key={log._id || log.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    {getActivityIcon(log.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {log.user?.name || log.user || 'Unknown User'}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {log.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {log.timestamp || new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-500">
              No activity logs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
