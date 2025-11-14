import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const mockTeams = [
  { id: 1, name: "Engineering", leader: "Michael Chen", members: 8, tasks: 45, completion: 78 },
  { id: 2, name: "Design", leader: "James Wilson", members: 5, tasks: 32, completion: 85 },
  { id: 3, name: "Marketing", leader: "Anna Martinez", members: 6, tasks: 28, completion: 92 },
  { id: 4, name: "Sales", leader: "Robert Taylor", members: 7, tasks: 38, completion: 65 },
];

const Teams = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Teams Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          Add New Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTeams.map((team) => (
          <div
            key={team.id}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{team.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Leader: {team.leader}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Members</span>
                <span className="font-semibold text-slate-900 dark:text-white">{team.members}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Active Tasks</span>
                <span className="font-semibold text-slate-900 dark:text-white">{team.tasks}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Completion Rate</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{team.completion}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${team.completion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
