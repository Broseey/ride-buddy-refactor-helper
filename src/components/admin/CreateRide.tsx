
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CreateRide = () => {
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    departureTime: '',
    vehicleCapacity: '',
    pricePerSeat: '',
    vehicleType: '',
    description: ''
  });

  const queryClient = useQueryClient();

  // Fetch locations for dropdown
  const { data: locations } = useQuery({
    queryKey: ['admin-locations'],
    queryFn: async () => {
      const [statesResult, universitiesResult] = await Promise.all([
        supabase.from('nigerian_states').select('*').eq('is_active', true).order('name'),
        supabase.from('nigerian_universities').select('*').eq('is_active', true).order('name')
      ]);
      
      return {
        states: statesResult.data || [],
        universities: universitiesResult.data || []
      };
    },
  });

  const createRideMutation = useMutation({
    mutationFn: async (rideData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('rides')
        .insert([{
          from_location: rideData.fromLocation,
          to_location: rideData.toLocation,
          departure_date: rideData.departureDate,
          departure_time: rideData.departureTime,
          seats_requested: parseInt(rideData.vehicleCapacity),
          price: parseFloat(rideData.pricePerSeat) * parseInt(rideData.vehicleCapacity),
          booking_type: 'admin_created',
          status: 'available',
          user_id: user.id,
          vehicle_capacity: parseInt(rideData.vehicleCapacity),
          price_per_seat: parseFloat(rideData.pricePerSeat),
          vehicle_type: rideData.vehicleType
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Ride created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-rides'] });
      queryClient.invalidateQueries({ queryKey: ['available-rides'] });
      setFormData({
        fromLocation: '',
        toLocation: '',
        departureDate: '',
        departureTime: '',
        vehicleCapacity: '',
        pricePerSeat: '',
        vehicleType: '',
        description: ''
      });
    },
    onError: (error) => {
      toast.error('Failed to create ride');
      console.error('Error creating ride:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fromLocation || !formData.toLocation || !formData.departureDate || 
        !formData.departureTime || !formData.vehicleCapacity || !formData.pricePerSeat) {
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

  // Available times
  const availableTimes = ["08:00", "12:00", "14:00"];

  // Vehicle types
  const vehicleTypes = [
    { value: "Toyota Sienna", capacity: 7 },
    { value: "Toyota Hiace", capacity: 14 },
    { value: "Toyota Corolla", capacity: 4 },
    { value: "Honda Pilot", capacity: 7 },
    { value: "Mercedes Sprinter", capacity: 16 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Ride
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromLocation">From Location *</Label>
              <Select value={formData.fromLocation} onValueChange={(value) => handleInputChange('fromLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select departure location" />
                </SelectTrigger>
                <SelectContent>
                  <div className="font-semibold text-sm text-gray-500 px-2 py-1">States</div>
                  {locations?.states.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {state.name}
                      </div>
                    </SelectItem>
                  ))}
                  <div className="font-semibold text-sm text-gray-500 px-2 py-1 mt-2">Universities</div>
                  {locations?.universities.map((university) => (
                    <SelectItem key={university.id} value={university.name}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {university.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toLocation">To Location *</Label>
              <Select value={formData.toLocation} onValueChange={(value) => handleInputChange('toLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <div className="font-semibold text-sm text-gray-500 px-2 py-1">States</div>
                  {locations?.states.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {state.name}
                      </div>
                    </SelectItem>
                  ))}
                  <div className="font-semibold text-sm text-gray-500 px-2 py-1 mt-2">Universities</div>
                  {locations?.universities.map((university) => (
                    <SelectItem key={university.id} value={university.name}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {university.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time *</Label>
              <Select value={formData.departureTime} onValueChange={(value) => handleInputChange('departureTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type *</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => {
                handleInputChange('vehicleType', value);
                const vehicle = vehicleTypes.find(v => v.value === value);
                if (vehicle) {
                  handleInputChange('vehicleCapacity', vehicle.capacity.toString());
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((vehicle) => (
                    <SelectItem key={vehicle.value} value={vehicle.value}>
                      {vehicle.value} ({vehicle.capacity} seats)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleCapacity">Vehicle Capacity *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="vehicleCapacity"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="6"
                  value={formData.vehicleCapacity}
                  onChange={(e) => handleInputChange('vehicleCapacity', e.target.value)}
                  className="pl-10"
                  required
                  readOnly={!!formData.vehicleType}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerSeat">Price per Seat (₦) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="pricePerSeat"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1200"
                  value={formData.pricePerSeat}
                  onChange={(e) => handleInputChange('pricePerSeat', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about the ride..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createRideMutation.isPending}
          >
            {createRideMutation.isPending ? 'Creating Ride...' : 'Create Ride'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRide;
