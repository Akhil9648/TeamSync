import React from "react";
import { Users, ListChecks, UserCog, Activity, Download } from 'lucide-react';

const mockActivityLogs = [
  { id: 1, user: 'Sarah Johnson', action: 'Created new team "DevOps"', timestamp: '2 hours ago', type: 'team' },
  { id: 2, user: 'Michael Chen', action: 'Completed task "API Integration"', timestamp: '4 hours ago', type: 'task' },
  { id: 3, user: 'Admin System', action: 'User "Lisa Anderson" status changed to Inactive', timestamp: '6 hours ago', type: 'user' },
  { id: 4, user: 'James Wilson', action: 'Updated team settings for Design', timestamp: '1 day ago', type: 'team' },
  { id: 5, user: 'Emily Davis', action: 'Added new task "Redesign Dashboard UI"', timestamp: '1 day ago', type: 'task' },
];

const getActivityIcon = (type) => {
  switch (type) {
    case 'team': return <Users size={20} className="text-blue-600" />;
    case 'task': return <ListChecks size={20} className="text-green-600" />;
    case 'user': return <UserCog size={20} className="text-purple-600" />;
    default: return <Activity size={20} className="text-slate-600" />;
  }
};

const ActivityPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Logs</h2>
      <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
        <Download size={20} />
        Export Logs
      </button>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700">
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {mockActivityLogs.map((log) => (
          <div key={log.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">{getActivityIcon(log.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{log.user}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{log.action}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{log.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ActivityPage;
