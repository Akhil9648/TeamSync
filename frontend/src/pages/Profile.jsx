import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { User, Mail, Briefcase, Edit2, Save, X, Camera } from 'lucide-react';

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
        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.profile);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
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
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
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
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
    </header>
  );
};

// ------------------ PROFILE DETAILS ------------------

const ProfileDetails = ({ user, isOwner }) => {
  const { setCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setCurrentUser({
      ...user,
      ...formData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
    });
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    const seeds = ['John', 'Jane', 'Alex', 'Sam', 'Chris', 'Morgan', 'Taylor', 'Jordan'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setFormData({
      ...formData,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
    });
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
                alt={formData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white"
              />

              {isOwner && isEditing && (
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                  <Camera size={20} />
                </button>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left sm:mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.role}</p>
            </div>

            {isOwner && (
              <div className="sm:mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      <Save size={18} />
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
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
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={18} /> Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={18} /> Email Address
              </label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.email}</p>
              )}
            </div>

            {/* Role */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase size={18} /> Role
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.role}</p>
              )}
            </div>

            {/* Avatar URL (edit mode only) */}
            {isEditing && (
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Avatar URL
                </label>

                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Or click the camera icon on your avatar to generate a random one.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};


// ------------------ MAIN APP ------------------

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading)
    return <div className="flex justify-center items-center h-screen text-xl">Loading profile...</div>;

  if (!currentUser)
    return <div className="flex justify-center items-center h-screen text-xl">Please login to view your profile.</div>;

  const isOwner = true;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ProfileDetails user={currentUser} isOwner={isOwner} />
    </div>
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
