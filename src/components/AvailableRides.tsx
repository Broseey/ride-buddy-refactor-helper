
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample ride data
const sampleRides = [
  {
    id: 1,
    from: "Lagos",
    to: "University of Ibadan",
    date: "2023-05-15",
    time: "09:00",
    vehicle: "Sienna",
    availableSeats: 4,
    price: 1200,
    driver: "Emmanuel O.",
    rating: 4.8
  },
  {
    id: 2,
    from: "Abuja",
    to: "Ahmadu Bello University",
    date: "2023-05-16",
    time: "07:30",
    vehicle: "Hiace Bus",
    availableSeats: 8,
    price: 1500,
    driver: "Sarah M.",
    rating: 4.6
  },
  {
    id: 3,
    from: "Port Harcourt",
    to: "University of Port Harcourt",
    date: "2023-05-16",
    time: "14:00",
    vehicle: "Corolla",
    availableSeats: 3,
    price: 800,
    driver: "David K.",
    rating: 4.9
  }
];

const AvailableRides = () => {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Available Rides</h2>
      <div className="space-y-4">
        {sampleRides.map(ride => (
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
                    <span>{ride.availableSeats} seats available</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="font-medium">Driver: {ride.driver}</span>
                  <Badge variant="outline" className="ml-2 bg-yellow-50">
                    ★ {ride.rating}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-xl font-bold text-campusorange-700 mb-1">
                  ₦{ride.price}
                </div>
                <Link to="/signin">
                  <Button 
                    size="sm" 
                    className="bg-campusorange-700 hover:bg-campusorange-800 rounded-[3rem]"
                  >
                    Book Seat
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableRides;
