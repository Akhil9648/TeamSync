import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Users, User, Target, TrendingUp, X } from 'lucide-react';

const AddTeam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableLeaders, setAvailableLeaders] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    leader: '',
    tasks: 0,
    completion: 0
  });

  // Fetch leaders and all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          const leaders = data.filter(user => user.role === 'Team Leader');
          setAvailableLeaders(leaders);
          setAvailableUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'tasks' || name === 'completion' 
        ? Number(value) 
        : value
    });
    setError(null);
    setSuccess(false);
  };

  const addMember = (userId) => {
    if (!selectedMembers.includes(userId)) {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter(id => id !== userId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const teamData = {
        name: formData.name,
        leader: formData.leader || null,
        members: selectedMembers,  // ✅ Send array of member IDs
        tasks: formData.tasks,
        completion: formData.completion
      };
      
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create team');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/teams');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate('/admin/teams')}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back to Teams
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Team</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              Team created successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Team Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Users size={18} className="text-blue-600" />
                Team Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Engineering, Design, Marketing"
                required
              />
            </div>

            {/* Team Leader */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={18} className="text-purple-600" />
                Team Leader (Optional)
              </label>
              <select
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select a team leader (optional)</option>
                {availableLeaders.map(leader => (
                  <option key={leader._id} value={leader._id}>
                    {leader.name} ({leader.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Team Members */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Users size={18} className="text-green-600" />
                Team Members
              </label>
              <select
                onChange={(e) => addMember(e.target.value)}
                value=""
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">Add a member...</option>
                {availableUsers
                  .filter(user => !selectedMembers.includes(user._id))
                  .map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
              </select>

              {/* Selected Members */}
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedMembers.map(memberId => {
                  const member = availableUsers.find(u => u._id === memberId);
                  return member ? (
                    <div
                      key={memberId}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      <span>{member.name}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(memberId)}
                        className="hover:bg-blue-200 rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selected: {selectedMembers.length} member(s)
              </p>
            </div>

            {/* Active Tasks */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Target size={18} className="text-orange-600" />
                Active Tasks
              </label>
              <input
                type="number"
                name="tasks"
                value={formData.tasks}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 12"
              />
            </div>

            {/* Completion Rate */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <TrendingUp size={18} className="text-pink-600" />
                Completion Rate (%)
              </label>
              <input
                type="number"
                name="completion"
                value={formData.completion}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 75"
              />
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${formData.completion}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold rounded-lg transition ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Save size={20} />
                {loading ? 'Creating...' : 'Create Team'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/teams')}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
