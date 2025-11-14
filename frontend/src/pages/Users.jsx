import React, { useState } from "react";
import { Search, Eye, Edit, Trash2, Plus } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Admin', team: 'Engineering', status: 'Active', tasks: 12 },
  { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', role: 'Team Leader', team: 'Engineering', status: 'Active', tasks: 8 },
  { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Member', team: 'Engineering', status: 'Active', tasks: 15 },
  { id: 4, name: 'James Wilson', email: 'james.w@company.com', role: 'Team Leader', team: 'Design', status: 'Active', tasks: 6 },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', role: 'Member', team: 'Design', status: 'Inactive', tasks: 3 },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Users Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          Add New User
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Team Leader</option>
          <option>Member</option>
        </select>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Team</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Tasks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full" />
                      <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-white">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'Team Leader' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-white">{user.team}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{user.tasks}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Eye size={18} /></button>
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"><Edit size={18} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
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
export default Users;
