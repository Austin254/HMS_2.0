import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader, AlertCircle } from 'lucide-react';
import { validateKenyanPhoneNumber } from '../utils/phoneValidation';
import { initiateSTKPush } from '../services/mpesa';
import { toast } from 'react-hot-toast';

interface PaymentFormProps {
  amount: number;
  onSubmit: (details: any) => void;
  loading: boolean;
}

export default function PaymentForm({ amount, onSubmit, loading }: PaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, formatted } = validateKenyanPhoneNumber(phoneNumber);

    if (!isValid) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setError('');
    try {
      // Initiate M-Pesa STK Push
      await initiateSTKPush(formatted, amount);
      toast.success('Please check your phone for the M-Pesa prompt');
      onSubmit({ phoneNumber: formatted });
    } catch (error) {
      toast.error('Payment initiation failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t pt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g., 0712345678"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError('');
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              error ? 'border-red-500' : ''
            }`}
            required
          />
          {error && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium dark:text-gray-300">Total Amount:</span>
            <span className="text-xl font-bold text-blue-900 dark:text-blue-400">
              KSH {amount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <CreditCard className="h-5 w-5" />
          )}
          <span>Pay with M-Pesa</span>
        </button>
      </form>
    </motion.div>
  );
}