import { Hostel } from '../types';

function generateRooms(count: number, prefix: string) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    number: `${prefix}${i + 1}`,
    type: i % 3 === 0 ? 'single' : 'shared' as const,
    occupied: Math.random() > 0.7
  }));
}

export const hostels: Hostel[] = [
  {
    id: 'lenana-wing',
    name: 'Lenana Wing',
    description: 'Modern men\'s hostel wing at Thika Main Campus featuring comfortable accommodations and study areas.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80',
    capacity: 200,
    pricePerSemester: 35000,
    amenities: ['Wi-Fi', 'Study Areas', 'Common Room', 'Security', 'Cleaning Service'],
    available: true,
    rooms: generateRooms(50, 'LW'),
    features: ['24/7 Security', 'Modern Furniture', 'Spacious Rooms', 'Power Backup']
  },
  {
    id: 'batian-nelion-wing',
    name: 'Batian & Nelion Wing',
    description: 'Premium men\'s hostel wing offering modern facilities and a conducive learning environment.',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80',
    capacity: 250,
    pricePerSemester: 40000,
    amenities: ['Wi-Fi', 'Study Rooms', 'TV Room', '24/7 Security', 'Laundry'],
    available: true,
    rooms: generateRooms(60, 'BN'),
    features: ['Premium Furnishing', 'Study Lounges', 'High-Speed Internet', 'Recreation Area']
  },
  {
    id: 'medical-school',
    name: 'Medical School Students Hostel',
    description: 'Dedicated hostel for medical students with specialized facilities and proximity to medical school.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80',
    capacity: 150,
    pricePerSemester: 45000,
    amenities: ['Wi-Fi', 'Study Labs', 'Library Access', 'Security', 'Dining Area'],
    available: true,
    rooms: generateRooms(40, 'MS'),
    features: ['Proximity to Hospital', 'Study Labs', '24/7 Library Access', 'Quiet Zones']
  },
  {
    id: 'ladies-hostel',
    name: 'Ladies Hostel',
    description: 'Executive ladies hostel with two wings offering premium accommodation and enhanced security.',
    image: 'https://images.unsplash.com/photo-1626888126710-89d091d10f3c?auto=format&fit=crop&q=80',
    capacity: 300,
    pricePerSemester: 42000,
    amenities: ['Wi-Fi', 'Study Areas', 'Beauty Salon', 'Enhanced Security', 'Laundry'],
    available: true,
    rooms: generateRooms(75, 'LH'),
    features: ['Female Security Guards', 'Beauty Salon', 'Modern Kitchen', 'CCTV Surveillance']
  }
];