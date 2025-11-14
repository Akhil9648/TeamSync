import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCog, ListChecks, Shield, Activity, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/users", label: "Users", icon: UserCog },
  { to: "/tasks", label: "Task Management", icon: ListChecks },
  { to: "/roles", label: "Roles & Permissions", icon: Shield },
  { to: "/activity", label: "Activity Logs", icon: Activity },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <nav className="flex flex-col p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
