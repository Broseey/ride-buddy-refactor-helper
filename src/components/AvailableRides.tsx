
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, ArrowRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Sample ride data with seat availability
const sampleRides = [
  {
    id: 1,
    from: "Lagos",
    to: "University of Ibadan",
    date: "2025-01-15",
    time: "09:00",
    vehicle: "Toyota Sienna",
    totalSeats: 6,
    bookedSeats: 2,
    price: 1200,
    driver: "Emmanuel O.",
    rating: 4.8
  },
  {
    id: 2,
    from: "Abuja",
    to: "Ahmadu Bello University",
    date: "2025-01-16",
    time: "07:30",
    vehicle: "Toyota Hiace",
    totalSeats: 12,
    bookedSeats: 4,
    price: 1500,
    driver: "Sarah M.",
    rating: 4.6
  },
  {
    id: 3,
    from: "Port Harcourt",
    to: "University of Port Harcourt",
    date: "2025-01-16",
    time: "14:00",
    vehicle: "Toyota Corolla",
    totalSeats: 4,
    bookedSeats: 1,
    price: 800,
    driver: "David K.",
    rating: 4.9
  },
  {
    id: 4,
    from: "Kano",
    to: "Bayero University",
    date: "2025-01-17",
    time: "08:00",
    vehicle: "Honda Pilot",
    totalSeats: 7,
    bookedSeats: 6,
    price: 1300,
    driver: "Amina S.",
    rating: 4.7
  }
];

const AvailableRides = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinRide = (rideId: number) => {
    if (!user) {
      toast.error("Please sign in to join a ride");
      navigate('/signin');
      return;
    }
    
    // Here you would normally handle the booking logic
    toast.success("Redirecting to booking...");
    // You can navigate to a booking page or open a modal
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Available Rides</h2>
      <div className="space-y-4">
        {sampleRides.map(ride => {
          const availableSeats = ride.totalSeats - ride.bookedSeats;
          const isAlmostFull = availableSeats <= 2 && availableSeats > 0;
          const isFull = availableSeats === 0;
          
          return (
            <Card key={ride.id} className="p-4 hover:shadow-md transition-shadow rounded-[3.5rem] md:rounded-[5.5rem]">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-lg font-medium mb-2">
                    <span>{ride.from}</span>
                    <ArrowRight className="mx-2 h-4 w-4" />
                    <span>{ride.to}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{ride.date}, {ride.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{ride.vehicle}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{availableSeats} of {ride.totalSeats} seats available</span>
                      {isAlmostFull && !isFull && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Almost Full!
                        </Badge>
                      )}
                      {isFull && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Full
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm mb-2">
                    <span className="font-medium">Driver: {ride.driver}</span>
                    <Badge variant="outline" className="ml-2 bg-yellow-50">
                      ★ {ride.rating}
                    </Badge>
                  </div>

                  {/* Seat availability visualization */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-500 mr-2">Seats:</span>
                    {Array.from({ length: ride.totalSeats }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded ${
                          index < ride.bookedSeats
                            ? 'bg-gray-400'
                            : 'bg-green-200 border border-green-400'
                        }`}
                        title={index < ride.bookedSeats ? 'Booked' : 'Available'}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <div className="text-xl font-bold text-black mb-1">
                    ₦{ride.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {ride.bookedSeats}/{ride.totalSeats} passengers
                  </div>
                  
                  {isFull ? (
                    <Button 
                      size="sm" 
                      disabled
                      className="rounded-[3rem] opacity-50"
                    >
                      Ride Full
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-black hover:bg-gray-800 rounded-[3rem]"
                      onClick={() => handleJoinRide(ride.id)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Join Ride
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Show message when no rides available */}
      {sampleRides.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Available Rides</h3>
            <p className="text-gray-500 mb-6">There are currently no available rides. Check back later or create your own ride request.</p>
          </div>
          <Link to="/schedule">
            <Button className="bg-black text-white hover:bg-neutral-800">
              Request a Ride
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AvailableRides;
