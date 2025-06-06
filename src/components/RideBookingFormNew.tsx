
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CalendarDays, Clock, Users, MapPin } from "lucide-react";
import { format } from "date-fns";
import LocationSearchNew from "@/components/LocationSearchNew";
import MapTokenHandler from "@/components/map/MapTokenHandler";

const RideBookingFormNew = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [bookingType, setBookingType] = useState("");

  // Helper function to determine location type
  const getLocationType = (location: string): "university" | "state" | null => {
    const universities = [
      "University of Lagos", "University of Ibadan", "Ahmadu Bello University",
      "University of Nigeria, Nsukka", "Obafemi Awolowo University", "University of Benin",
      "University of Port Harcourt", "University of Ilorin", "Covenant University, Ota"
    ];
    
    const states = [
      "Lagos", "Ogun", "Oyo", "FCT - Abuja", "Rivers", "Kaduna", "Kano", "Plateau"
    ];
    
    if (universities.some(uni => location.includes(uni) || uni.includes(location))) return "university";
    if (states.includes(location)) return "state";
    return null;
  };

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking details:", {
      fromLocation,
      toLocation,
      date,
      time,
      passengers,
      bookingType
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Book Your Ride</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Selection */}
          <div className="space-y-4">
            <LocationSearchNew
              type="from"
              value={fromLocation}
              onChange={setFromLocation}
              otherLocationType={getLocationType(toLocation)}
            />
            
            <LocationSearchNew
              type="to"
              value={toLocation}
              onChange={setToLocation}
              otherLocationType={getLocationType(fromLocation)}
            />
          </div>

          {/* Show map if both locations are selected */}
          {fromLocation && toLocation && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Route Preview</h3>
              <MapTokenHandler
                from={fromLocation}
                to={toLocation}
                fromType={getLocationType(fromLocation) || "state"}
                toType={getLocationType(toLocation) || "state"}
              />
            </div>
          )}

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <CalendarDays className="inline h-4 w-4 mr-1" />
                Departure Date
              </label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Departure Time
                </label>
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Number of Passengers
                </label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Booking Type
                </label>
                <Select value={bookingType} onValueChange={setBookingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select booking type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shared">Shared Ride</SelectItem>
                    <SelectItem value="private">Private Ride</SelectItem>
                    <SelectItem value="shuttle">University Shuttle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Summary and Submit */}
          {fromLocation && toLocation && date && time && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Trip Summary</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">From:</span> {fromLocation}</p>
                <p><span className="font-medium">To:</span> {toLocation}</p>
                <p><span className="font-medium">Date:</span> {format(date, "PPP")}</p>
                <p><span className="font-medium">Time:</span> {time}</p>
                <p><span className="font-medium">Passengers:</span> {passengers}</p>
                <p><span className="font-medium">Type:</span> {bookingType || "Not selected"}</p>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-neutral-800"
            disabled={!fromLocation || !toLocation || !date || !time || !bookingType}
          >
            Book Ride
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RideBookingFormNew;
