'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiPhone, FiAlertTriangle, FiCheck } from 'react-icons/fi';

export default function DashboardContent({ projects }) {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({
    messages: true,
    notifications: true
  });
  const [stats, setStats] = useState({
    totalProjects: 0,
    unreadMessages: 0,
    unreadNotifications: 0
  });

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contact/messages');
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages);
          setStats(prev => ({
            ...prev,
            unreadMessages: data.unreadCount
          }));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    fetchMessages();
  }, []);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        if (response.ok) {
          setNotifications(data.notifications);
          setStats(prev => ({
            ...prev,
            unreadNotifications: data.unreadCount
          }));
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(prev => ({ ...prev, notifications: false }));
      }
    };

    fetchNotifications();
  }, []);

  // Update stats when projects prop changes
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalProjects: projects.length
    }));
  }, [projects]);

  // Function to mark message as read
  const markMessageAsRead = async (messageId) => {
    try {
      const response = await fetch(`/api/contact/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });

      if (response.ok) {
        setMessages(prev =>
          prev.map(msg =>
            msg._id === messageId ? { ...msg, status: 'read' } : msg
          )
        );
        setStats(prev => ({
          ...prev,
          unreadMessages: prev.unreadMessages - 1
        }));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Projects</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalProjects}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Unread Messages</p>
              <h3 className="text-3xl font-bold text-white">{stats.unreadMessages}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Unread Notifications</p>
              <h3 className="text-3xl font-bold text-white">{stats.unreadNotifications}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">Recent Projects</h2>
        <div className="space-y-4">
          {projects.slice(0, 3).map(project => (
            <div key={project.id||project._id} className="p-4 rounded-lg bg-black/20 border border-blue-900/20 hover:border-blue-700/50 transition-colors">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{project.name}</h3>
                <span className="text-xs text-gray-400">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">Notifications</h2>
          {loading.notifications ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/10 border border-blue-900/10 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification._id} className={`p-3 rounded-lg ${notification.read ? 'bg-black/10' : 'bg-blue-900/20'} border ${notification.read ? 'border-blue-900/10' : 'border-blue-700/50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-gray-400">{notification.message}</p>
                    </div>
                    {!notification.read && <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="glass-panel p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">Messages</h2>
          {loading.messages ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/10 border border-blue-900/10 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map(message => (
                <div 
                  key={message._id} 
                  className={`p-3 rounded-lg ${message.status === 'unread' ? 'bg-blue-900/20' : 'bg-black/10'} border ${message.status === 'unread' ? 'border-blue-700/50' : 'border-blue-900/10'} cursor-pointer hover:bg-blue-900/30 transition-colors`}
                  onClick={() => message.status === 'unread' && markMessageAsRead(message._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FiUser className="text-blue-400" />
                        <h3 className="font-medium">{message.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <FiMail className="text-blue-400" />
                        <p className="text-sm text-gray-400">{message.email}</p>
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-2 mt-1">
                          <FiPhone className="text-blue-400" />
                          <p className="text-sm text-gray-400">{message.phone}</p>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatRelativeTime(message.createdAt)}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <FiMessageSquare className="text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-400 line-clamp-2">{message.message}</p>
                  </div>
                  {message.status === 'unread' && (
                    <div className="flex justify-end mt-2">
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">New</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}