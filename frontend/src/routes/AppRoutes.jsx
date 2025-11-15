import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "../auth/UserLogin.jsx";
import UserProfileApp from "../pages/Profile.jsx";
import AdminDashboard, { AdminWelcome } from "../pages/AdminPanel.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ActivityPage from "../pages/Activity.jsx";
import Reports from "../pages/Reports.jsx";
import Settings from "../pages/Settings.jsx";
import Sidebar from "../pages/Sidebar.jsx";
import Tasks from "../pages/Teams.jsx";
import Users from "../pages/Users.jsx";
import Roles from "../pages/Roles.jsx";
import Teams from "../pages/Teams.jsx";
import UserDetails from "../pages/UserDetails.jsx";
import AddUser from "../pages/NewUser.jsx";
import EditUser from "../pages/UpdateUser.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AddTeam from "../pages/AddTeam.jsx";
import EditTeam from "../pages/UpdateTeams.jsx";
import AdminSettings from "../pages/Settings.jsx";
import Notifications from "../pages/Notifications.jsx";
import CorporateWebsite from "../pages/Homepage.jsx";
import MyTeams from "../pages/MemberTeam.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<CorporateWebsite />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfileApp/>} />
        <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<AdminWelcome />} />
        </Route>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/teams" element={<Teams/>}/>
        <Route path="/admin/activity" element={<ActivityPage/>}/>
        <Route path="/admin/reports" element={<Reports/>}/>
        <Route path="/admin/settings" element={<AdminSettings/>}/>
        <Route path="/admin/sidebar" element={<Sidebar/>}/>
        <Route path="/admin/tasks" element={<Tasks/>}/>
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/roles" element={<Roles/>}/>
        <Route path="/user/:id" element={<UserDetails/>} />
        <Route path="/add-user" element={<AddUser/>} />
        <Route path="/user/edit/:id" element={<EditUser/>} />
        <Route path="/add-team" element={<AddTeam/>} />
        <Route path="/team/edit/:id" element={<EditTeam />} />
        <Route path="/admin/notifications" element={<Notifications/>} />
        <Route path="/my-teams" element={<MyTeams />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
