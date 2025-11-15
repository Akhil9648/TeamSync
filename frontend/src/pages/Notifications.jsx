import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';  // ✅ Already correct
import { ArrowLeft, Bell, CheckCheck, Trash2, Users, ListChecks, UserCog, AlertCircle } from 'lucide-react';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'team': return <Users size={20} className="text-blue-600" />;
    case 'task': return <ListChecks size={20} className="text-green-600" />;
    case 'user': return <UserCog size={20} className="text-purple-600" />;
    case 'alert': return <AlertCircle size={20} className="text-red-600" />;
    default: return <Bell size={20} className="text-slate-600" />;
  }
};

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Sample notifications (replace with API call)
  const sampleNotifications = [
    {
      id: 1,
      type: 'team',
      title: 'New Team Created',
      message: 'Sarah Johnson created a new team "DevOps Squad"',
      timestamp: '2 minutes ago',
      read: false,
      link: '/admin/teams'
    },
    {
      id: 2,
      type: 'task',
      title: 'Task Completed',
      message: 'Michael Chen marked "API Integration" as complete',
      timestamp: '15 minutes ago',
      read: false,
      link: '/admin/tasks'
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Added',
      message: 'John Doe was added to your organization',
      timestamp: '1 hour ago',
      read: true,
      link: '/admin/users'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Security Alert',
      message: 'Failed login attempt detected from unknown device',
      timestamp: '2 hours ago',
      read: false,
      link: '/admin/settings'
    },
    {
      id: 5,
      type: 'task',
      title: 'Task Assigned',
      message: 'You have been assigned to "Database Migration" task',
      timestamp: '3 hours ago',
      read: true,
      link: '/admin/tasks'
    },
    {
      id: 6,
      type: 'team',
      title: 'Team Member Joined',
      message: 'Lisa Anderson joined the "Design Team"',
      timestamp: '5 hours ago',
      read: true,
      link: '/admin/teams'
    },
    {
      id: 7,
      type: 'task',
      title: 'Deadline Approaching',
      message: 'Task "UI Redesign" is due in 2 days',
      timestamp: '1 day ago',
      read: true,
      link: '/admin/tasks'
    },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          setNotifications(sampleNotifications);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setNotifications(sampleNotifications);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      // ✅ Fixed: Removed duplicate line
      await fetch(`${API_BASE}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      // ✅ Fixed: Removed duplicate line
      await fetch(`${API_BASE}/api/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notification?')) return;

    try {
      const token = localStorage.getItem('token');
      // ✅ Fixed: Removed duplicate line
      await fetch(`${API_BASE}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-slate-600">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
          >
            <CheckCheck size={20} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'unread'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'read'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Read ({notifications.length - unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer ${
                  !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${
                    !notification.read ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={`font-semibold text-slate-900 dark:text-white ${
                          !notification.read ? 'font-bold' : ''
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                          {notification.timestamp}
                        </p>
                      </div>

                      {/* Unread Badge */}
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                        title="Mark as read"
                      >
                        <CheckCheck size={18} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-slate-500">
            <Bell size={48} className="mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium">No {filter !== 'all' ? filter : ''} notifications</p>
            <p className="text-sm mt-2">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
