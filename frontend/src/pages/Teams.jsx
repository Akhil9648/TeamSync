import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { API_BASE } from "../config/api";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/team`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/team/${teamId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete team");
      setTeams(prev => prev.filter(team => team._id !== teamId));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddTeam = () => navigate('/add-team');
  const handleEditTeam = (teamId) => navigate(`/team/edit/${teamId}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-slate-600">Loading teams...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Teams Management</h2>
        <button 
          onClick={handleAddTeam}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add New Team
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {team.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Leader: {typeof team.leader === 'object' ? team.leader?.name : (team.leader || 'Not assigned')}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditTeam(team._id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(team._id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Members</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {Array.isArray(team.members) ? team.members.length : (team.members || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Active Tasks</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {Array.isArray(team.tasks) ? team.tasks.length : (team.tasks || 0)}
                </span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Completion Rate</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {team.completion || 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${team.completion || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && !error && teams.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No teams found. Create one to get started!
        </div>
      )}
    </div>
  );
};

export default Teams;
