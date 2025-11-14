import React from "react";
import { Shield, Edit, Plus } from 'lucide-react';

const Roles = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Roles & Permissions</h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        <Plus size={20} />
        Add New Role
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Add role cards here; structure provided in previous completion for Admin, Team Leader, Member */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Admin</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Full system access</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <p>✓ Manage users and teams</p>
          <p>✓ View all reports</p>
          <p>✓ System configuration</p>
          <p>✓ Full task management</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <Edit size={16} className="inline mr-2" />
            Edit
          </button>
        </div>
      </div>
      {/* Repeat for Team Leader and Member */}
    </div>
  </div>
);
export default Roles;
