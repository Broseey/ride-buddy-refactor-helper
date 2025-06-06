
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import { useUserRides } from "@/hooks/useRides";
import { useUserReceipts, useGenerateReceipt } from "@/hooks/useReceipts";
import ReceiptGenerator from "@/components/ReceiptGenerator";

const MyRides = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data: rides = [], isLoading } = useUserRides();
  const { data: receipts = [] } = useUserReceipts();
  const generateReceipt = useGenerateReceipt();

  const upcomingRides = rides.filter(ride => 
    ride.status === 'pending' || ride.status === 'confirmed' || ride.status === 'in_progress'
  );

  const pastRides = rides.filter(ride => 
    ride.status === 'completed' || ride.status === 'cancelled'
  );

  const handleGenerateReceipt = (rideId: string, amount: number) => {
    generateReceipt.mutate({ rideId, amount });
  };

  const getReceiptForRide = (rideId: string) => {
    return receipts.find(receipt => receipt.ride_id === rideId);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
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
                        className={
                          ride.status === "confirmed" ? "bg-green-500" : 
                          ride.status === "pending" ? "bg-amber-500" :
                          "bg-blue-500"
                        }
                      >
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(ride.departure_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{ride.departure_time}</span>
                          </div>
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            <span>{ride.booking_type === 'full' ? 'Full Ride' : 'Join Ride'}</span>
                          </div>
                        </div>
                        
                        <div className="font-bold text-lg">
                          {ride.price ? `₦${ride.price}` : 'Price TBD'}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                            View Details
                          </Button>
                          {ride.status === 'confirmed' && (
                            <Button size="sm" className="bg-black text-white hover:bg-neutral-800">
                              <Navigation className="mr-2 h-4 w-4" />
                              Track Ride
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">You don't have any upcoming rides.</p>
                  <Link to="/schedule">
                    <Button className="bg-black text-white hover:bg-neutral-800">
                      Book a Ride
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {pastRides.map((ride) => {
                const receipt = getReceiptForRide(ride.id);
                return (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row justify-between items-center">
                      <CardTitle className="text-lg">
                        {ride.from_location} to {ride.to_location}
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
                            <span>{new Date(ride.departure_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{ride.departure_time}</span>
                          </div>
                        </div>
                        
                        <div className="font-bold text-lg">
                          {ride.price ? `₦${ride.price}` : '₦0'}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                            View Details
                          </Button>
                          {ride.status === "completed" && (
                            <>
                              <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                                Book Again
                              </Button>
                              {receipt ? (
                                <ReceiptGenerator 
                                  receipt={receipt} 
                                  onDownload={() => console.log('Receipt downloaded')} 
                                />
                              ) : (
                                ride.price && (
                                  <Button 
                                    onClick={() => handleGenerateReceipt(ride.id, ride.price!)}
                                    variant="outline" 
                                    size="sm"
                                    disabled={generateReceipt.isPending}
                                  >
                                    {generateReceipt.isPending ? 'Generating...' : 'Get Receipt'}
                                  </Button>
                                )
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {pastRides.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No past rides found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyRides;
