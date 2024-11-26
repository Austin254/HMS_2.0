import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader className="h-8 w-8 text-blue-900 animate-spin" />
    </div>
  );
}