import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
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

// Optional: Welcome screen for /admin default
const AdminWelcome = () => (
  <div className="flex flex-col items-center justify-center h-[60vh]">
    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
      Welcome to the WorkFlow Admin Panel!
    </h1>
    <p className="text-lg text-slate-600 dark:text-slate-300">
      Use the navigation sidebar to view dashboards, manage teams, and more.
    </p>
  </div>
);

// --- MAIN ADMIN PANEL LAYOUT ---
const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
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
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
              end
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Admin User</p>
              <p className="text-xs text-slate-400">admin@company.com</p>
            </div>
            <button className="text-slate-400 hover:text-red-400 transition" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              className="lg:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-white dark:bg-slate-900">
          {/* Show AdminWelcome by default if no child route rendered */}
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-400">
            <p>© 2025 WorkFlow. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPanel;
