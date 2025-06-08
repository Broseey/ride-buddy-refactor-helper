
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Clock, Users, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import PaystackPayment from "./PaystackPayment";

const RideBookingFormNew = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [departureTime, setDepartureTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [isFullRide, setIsFullRide] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get prefilled data from navigation state
  const prefilledData = location.state?.prefilledRide;

  // Fetch states and universities
  const { data: locations } = useQuery({
    queryKey: ['booking-locations'],
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

  // Set prefilled data when component mounts
  useEffect(() => {
    if (prefilledData) {
      setFromLocation(prefilledData.from || "");
      setToLocation(prefilledData.to || "");
      if (prefilledData.date) {
        setDepartureDate(new Date(prefilledData.date));
      }
      setDepartureTime(prefilledData.time || "");
    }
  }, [prefilledData]);

  // Available vehicle types
  const vehicleTypes = [
    { value: "toyota_sienna", label: "Toyota Sienna (7 seats)", capacity: 7, basePrice: 1500 },
    { value: "toyota_hiace", label: "Toyota Hiace (14 seats)", capacity: 14, basePrice: 1200 },
    { value: "toyota_corolla", label: "Toyota Corolla (4 seats)", capacity: 4, basePrice: 2000 },
    { value: "honda_pilot", label: "Honda Pilot (7 seats)", capacity: 7, basePrice: 1800 },
    { value: "mercedes_sprinter", label: "Mercedes Sprinter (16 seats)", capacity: 16, basePrice: 1000 },
  ];

  // Available times (admin configurable in real app)
  const availableTimes = ["08:00", "12:00", "14:00"];

  // Calculate price based on route and vehicle
  const calculatePrice = () => {
    const selectedVehicle = vehicleTypes.find(v => v.value === vehicleType);
    if (!selectedVehicle) return 0;

    let basePrice = selectedVehicle.basePrice;
    
    // Apply university-specific pricing (simplified)
    if (toLocation.includes("University") || fromLocation.includes("University")) {
      basePrice *= 0.9; // 10% discount for university routes
    }

    const total = basePrice * passengers;
    
    // 10% discount for full ride booking
    if (isFullRide && passengers === selectedVehicle.capacity) {
      return total * 0.9;
    }
    
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [vehicleType, passengers, fromLocation, toLocation, isFullRide]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to book a ride");
      navigate('/signin');
      return;
    }

    if (!fromLocation || !toLocation || !departureDate || !departureTime || !vehicleType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = async (reference: string) => {
    try {
      // Create ride booking
      const { error } = await supabase
        .from('rides')
        .insert({
          user_id: user.id,
          from_location: fromLocation,
          to_location: toLocation,
          departure_date: format(departureDate!, 'yyyy-MM-dd'),
          departure_time: departureTime,
          seats_requested: passengers,
          price: totalPrice,
          booking_type: isFullRide ? 'full_ride' : 'individual',
          status: 'confirmed'
        });

      if (error) throw error;

      toast.success("Ride booked successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Failed to book ride');
    }
  };

  if (showPayment) {
    return (
      <PaystackPayment
        amount={totalPrice}
        email={user?.email || ""}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
        rideDetails={{
          from: fromLocation,
          to: toLocation,
          date: departureDate ? format(departureDate, 'PPP') : "",
          time: departureTime,
          passengers: passengers
        }}
      />
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Book Your Ride</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={fromLocation} onValueChange={setFromLocation} required>
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
              <Label htmlFor="to">To</Label>
              <Select value={toLocation} onValueChange={setToLocation} required>
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

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Departure Time</Label>
              <Select value={departureTime} onValueChange={setDepartureTime} required>
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

          {/* Vehicle Selection */}
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((vehicle) => (
                  <SelectItem key={vehicle.value} value={vehicle.value}>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{vehicle.label}</div>
                        <div className="text-sm text-gray-500">₦{vehicle.basePrice.toLocaleString()} per seat</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Passengers */}
          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <div className="flex items-center gap-4">
              <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: vehicleType ? vehicleTypes.find(v => v.value === vehicleType)?.capacity || 1 : 16 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {i + 1} {i === 0 ? 'passenger' : 'passengers'}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {vehicleType && passengers === vehicleTypes.find(v => v.value === vehicleType)?.capacity && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isFullRide}
                    onChange={(e) => setIsFullRide(e.target.checked)}
                    className="rounded"
                  />
                  Book full ride (10% discount)
                </label>
              )}
            </div>
          </div>

          {/* Price Display */}
          {vehicleType && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₦{totalPrice.toLocaleString()}</div>
                  {isFullRide && <div className="text-sm text-green-600">10% discount applied</div>}
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium">
            Continue to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RideBookingFormNew;
