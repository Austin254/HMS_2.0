export interface Room {
  id: string;
  number: string;
  type: 'single' | 'shared';
  occupied: boolean;
  occupantId?: string;
}

export interface Hostel {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  pricePerSemester: number;
  amenities: string[];
  available: boolean;
  rooms: Room[];
  features: string[];
}

export interface Booking {
  id: string;
  hostelId: string;
  roomId: string;
  studentId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed';
  amount: number;
}

export interface Admin {
  id: string;
  username: string;
  role: 'admin' | 'super_admin';
}

export interface PriceUpdate {
  hostelId: string;
  newPrice: number;
  updatedAt: Date;
  updatedBy: string;
}