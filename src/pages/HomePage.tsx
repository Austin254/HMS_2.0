import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import HostelCard from '../components/HostelCard';
import { hostels } from '../data/hostels';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHostels = hostels.filter(hostel => 
    hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hostel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Hostel at MKU
          </h1>
          <p className="text-gray-600 mb-6">
            Comfortable and secure accommodation for Mount Kenya University students
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search hostels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHostels.map((hostel, index) => (
          <motion.div
            key={hostel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HostelCard hostel={hostel} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}