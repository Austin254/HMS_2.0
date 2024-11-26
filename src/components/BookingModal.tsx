import React, { useState } from 'react';
import { Hostel } from '../types';
import { X, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface BookingModalProps {
  hostel: Hostel;
  onClose: () => void;
}

export default function BookingModal({ hostel, onClose }: BookingModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment process
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Initiating Mpesa payment...',
        success: 'Payment request sent! Check your phone for the STK push.',
        error: 'Payment failed. Please try again.',
      }
    );

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Book Hostel</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg">{hostel.name}</h3>
            <p className="text-gray-600">KSH {hostel.pricePerSemester.toLocaleString()} per semester</p>
          </div>

          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mpesa Phone Number
              </label>
              <input
                type="tel"
                placeholder="254700000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Pay with Mpesa</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}