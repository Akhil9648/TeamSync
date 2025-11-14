import React from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const productivityData = [
  { month: 'Jun', completed: 65, pending: 35 },
  { month: 'Jul', completed: 72, pending: 28 },
  { month: 'Aug', completed: 68, pending: 32 },
  { month: 'Sep', completed: 85, pending: 15 },
  { month: 'Oct', completed: 78, pending: 22 },
  { month: 'Nov', completed: 92, pending: 8 },
];

const taskDistribution = [
  { name: 'Completed', value: 245, color: '#10b981' },
  { name: 'In Progress', value: 89, color: '#3b82f6' },
  { name: 'Pending', value: 34, color: '#f59e0b' },
  { name: 'Overdue', value: 12, color: '#ef4444' },
];

const teamPerformance = [
  { team: 'Engineering', score: 78 },
  { team: 'Design', score: 85 },
  { team: 'Marketing', score: 92 },
  { team: 'Sales', score: 65 },
];

const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Productivity Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Task Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={taskDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value">
              {taskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Team Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={teamPerformance}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="team" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default Dashboard;
