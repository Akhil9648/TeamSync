import React, { useState } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Member",
    team: "",
    status: "Active",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const roles = ["Team Leader", "Member"];
  const teams = ["Engineering", "Design", "Marketing", "Sales"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.team) {
      setError("Name, Email, and Team are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add user");
      }
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        role: "Member",
        team: "",
        status: "Active",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Add New User</h2>
      
      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
      {success && <div className="mb-4 text-green-600 font-medium">User added successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">Team *</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          >
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
