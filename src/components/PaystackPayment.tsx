
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface PaystackPaymentProps {
  amount: number;
  email: string;
  onSuccess: () => void;
  onClose: () => void;
  bookingData: any;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  email,
  onSuccess,
  onClose,
  bookingData
}) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!window.PaystackPop) {
      toast.error('Payment system not loaded. Please refresh and try again.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_test_b8a1ce65c6c8717c676c5d5fbdba9ab1d4a9c3d0',
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
      ref: `uniride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        booking_data: JSON.stringify(bookingData),
        user_email: email
      },
      callback: async (response: any) => {
        console.log('Payment successful:', response);
        
        try {
          // Get current user
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !user) {
            toast.error('Authentication error. Please sign in again.');
            return;
          }

          // Create the ride record
          const rideData = {
            user_id: user.id,
            from_location: bookingData.from,
            to_location: bookingData.to,
            departure_date: bookingData.date,
            departure_time: bookingData.time,
            vehicle_type: bookingData.vehicle,
            booking_type: bookingData.bookingType,
            passenger_count: bookingData.passengers || 1,
            amount: amount,
            payment_reference: response.reference,
            status: 'confirmed'
          };

          console.log('Creating ride with data:', rideData);

          const { data: ride, error: rideError } = await supabase
            .from('rides')
            .insert(rideData)
            .select()
            .single();

          if (rideError) {
            console.error('Error creating ride:', rideError);
            toast.error('Failed to complete booking. Please contact support.');
            return;
          }

          console.log('Ride created successfully:', ride);
          toast.success('Booking confirmed! Payment successful.');
          onSuccess();
          
          // Navigate to dashboard after successful booking
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);

        } catch (error) {
          console.error('Error processing payment:', error);
          toast.error('Failed to complete booking. Please contact support.');
        }
      },
      onClose: () => {
        console.log('Payment cancelled');
        onClose();
      }
    });

    handler.openIframe();
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Payment Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Amount:</span>
          <span className="font-medium">₦{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Route:</span>
          <span>{bookingData.from} → {bookingData.to}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Date:</span>
          <span>{bookingData.date}</span>
        </div>
      </div>
      
      <Button 
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        Pay ₦{amount.toLocaleString()} with Paystack
      </Button>
    </div>
  );
};

export default PaystackPayment;
