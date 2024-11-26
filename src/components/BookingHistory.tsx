import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, CheckCircle } from 'lucide-react';

export default function BookingHistory() {
  const bookings = [
    {
      id: '1',
      hostelName: 'Lenana Wing',
      roomNumber: 'LW101',
      checkInDate: '2024-01-01',
      checkOutDate: '2024-04-30',
      amount: 35000,
      status: 'confirmed'
    },
    {
      id: '2',
      hostelName: 'Medical School Hostel',
      roomNumber: 'MS205',
      checkInDate: '2024-01-01',
      checkOutDate: '2024-04-30',
      amount: 45000,
      status: 'pending'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold mb-6">Your Booking History</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{booking.hostelName}</h3>
                <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {booking.checkInDate} - {booking.checkOutDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">
                    KSH {booking.amount.toLocaleString()}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>{booking.status}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}