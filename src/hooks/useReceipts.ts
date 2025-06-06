
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Receipt {
  id: string;
  ride_id: string;
  user_id: string;
  receipt_number: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  payment_method?: string;
  receipt_data?: any;
  generated_at: string;
  rides?: {
    from_location: string;
    to_location: string;
    departure_date: string;
    departure_time: string;
  };
}

export const useUserReceipts = () => {
  return useQuery({
    queryKey: ['userReceipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ride_receipts')
        .select(`
          *,
          rides (
            from_location,
            to_location,
            departure_date,
            departure_time
          )
        `)
        .order('generated_at', { ascending: false });

      if (error) throw error;
      return data as Receipt[];
    },
  });
};

export const useGenerateReceipt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      rideId, 
      amount, 
      paymentMethod 
    }: { 
      rideId: string; 
      amount: number; 
      paymentMethod?: string; 
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const taxAmount = amount * 0.075; // 7.5% VAT
      const totalAmount = amount + taxAmount;

      const { data, error } = await supabase
        .from('ride_receipts')
        .insert([{
          ride_id: rideId,
          user_id: user.id,
          amount,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          payment_method: paymentMethod || 'Card',
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReceipts'] });
      toast.success('Receipt generated successfully!');
    },
    onError: () => {
      toast.error('Failed to generate receipt');
    },
  });
};
