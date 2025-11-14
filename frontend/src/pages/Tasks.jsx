import React from "react";
import { Eye, Edit, Plus } from 'lucide-react';

const mockTasks = [
  { id: 1, title: 'Redesign Dashboard UI', team: 'Design', assignee: 'Emily Davis', status: 'In Progress', priority: 'High', dueDate: '2025-11-20' },
  { id: 2, title: 'API Integration', team: 'Engineering', assignee: 'Michael Chen', status: 'Completed', priority: 'Critical', dueDate: '2025-11-15' },
  { id: 3, title: 'Marketing Campaign Q4', team: 'Marketing', assignee: 'Anna Martinez', status: 'Pending', priority: 'Medium', dueDate: '2025-11-25' },
  { id: 4, title: 'Client Presentation', team: 'Sales', assignee: 'Robert Taylor', status: 'In Progress', priority: 'High', dueDate: '2025-11-18' },
];

const Tasks = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Task Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          Create Task
        </button>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Task Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Team</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Assignee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{task.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-white">{task.team}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-white">{task.assignee}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-white">{task.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Eye size={18} /></button>
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"><Edit size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
