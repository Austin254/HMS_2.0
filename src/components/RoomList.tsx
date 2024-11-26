import React from 'react';
import { motion } from 'framer-motion';
import { Bed, User, DoorClosed } from 'lucide-react';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const availableRooms = rooms.filter(room => !room.occupied);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          {availableRooms.length} of {rooms.length} rooms available
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg border ${
              room.occupied ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DoorClosed className="h-5 w-5 text-blue-900" />
                <div>
                  <p className="font-medium">Room {room.number}</p>
                  <p className="text-sm text-gray-600 capitalize">{room.type}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-2 ${
                room.occupied ? 'text-red-500' : 'text-green-500'
              }`}>
                {room.occupied ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bed className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">
                  {room.occupied ? 'Occupied' : 'Available'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}