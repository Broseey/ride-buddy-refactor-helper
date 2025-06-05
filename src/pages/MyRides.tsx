
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Car, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const MyRides = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingRides = [
    {
      id: "ride-001",
      from: "Lagos",
      to: "University of Ibadan",
      date: "May 20, 2023",
      time: "09:00 AM",
      price: "₦1,200",
      vehicle: "Sienna",
      vehicleColor: "Silver",
      licensePlate: "ABC-123XY",
      status: "confirmed"
    },
    {
      id: "ride-002",
      from: "Abuja",
      to: "Ahmadu Bello University",
      date: "May 25, 2023",
      time: "08:30 AM",
      price: "₦1,500",
      vehicle: "Hiace Bus",
      vehicleColor: "White",
      licensePlate: "DEF-456XY",
      status: "pending"
    }
  ];

  const pastRides = [
    {
      id: "ride-003",
      from: "Port Harcourt",
      to: "University of Port Harcourt",
      date: "May 5, 2023",
      time: "02:00 PM",
      price: "₦800",
      status: "completed"
    },
    {
      id: "ride-004",
      from: "Lagos",
      to: "University of Lagos",
      date: "April 28, 2023",
      time: "10:30 AM",
      price: "₦1,000",
      status: "completed"
    },
    {
      id: "ride-005",
      from: "Ibadan",
      to: "Lagos",
      date: "April 22, 2023",
      time: "08:00 AM",
      price: "₦1,200",
      status: "cancelled"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Rides</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingRides.length > 0 ? (
              upcomingRides.map((ride) => (
                <Card key={ride.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg">
                      {ride.from} to {ride.to}
                    </CardTitle>
                    <Badge 
                      variant={ride.status === "confirmed" ? "default" : "secondary"}
                      className={ride.status === "confirmed" ? "bg-green-500" : "bg-amber-500"}
                    >
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{ride.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          <span>{ride.vehicle}</span>
                        </div>
                      </div>
                      
                      <div className="font-bold text-lg">
                        {ride.price}
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-black text-white hover:bg-neutral-800">
                          <Navigation className="mr-2 h-4 w-4" />
                          Track Ride
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You don't have any upcoming rides.</p>
                <Link to="/">
                  <Button className="bg-black text-white hover:bg-neutral-800">
                    Book a Ride
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastRides.map((ride) => (
              <Card key={ride.id} className="overflow-hidden">
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <CardTitle className="text-lg">
                    {ride.from} to {ride.to}
                  </CardTitle>
                  <Badge 
                    variant={ride.status === "completed" ? "outline" : "destructive"}
                    className={ride.status === "completed" ? "border-green-500 text-green-500" : ""}
                  >
                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{ride.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{ride.time}</span>
                      </div>
                    </div>
                    
                    <div className="font-bold text-lg">
                      {ride.price}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                        View Details
                      </Button>
                      {ride.status === "completed" && (
                        <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                          Book Again
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRides;
