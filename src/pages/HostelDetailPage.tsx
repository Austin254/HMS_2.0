import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Users, Wifi, Shield, MapPin, ArrowLeft, Calendar } from 'lucide-react';
import { useHostel } from '../hooks/useHostel';
import RoomList from '../components/RoomList';
import Gallery from '../components/Gallery';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function HostelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: hostel, isLoading, isError } = useHostel(id as string);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !hostel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hostel Not Found</h2>
          <p className="text-gray-600 mb-6">The hostel you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Back to Hostels
          </button>
        </div>
      </div>
    );
  }

  const availableRooms = hostel.rooms.filter(room => !room.occupied).length;

  const handleBooking = () => {
    if (!user) {
      toast.error('Please sign in to book a hostel');
      navigate('/signin');
      return;
    }
    navigate(`/booking/${hostel.id}`);
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
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <Gallery images={[hostel.image]} />

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
              <p className="text-gray-600 mt-2">{hostel.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">
                KSH {hostel.pricePerSemester.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">per semester</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-blue-900" />
              <span>{availableRooms} rooms available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-900" />
              <span>Capacity: {hostel.capacity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-blue-900" />
              <span>Free Wi-Fi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-900" />
              <span>24/7 Security</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hostel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
            <RoomList rooms={hostel.rooms} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>Thika Main Campus, Mount Kenya University</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleBooking}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}