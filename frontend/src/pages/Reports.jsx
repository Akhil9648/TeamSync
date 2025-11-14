import React from "react";
import { Download, FileText, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const productivityData = [
  { month: 'Jun', completed: 65, pending: 35 },
  { month: 'Jul', completed: 72, pending: 28 },
  { month: 'Aug', completed: 68, pending: 32 },
  { month: 'Sep', completed: 85, pending: 15 },
  { month: 'Oct', completed: 78, pending: 22 },
  { month: 'Nov', completed: 92, pending: 8 },
];

const teamPerformance = [
  { team: 'Engineering', score: 78 },
  { team: 'Design', score: 85 },
  { team: 'Marketing', score: 92 },
  { team: 'Sales', score: 65 },
];

const Reports = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        <Download size={20} />
        Export Report
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Team Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="team" type="category" stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="text-blue-600" size={24} />
          <h4 className="font-semibold text-slate-900 dark:text-white">Project Summary</h4>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">38</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Active Projects</p>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="text-green-600" size={24} />
          <h4 className="font-semibold text-slate-900 dark:text-white">Completion Rate</h4>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">87.5%</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Overall Performance</p>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="text-amber-600" size={24} />
          <h4 className="font-semibold text-slate-900 dark:text-white">Avg. Task Time</h4>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">3.2 days</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Per Task Completion</p>
      </div>
    </div>
  </div>
);
export default Reports;
