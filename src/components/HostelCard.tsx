import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Users, Wifi, Shield } from 'lucide-react';
import { Hostel } from '../types';

interface HostelCardProps {
  hostel: Hostel;
}

export default function HostelCard({ hostel }: HostelCardProps) {
  const navigate = useNavigate();
  const availableRooms = hostel.rooms.filter(room => !room.occupied).length;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/hostel/${hostel.id}`)}
    >
      <div className="relative">
        <img 
          src={hostel.image} 
          alt={hostel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {availableRooms} rooms available
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{hostel.name}</h3>
        <p className="text-gray-600 mb-4">{hostel.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Bed className="h-5 w-5 text-blue-900" />
            <span className="text-sm">{hostel.capacity} capacity</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-900" />
            <span className="text-sm">{availableRooms} available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-blue-900" />
            <span className="text-sm">Free Wi-Fi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-900" />
            <span className="text-sm">24/7 Security</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Price per Semester</p>
            <p className="text-xl font-bold text-blue-900">
              KSH {hostel.pricePerSemester.toLocaleString()}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/booking/${hostel.id}`);
            }}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}