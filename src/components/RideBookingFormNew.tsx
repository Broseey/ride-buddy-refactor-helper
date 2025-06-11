
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Clock, Users, Car } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const RideBookingFormNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: '',
    pickupLocation: ''
  });

  // Extract preselected route from navigation state
  useEffect(() => {
    if (location.state?.preselectedRoute) {
      const { from, to } = location.state.preselectedRoute;
      setFormData(prev => ({
        ...prev,
        from: from || '',
        to: to || ''
      }));
    }
    
    if (location.state?.prefilledRide) {
      const { from, to, date, time } = location.state.prefilledRide;
      setFormData(prev => ({
        ...prev,
        from: from || '',
        to: to || '',
        date: date || '',
        time: time || ''
      }));
    }
  }, [location.state]);

  // Fetch available locations
  const { data: locations } = useQuery({
    queryKey: ['booking-locations'],
    queryFn: async () => {
      const [statesResult, universitiesResult] = await Promise.all([
        supabase.from('nigerian_states').select('*').eq('is_active', true).order('name'),
        supabase.from('nigerian_universities').select('*').eq('is_active', true).order('name')
      ]);
      
      const allLocations = [
        ...(statesResult.data || []).map(s => s.name),
        ...(universitiesResult.data || []).map(u => u.name)
      ];
      
      return {
        states: statesResult.data || [],
        universities: universitiesResult.data || [],
        allLocations
      };
    },
  });

  const createRideMutation = useMutation({
    mutationFn: async (rideData: any) => {
      if (!user) throw new Error('Must be logged in');

      const { data, error } = await supabase
        .from('rides')
        .insert([{
          user_id: user.id,
          from_location: rideData.from,
          to_location: rideData.to,
          departure_date: rideData.date,
          departure_time: rideData.time,
          seats_requested: parseInt(rideData.passengers),
          booking_type: 'ride_request',
          status: 'pending',
          pickup_location: rideData.pickupLocation,
          vehicle_type: rideData.vehicleType
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success('Ride request submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['user-rides'] });
      
      // Navigate to payment if needed
      navigate('/dashboard', { 
        state: { 
          message: 'Ride request submitted! We will match you with available rides.' 
        }
      });
    },
    onError: (error) => {
      toast.error('Failed to submit ride request');
      console.error('Error creating ride:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to book a ride');
      navigate('/signin');
      return;
    }

    if (!formData.from || !formData.to || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    createRideMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const vehicleOptions = [
    'Toyota Sienna',
    'Toyota Hiace', 
    'Toyota Corolla',
    'Honda Pilot',
    'Mercedes Sprinter',
    'Any Vehicle'
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Book Your Ride
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={formData.from}
                  onValueChange={(value) => handleInputChange('from', value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select departure location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations?.allLocations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={formData.to}
                  onValueChange={(value) => handleInputChange('to', value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations?.allLocations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Departure Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Departure Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={formData.passengers}
                  onValueChange={(value) => handleInputChange('passengers', value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Preference</Label>
              <div className="relative">
                <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleInputChange('vehicleType', value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleOptions.map((vehicle) => (
                      <SelectItem key={vehicle} value={vehicle}>{vehicle}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input
              id="pickupLocation"
              placeholder="Specific pickup address or landmark"
              value={formData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createRideMutation.isPending}
          >
            {createRideMutation.isPending ? 'Submitting...' : 'Submit Ride Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RideBookingFormNew;
