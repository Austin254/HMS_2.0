import React from 'react';
import { motion } from 'framer-motion';
import { Phone, HelpCircle, Mail } from 'lucide-react';

export default function FloatingActions() {
  const buttons = [
    { icon: <Phone className="h-6 w-6" />, label: 'Contact', color: 'bg-green-600' },
    { icon: <HelpCircle className="h-6 w-6" />, label: 'Help', color: 'bg-blue-600' },
    { icon: <Mail className="h-6 w-6" />, label: 'Email', color: 'bg-purple-600' }
  ];

  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
      {buttons.map((button, index) => (
        <motion.button
          key={button.label}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${button.color} text-white p-4 rounded-full shadow-lg flex items-center group relative`}
        >
          {button.icon}
          <span className="absolute right-14 bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {button.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}