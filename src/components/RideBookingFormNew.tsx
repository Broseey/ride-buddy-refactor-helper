import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { useCreateRide } from '@/hooks/useRides';

const locations = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Benin City",
  "Abeokuta",
  "Enugu",
  "Jos",
  "Owerri"
];

const cities = [
  "Ikeja",
  "Yaba",
  "Victoria Island",
  "Surulere",
  "Lekki",
  "Garki",
  "Wuse",
  "Asokoro",
  "Trans Amadi",
  "Eleme",
  "Katsina",
  "Sabon Gari",
  "Bodija",
  "Dugbe",
  "Ugbowo",
  "Ekenwan",
  "Obantoko",
  "Elelenwo",
  "New GRA",
  "Rayfield",
  "Tudun Wada",
  "Federal Housing Estate"
];

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00"
];

interface RideBookingFormProps {
  // You can define props here if needed
}

const RideBookingFormNew = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [bookingType, setBookingType] = useState<"join" | "full">("join");
  const [specificLocation, setSpecificLocation] = useState<string>("");
  const createRide = useCreateRide();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!from || !to || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const rideData = {
      from_location: from,
      to_location: to,
      departure_date: date,
      departure_time: time,
      seats_requested: passengers,
      booking_type: bookingType,
      pickup_location: specificLocation || undefined,
      price: undefined // Price will be determined by admin
    };

    createRide.mutate(rideData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Book Your Campus Ride</CardTitle>
        <CardDescription>
          Quick and affordable transportation to your university
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select departure" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Booking Type Selection */}
          <div className="space-y-3">
            <Label>Booking Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  bookingType === 'join' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setBookingType('join')}
              >
                <h3 className="font-medium">Join a Ride</h3>
                <p className="text-sm opacity-70">Share with other passengers</p>
              </div>
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  bookingType === 'full' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setBookingType('full')}
              >
                <h3 className="font-medium">Book Entire Ride</h3>
                <p className="text-sm opacity-70">Private ride for you</p>
              </div>
            </div>
          </div>

          {/* Specific Location for Full Booking */}
          {bookingType === 'full' && (
            <div className="space-y-2">
              <Label htmlFor="specificLocation">Specific Location</Label>
              <Input
                id="specificLocation"
                placeholder="Enter specific pickup/drop-off location"
                value={specificLocation}
                onChange={(e) => setSpecificLocation(e.target.value)}
                list="cities-list"
              />
              <datalist id="cities-list">
                {cities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
              <p className="text-sm text-gray-500">
                Please specify your exact pickup or drop-off location within the selected state
              </p>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Travel Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Passengers */}
          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-neutral-800"
            disabled={createRide.isPending}
          >
            {createRide.isPending ? 'Booking...' : 'Request Ride'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RideBookingFormNew;
