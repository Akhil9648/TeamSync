import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "../auth/UserLogin.jsx";
import UserProfileApp from "../pages/Profile.jsx";
import AdminDashboard from "../pages/AdminPanel.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ActivityPage from "../pages/Activity.jsx";
import Reports from "../pages/Reports.jsx";
import Settings from "../pages/Settings.jsx";
import Sidebar from "../pages/Sidebar.jsx";
import Tasks from "../pages/Teams.jsx";
import Users from "../pages/Users.jsx";
import Roles from "../pages/Roles.jsx";
import Teams from "../pages/Teams.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfileApp/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/teams" element={<Teams/>}/>
        <Route path="/admin/activity" element={<ActivityPage/>}/>
        <Route path="/admin/reports" element={<Reports/>}/>
        <Route path="/admin/settings" element={<Settings/>}/>
        <Route path="/admin/sidebar" element={<Sidebar/>}/>
        <Route path="/admin/tasks" element={<Tasks/>}/>
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/roles" element={<Roles/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
