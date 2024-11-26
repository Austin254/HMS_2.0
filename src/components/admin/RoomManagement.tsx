import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Home, User, UserX } from 'lucide-react';
import { hostels } from '../../data/hostels';
import { Room } from '../../types';

export default function RoomManagement() {
  const [selectedHostel, setSelectedHostel] = useState(hostels[0].id);
  const [rooms, setRooms] = useState(hostels[0].rooms);

  const handleHostelChange = (hostelId: string) => {
    const hostel = hostels.find(h => h.id === hostelId);
    if (hostel) {
      setSelectedHostel(hostelId);
      setRooms(hostel.rooms);
    }
  };

  const toggleRoomStatus = (roomId: string) => {
    setRooms(current =>
      current.map(room =>
        room.id === roomId ? { ...room, occupied: !room.occupied } : room
      )
    );
    toast.success('Room status updated successfully');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Hostel
        </label>
        <select
          value={selectedHostel}
          onChange={(e) => handleHostelChange(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {hostels.map((hostel) => (
            <option key={hostel.id} value={hostel.id}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Home className="h-5 w-5 text-blue-900" />
              <div>
                <p className="font-semibold">Room {room.number}</p>
                <p className="text-sm text-gray-600">{room.type}</p>
              </div>
            </div>
            
            <button
              onClick={() => toggleRoomStatus(room.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                room.occupied
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              {room.occupied ? (
                <>
                  <User className="h-4 w-4" />
                  <span>Occupied</span>
                </>
              ) : (
                <>
                  <UserX className="h-4 w-4" />
                  <span>Vacant</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}