import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API_BASE } from '../config/api';
import { User, Mail, Briefcase, Edit2, Save, X, Camera, Users } from 'lucide-react';

// ------------------ AUTH CONTEXT ------------------

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) setCurrentUser(data.profile);
        else localStorage.removeItem("token");
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ------------------ HEADER ------------------

const Header = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>

        {currentUser.role === "Team Leader" && (
          <Link
            to="/admin"
            className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded-lg shadow hover:bg-white/30 transition"
          >
            Go to Admin Dashboard
          </Link>
        )}

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-sm text-blue-100">{currentUser.role}</p>
          </div>

          <img
            src={currentUser.avatarUrl || "/default-avatar.png"}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>
        <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
>
  Logout
</button>

      </div>
    </header>
  );
};

// ------------------ TEAMS MODAL ------------------

const TeamsModal = ({ open, onClose, teams }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users /> Your Teams
        </h2>

        {teams.length === 0 ? (
          <p className="text-gray-600">You are not part of any team yet.</p>
        ) : (
          <ul className="space-y-2">
            {teams.map((t) => (
              <li
                key={t._id}
                className="p-3 bg-gray-50 border rounded-lg flex justify-between"
              >
                <span className="font-semibold">{t.name}</span>
                <span className="text-sm text-gray-500">Leader: {t.leaderName}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ------------------ PROFILE DETAILS ------------------

const ProfileDetails = ({ user, isOwner }) => {
  const { setCurrentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  });

  const handleAvatarChange = () => {
    const seeds = ["John", "Jane", "Alex", "Chris", "Sam", "Taylor", "Robin"];
    const randomSeed = seeds[Math.random() * seeds.length | 0];
    setFormData({
      ...formData,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setCurrentUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/team/my-teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setTeams(data.teams);
    } catch (err) {
      console.error("Teams fetch error", err);
    }
    setTeamsOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">

            <div className="relative">
              <img
                src={formData.avatarUrl || "/default-avatar.png"}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />

              {isOwner && isEditing && (
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
                >
                  <Camera size={20} />
                </button>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left sm:mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{formData.name}</h2>
              <p className="text-gray-600">{formData.role}</p>
            </div>

            {isOwner && (
              <div className="sm:mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="px-6 pb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">

            {/* Name */}
            <div>
              <label className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-1">
                <User size={18} /> Full Name
              </label>

              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{formData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-1">
                <Mail size={18} /> Email
              </label>

              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{formData.email}</p>
              )}
            </div>

            {/* Role */}
            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-1">
                <Briefcase size={18} /> Role
              </label>

              {isEditing ? (
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{formData.role}</p>
              )}
            </div>

          </div>

          {/* Button to show teams */}
          <button
            onClick={fetchTeams}
            className="mt-4 bg-purple-600 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Users size={20} />
            View My Teams
          </button>
        </div>
      </div>

      <TeamsModal open={teamsOpen} onClose={() => setTeamsOpen(false)} teams={teams} />
    </div>
  );
};

// ------------------ MAIN APP ------------------

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="h-screen flex justify-center items-center text-xl">Loading...</div>;
  if (!currentUser) return <div className="h-screen flex justify-center items-center text-xl">Please login.</div>;

  return (
    <>
      <Header />
      <ProfileDetails user={currentUser} isOwner={true} />
    </>
  );
};

// ------------------ EXPORT ------------------

export default function UserProfileApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
