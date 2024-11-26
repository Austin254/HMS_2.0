import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}