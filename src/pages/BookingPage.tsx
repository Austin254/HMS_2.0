import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useHostel } from '../hooks/useHostel';
import { useAuth } from '../context/AuthContext';
import PaymentForm from '../components/PaymentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Calendar, CreditCard, User } from 'lucide-react';

export default function BookingPage() {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const { data: hostel, isLoading } = useHostel(hostelId as string);
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    studentId: user?.studentId || '',
    checkInDate: '',
    checkOutDate: '',
    emergencyContact: '',
    phoneNumber: ''
  });

  if (isLoading) return <LoadingSpinner />;
  if (!hostel) return <div>Hostel not found</div>;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) {
      toast.error('Please select a room');
      return;
    }
    setStep(2);
  };

  const handlePayment = async (paymentDetails: any) => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    setLoading(true);
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking successful! Check your email for confirmation.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between mb-8">
          <div className={`flex-1 text-center ${step === 1 ? 'text-blue-900' : 'text-gray-400'}`}>
            <div className="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center mb-2">1</div>
            <span>Details</span>
          </div>
          <div className={`flex-1 text-center ${step === 2 ? 'text-blue-900' : 'text-gray-400'}`}>
            <div className="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center mb-2">2</div>
            <span>Payment</span>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleDetailsSubmit}>
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Selected Hostel</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{hostel.name}</p>
                <p className="text-gray-600">KSH {hostel.pricePerSemester.toLocaleString()} per semester</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Room
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a room...</option>
                {hostel.rooms
                  .filter(room => !room.occupied)
                  .map(room => (
                    <option key={room.id} value={room.id}>
                      Room {room.number} ({room.type})
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={bookingDetails.checkInDate}
                  onChange={(e) => setBookingDetails({...bookingDetails, checkInDate: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={bookingDetails.checkOutDate}
                  onChange={(e) => setBookingDetails({...bookingDetails, checkOutDate: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="tel"
                placeholder="Emergency contact number"
                value={bookingDetails.emergencyContact}
                onChange={(e) => setBookingDetails({...bookingDetails, emergencyContact: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Continue to Payment</span>
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Booking Summary</h2>
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Hostel:</span>
                  <span className="font-medium">{hostel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span className="font-medium">
                    {hostel.rooms.find(r => r.id === selectedRoom)?.number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">{bookingDetails.checkInDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">{bookingDetails.checkOutDate}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="font-bold text-blue-900">
                    KSH {hostel.pricePerSemester.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <PaymentForm
              amount={hostel.pricePerSemester}
              onSubmit={handlePayment}
              loading={loading}
            />

            <button
              onClick={() => setStep(1)}
              className="mt-4 w-full bg-gray-100 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Details</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}