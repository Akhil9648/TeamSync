import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';
import { ArrowLeft } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/user/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center py-10">User not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
        Back to Users
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
            <p className="text-slate-900 dark:text-white">{user.role || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Team</label>
            <p className="text-slate-900 dark:text-white">{user.team || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {user.status || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
