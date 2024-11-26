import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { hostels } from '../../data/hostels';

export default function HostelManagement() {
  const handleEdit = (hostelId: string) => {
    // Implement edit functionality
  };

  const handleDelete = (hostelId: string) => {
    // Implement delete functionality
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hostel Management</h2>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition">
          <Plus className="h-5 w-5" />
          <span>Add Hostel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {hostels.map((hostel) => (
          <motion.div
            key={hostel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{hostel.name}</h3>
                  <p className="text-gray-600">{hostel.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hostel.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(hostel.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(hostel.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}