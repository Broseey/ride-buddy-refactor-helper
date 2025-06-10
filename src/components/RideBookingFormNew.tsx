import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock, Users, Car } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import PaystackPayment from "./PaystackPayment";
import { supabase } from "@/integrations/supabase/client";

const RideBookingFormNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState("schedule");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [bookingType, setBookingType] = useState("join");
  const [showPayment, setShowPayment] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Available universities (only Afebabalola is enabled)
  const universities = [
    { value: "afebabalola-university", label: "Afebabalola University", enabled: true },
    { value: "university-of-ibadan", label: "University of Ibadan", enabled: false },
    { value: "lagos-state-university", label: "Lagos State University", enabled: false },
    { value: "covenant-university", label: "Covenant University", enabled: false },
    { value: "obafemi-awolowo-university", label: "Obafemi Awolowo University", enabled: false },
  ];

  // Vehicle options (simplified)
  const vehicleOptions = [
    { value: "standard", label: "Standard Car", capacity: 4, basePrice: 3000 },
    { value: "suv", label: "SUV", capacity: 6, basePrice: 4500 },
    { value: "minibus", label: "Mini Bus", capacity: 8, basePrice: 6000 },
  ];

  useEffect(() => {
    // Pre-fill form from navigation state
    if (location.state?.prefilledRoute) {
      const { from, to } = location.state.prefilledRoute;
      setFromLocation(from);
      setToLocation(to);
    }
    if (location.state?.prefilledRide) {
      const { from, to, date, time } = location.state.prefilledRide;
      setFromLocation(from);
      setToLocation(to);
      setDepartureDate(date);
      setDepartureTime(time);
      setActiveTab("join");
      setBookingType("join");
    }
  }, [location.state]);

  // Calculate price based on booking type and passengers
  useEffect(() => {
    if (vehicleType && passengers > 0) {
      const vehicle = vehicleOptions.find(v => v.value === vehicleType);
      if (vehicle) {
        let price = vehicle.basePrice;
        
        if (bookingType === "whole") {
          // 10% discount for whole ride booking
          price = price * 0.9;
        } else {
          // Per seat pricing for join ride
          price = Math.round(price / vehicle.capacity) * passengers;
        }
        
        setCalculatedPrice(Math.round(price));
      }
    }
  }, [vehicleType, passengers, bookingType]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    // For join rides, check if the selected route has available rides
    if (bookingType === "join") {
      const { data: availableRides } = await supabase
        .from('rides')
        .select('*, ride_bookings(*)')
        .eq('from_location', fromLocation)
        .eq('to_location', toLocation)
        .eq('status', 'available')
        .gte('departure_date', departureDate);

      if (!availableRides || availableRides.length === 0) {
        toast.error("No available rides for this route. Please book the whole ride instead.");
        setBookingType("whole");
        return;
      }
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = async (reference: string) => {
    try {
      const rideData = {
        from_location: fromLocation,
        to_location: toLocation,
        departure_date: departureDate,
        departure_time: departureTime,
        seats_requested: bookingType === "whole" ? vehicleOptions.find(v => v.value === vehicleType)?.capacity || passengers : passengers,
        booking_type: bookingType,
        price: calculatedPrice,
        status: 'confirmed',
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('rides')
        .insert(rideData)
        .select()
        .single();

      if (error) throw error;

      toast.success("Ride booked successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating ride:', error);
      toast.error('Failed to complete booking. Please contact support.');
    }
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    toast.info("Payment cancelled");
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <PaystackPayment
          amount={calculatedPrice}
          email={userProfile?.email || user?.email || ""}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          rideDetails={{
            from: fromLocation,
            to: toLocation,
            date: departureDate,
            time: departureTime,
            passengers: bookingType === "whole" ? vehicleOptions.find(v => v.value === vehicleType)?.capacity || passengers : passengers
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book Your Ride</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule">Schedule Ride</TabsTrigger>
              <TabsTrigger value="join">Join Ride</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="space-y-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">Book the entire vehicle for your group</p>
                <p className="text-sm text-blue-600 mt-1">10% discount applied automatically!</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <Select value={fromLocation} onValueChange={setFromLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem 
                            key={uni.value} 
                            value={uni.label}
                            disabled={!uni.enabled}
                          >
                            {uni.label} {!uni.enabled && "(Coming Soon)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <Select value={toLocation} onValueChange={setToLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem 
                            key={uni.value} 
                            value={uni.label}
                            disabled={!uni.enabled}
                          >
                            {uni.label} {!uni.enabled && "(Coming Soon)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Departure Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Departure Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Select value={vehicleType} onValueChange={(value) => {
                    setVehicleType(value);
                    setBookingType("whole");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              {option.capacity} seats
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {calculatedPrice > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Price (with 10% discount):</span>
                      <span className="text-2xl font-bold text-green-600">₦{calculatedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                  Book Entire Ride
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="join" className="space-y-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">Join an existing ride and share the cost</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Same form fields but with passenger selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <Select value={fromLocation} onValueChange={setFromLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem 
                            key={uni.value} 
                            value={uni.label}
                            disabled={!uni.enabled}
                          >
                            {uni.label} {!uni.enabled && "(Coming Soon)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <Select value={toLocation} onValueChange={setToLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem 
                            key={uni.value} 
                            value={uni.label}
                            disabled={!uni.enabled}
                          >
                            {uni.label} {!uni.enabled && "(Coming Soon)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Departure Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Departure Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Select value={passengers.toString()} onValueChange={(value) => {
                      setPassengers(parseInt(value));
                      setBookingType("join");
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} passenger{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Preferred Vehicle</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {calculatedPrice > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Price ({passengers} seat{passengers > 1 ? 's' : ''}):</span>
                      <span className="text-2xl font-bold text-blue-600">₦{calculatedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                  Join Ride
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideBookingFormNew;
