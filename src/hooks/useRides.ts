
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Ride {
  id: string;
  user_id: string;
  driver_id?: string;
  company_id?: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  seats_requested: number;
  booking_type: 'join' | 'full';
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  pickup_location?: string;
  created_at: string;
  updated_at: string;
}

export const useUserRides = () => {
  return useQuery({
    queryKey: ['userRides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Ride[];
    },
  });
};

export const useCreateRide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (rideData: Omit<Ride, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('rides')
        .insert([{
          ...rideData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Create a ride request for admin notification
      await supabase
        .from('ride_requests')
        .insert([{
          ride_id: data.id,
          requested_by: user.id,
          request_type: 'new_ride'
        }]);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userRides'] });
      toast.success('Ride request submitted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create ride request');
      console.error('Error creating ride:', error);
    },
  });
};
