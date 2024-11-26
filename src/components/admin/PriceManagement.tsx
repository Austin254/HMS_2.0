import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DollarSign } from 'lucide-react';
import { hostels } from '../../data/hostels';

export default function PriceManagement() {
  const [prices, setPrices] = useState(
    hostels.map(hostel => ({
      id: hostel.id,
      name: hostel.name,
      price: hostel.pricePerSemester
    }))
  );

  const handlePriceUpdate = (hostelId: string, newPrice: number) => {
    setPrices(current =>
      current.map(item =>
        item.id === hostelId ? { ...item, price: newPrice } : item
      )
    );

    // In a real app, this would make an API call to update the price
    toast.success('Price updated successfully');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Price Management</h2>
      
      <div className="space-y-6">
        {prices.map((hostel) => (
          <div
            key={hostel.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{hostel.name}</h3>
              <p className="text-gray-600">Current Price: KSH {hostel.price.toLocaleString()}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={hostel.price}
                  onChange={(e) => handlePriceUpdate(hostel.id, Number(e.target.value))}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handlePriceUpdate(hostel.id, hostel.price)}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}