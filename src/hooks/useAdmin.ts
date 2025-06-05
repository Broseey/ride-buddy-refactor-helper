
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdminUser {
  id: string;
  user_id: string;
  admin_level: 'super_admin' | 'admin' | 'moderator';
  created_at: string;
  is_active: boolean;
}

export interface RideRequest {
  id: string;
  ride_id: string;
  requested_by: string;
  request_type: 'new_ride' | 'join_ride' | 'driver_assignment';
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  processed_by?: string;
  processed_at?: string;
  created_at: string;
  rides?: {
    from_location: string;
    to_location: string;
    departure_date: string;
    departure_time: string;
    booking_type: string;
    profiles?: {
      full_name: string;
      email: string;
    };
  };
}

export const useIsAdmin = () => {
  return useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) return false;
      return !!data;
    },
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total drivers
      const { count: totalDrivers } = await supabase
        .from('driver_profiles')
        .select('*', { count: 'exact', head: true });

      // Get total rides
      const { count: totalRides } = await supabase
        .from('rides')
        .select('*', { count: 'exact', head: true });

      // Get pending requests
      const { count: pendingRequests } = await supabase
        .from('ride_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      return {
        totalUsers: totalUsers || 0,
        totalDrivers: totalDrivers || 0,
        totalRides: totalRides || 0,
        pendingRequests: pendingRequests || 0,
      };
    },
  });
};

export const useRideRequests = () => {
  return useQuery({
    queryKey: ['rideRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ride_requests')
        .select(`
          *,
          rides!inner (
            from_location,
            to_location,
            departure_date,
            departure_time,
            booking_type,
            profiles!rides_user_id_fkey (
              full_name,
              email
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as RideRequest[];
    },
  });
};

export const useProcessRideRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      requestId, 
      status, 
      notes 
    }: { 
      requestId: string; 
      status: 'approved' | 'rejected'; 
      notes?: string; 
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('ride_requests')
        .update({
          status,
          admin_notes: notes,
          processed_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rideRequests'] });
      toast.success('Request processed successfully!');
    },
    onError: () => {
      toast.error('Failed to process request');
    },
  });
};
