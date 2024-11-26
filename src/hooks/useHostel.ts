import { useQuery } from '@tanstack/react-query';
import { hostels } from '../data/hostels';
import { Hostel } from '../types';

export function useHostel(id: string) {
  return useQuery<Hostel | undefined>({
    queryKey: ['hostel', id],
    queryFn: () => {
      // Find hostel directly from data
      const hostel = hostels.find(h => h.id === id);
      if (!hostel) {
        throw new Error('Hostel not found');
      }
      return hostel;
    },
    retry: false,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
}