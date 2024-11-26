import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, Settings } from 'lucide-react';
import HostelManagement from './HostelManagement';
import RoomManagement from './RoomManagement';
import PriceManagement from './PriceManagement';
import BookingHistory from './BookingHistory';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('hostels');

  const tabs = [
    { id: 'hostels', label: 'Hostels', icon: <Building className="h-5 w-5" /> },
    { id: 'rooms', label: 'Rooms', icon: <Users className="h-5 w-5" /> },
    { id: 'prices', label: 'Pricing', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Settings className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'hostels':
        return <HostelManagement />;
      case 'rooms':
        return <RoomManagement />;
      case 'prices':
        return <PriceManagement />;
      case 'bookings':
        return <BookingHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 px-4 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}