import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="relative h-64 md:h-96">
      <img
        src={images[0]}
        alt="Hostel"
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition">
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition">
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </>
      )}
    </div>
  );
}