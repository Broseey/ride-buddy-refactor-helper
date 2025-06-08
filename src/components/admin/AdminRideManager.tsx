
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin, Calendar, Clock, Users, DollarSign, Car } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminRideManager = () => {
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    departureTime: '',
    totalSeats: '',
    price: '',
    vehicleType: '',
    description: ''
  });

  const queryClient = useQueryClient();

  // Fetch available locations
  const { data: locations } = useQuery({
    queryKey: ['admin-locations'],
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
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('rides')
        .insert([{
          from_location: rideData.fromLocation,
          to_location: rideData.toLocation,
          departure_date: rideData.departureDate,
          departure_time: rideData.departureTime,
          seats_requested: parseInt(rideData.totalSeats),
          price: parseFloat(rideData.price),
          booking_type: 'available',
          status: 'available',
          user_id: userData.user?.id,
          vehicle_type: rideData.vehicleType,
          description: rideData.description
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Available ride created successfully!');
      queryClient.invalidateQueries({ queryKey: ['available-rides'] });
      setFormData({
        fromLocation: '',
        toLocation: '',
        departureDate: '',
        departureTime: '',
        totalSeats: '',
        price: '',
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
        !formData.departureTime || !formData.totalSeats || !formData.price) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Available Ride
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromLocation">From Location *</Label>
              <Select
                value={formData.fromLocation}
                onValueChange={(value) => handleInputChange('fromLocation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select departure location" />
                </SelectTrigger>
                <SelectContent>
                  {locations?.allLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toLocation">To Location *</Label>
              <Select
                value={formData.toLocation}
                onValueChange={(value) => handleInputChange('toLocation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination location" />
                </SelectTrigger>
                <SelectContent>
                  {locations?.allLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date *</Label>
              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time *</Label>
              <Input
                id="departureTime"
                type="time"
                value={formData.departureTime}
                onChange={(e) => handleInputChange('departureTime', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalSeats">Total Seats *</Label>
              <Input
                id="totalSeats"
                type="number"
                min="1"
                max="20"
                placeholder="6"
                value={formData.totalSeats}
                onChange={(e) => handleInputChange('totalSeats', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per Seat (₦) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="100"
                placeholder="1200"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toyota Sienna">Toyota Sienna</SelectItem>
                  <SelectItem value="Toyota Hiace">Toyota Hiace</SelectItem>
                  <SelectItem value="Toyota Corolla">Toyota Corolla</SelectItem>
                  <SelectItem value="Honda Pilot">Honda Pilot</SelectItem>
                  <SelectItem value="Mercedes Sprinter">Mercedes Sprinter</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
            {createRideMutation.isPending ? 'Creating Ride...' : 'Create Available Ride'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminRideManager;
