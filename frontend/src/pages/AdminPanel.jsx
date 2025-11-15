import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  ListChecks,
  Shield,
  Activity,
  BarChart3,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Sidebar menu items
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "teams", label: "Teams", icon: Users, path: "/admin/teams" },
  { id: "users", label: "Users", icon: UserCog, path: "/admin/users" },
  { id: "tasks", label: "Task Management", icon: ListChecks, path: "/admin/tasks" },
  { id: "roles", label: "Roles & Permissions", icon: Shield, path: "/admin/roles" },
  { id: "activity", label: "Activity Logs", icon: Activity, path: "/admin/activity" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
];

// Welcome screen for /admin default
const AdminWelcome = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Welcome back, {user?.name || 'Admin'}! 👋
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Use the navigation sidebar to manage your workspace
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">
          {/* Manage Teams Card */}
          <button
            onClick={() => navigate('/admin/teams')}
            className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-left"
          >
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Manage Teams</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Create and organize your teams</p>
          </button>

          {/* Track Tasks Card */}
          <button
            onClick={() => navigate('/admin/tasks')}
            className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-left"
          >
            <ListChecks className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Track Tasks</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Monitor project progress</p>
          </button>

          {/* View Reports Card */}
          <button
            onClick={() => navigate('/admin/reports')}
            className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-left"
          >
            <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">View Reports</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Analyze team performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Admin Panel Layout
const AdminPanel = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Fetch current user details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle notifications
  const handleNotifications = () => {
    navigate('/admin/notifications');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WorkFlow
            </h1>
            <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'Admin'}`}
              alt={currentUser?.name || 'Admin'}
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentUser?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser?.email || 'admin@company.com'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition" 
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              className="lg:hidden text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </form>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleNotifications}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 rounded-lg transition"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <button 
                onClick={() => navigate('/admin/settings')}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              >
                <img
                  src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'Admin'}`}
                  alt={currentUser?.name || 'Admin'}
                  className="w-10 h-10 rounded-full border-2 border-blue-400 hover:border-blue-500 transition cursor-pointer"
                />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <Outlet context={{ user: currentUser }} />
        </main>

        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-400">
            <p>© 2025 WorkFlow. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export { AdminWelcome };
export default AdminPanel;
