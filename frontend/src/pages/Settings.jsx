import React from "react";

const Settings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">Organization Name</label>
            <input type="text" defaultValue="WorkFlow Inc." className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">Time Zone</label>
            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-6 (Central Time)</option>
              <option>UTC-7 (Mountain Time)</option>
              <option>UTC-8 (Pacific Time)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive email updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Task Reminders</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get reminded about deadlines</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Team Updates</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Notifications about team activity</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end gap-3">
      <button className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
        Cancel
      </button>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Save Changes
      </button>
    </div>
  </div>
);
export default Settings;
