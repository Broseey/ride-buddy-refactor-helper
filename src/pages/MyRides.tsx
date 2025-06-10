
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
import { Clock, MapPin, Calendar, Car, Navigation, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useRides } from "@/hooks/useRides";

const MyRides = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { rides, isLoading } = useRides();

  // Separate upcoming and past rides from real data
  const upcomingRides = rides?.filter(ride => 
    ride.status === 'confirmed' || ride.status === 'pending'
  ) || [];
  
  const pastRides = rides?.filter(ride => 
    ride.status === 'completed'
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Rides</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming ({upcomingRides.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastRides.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingRides.length > 0 ? (
              upcomingRides.map((ride) => (
                <Card key={ride.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg">
                      {ride.from_location} to {ride.to_location}
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
                          <span>{ride.departure_date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{ride.departure_time}</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          <span>{ride.seats_requested} seat(s)</span>
                        </div>
                      </div>
                      
                      <div className="font-bold text-lg">
                        ₦{ride.price || 'TBD'}
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
                <div className="mb-4">
                  <CalendarPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Rides</h3>
                  <p className="text-gray-500 mb-6">You don't have any upcoming rides scheduled. Book your next journey now!</p>
                </div>
                <Link to="/">
                  <Button className="bg-black text-white hover:bg-neutral-800">
                    Book a Ride
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastRides.length > 0 ? (
              pastRides.map((ride) => (
                <Card key={ride.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg">
                      {ride.from_location} to {ride.to_location}
                    </CardTitle>
                    <Badge 
                      variant="outline"
                      className="border-green-500 text-green-500"
                    >
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{ride.departure_date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{ride.departure_time}</span>
                        </div>
                      </div>
                      
                      <div className="font-bold text-lg">
                        ₦{ride.price || 'N/A'}
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Past Rides</h3>
                  <p className="text-gray-500 mb-6">You haven't completed any rides yet. Your travel history will appear here after your first journey.</p>
                </div>
                <Link to="/">
                  <Button className="bg-black text-white hover:bg-neutral-800">
                    Book Your First Ride
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRides;
