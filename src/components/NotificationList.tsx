import React from 'react';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';

export default function NotificationList() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      message: 'Your booking has been confirmed',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'Maintenance scheduled for next week',
      time: '1 day ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <Bell className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
            ) : (
              <AlertCircle className="h-5 w-5 text-blue-500 mt-1" />
            )}
            <div>
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}