import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";  // ✅ Already correct
import { Search, Eye, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [hiddenUsers, setHiddenUsers] = useState(new Set());

  const handleHide = (userId) => {
    setHiddenUsers(prev => new Set(prev).add(userId));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        let response = await fetch(`${API_BASE}/api/user`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok){
          response = await fetch(`${API_BASE}/api/user/my-teams`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        }
        const data = await response.json();
        const formattedUsers = data.map((user, index) => ({
          id: user.id || user._id,
          name: user.name || "",
          email: (user.email || "").toLowerCase(),
          role: user.role || 'Member',
          team: user.team || 'Unassigned',
          status: user.status || 'Active',
          tasks: Math.floor(Math.random() * 20),
        }));
        setUsers(formattedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const name = user.name || "";
      const email = user.email || "";
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const visibleUsers = filteredUsers.filter(user => !hiddenUsers.has(user.id));

  const handleAddUser = () => navigate('/add-user');

  const handleView = (userId) => {
    if (!userId) return alert("Invalid user ID");
    navigate(`/user/${userId}`);
  };

  const handleEdit = (userId) => {
    if (!userId) return alert("Invalid user ID");
    navigate(`/user/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem('token');
      // ✅ Fixed: Removed duplicate line
      const response = await fetch(`${API_BASE}/api/user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      alert(error.message);
    }
  };

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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Users Management</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={handleAddUser}
        >
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
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        >
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
              {loading && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500 dark:text-slate-400">Loading users...</td>
                </tr>
              )}
              {error && (
                <tr><td colSpan="7" className="text-center py-10 text-red-500">Error: {error}</td></tr>
              )}
              {!loading && !error && visibleUsers.map((user) => (
                <tr key={user.id}>
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
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => handleView(user.id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        onClick={() => handleEdit(user.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        onClick={() => handleHide(user.id)}
                      >
                        Hide
                      </button>
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
