import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BookingHistory from '../components/BookingHistory';
import NotificationList from '../components/NotificationList';

export default function UserDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your dashboard</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Welcome back, {user.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-900 mb-2" />
                <h3 className="font-semibold">Current Booking</h3>
                <p className="text-sm text-gray-600">Lenana Wing</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-900 mb-2" />
                <h3 className="font-semibold">Payment Status</h3>
                <p className="text-sm text-gray-600">Up to date</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <Bell className="h-6 w-6 text-purple-900 mb-2" />
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-600">2 new</p>
              </div>
            </div>
          </div>

          <BookingHistory />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NotificationList />
        </motion.div>
      </div>
    </div>
  );
}