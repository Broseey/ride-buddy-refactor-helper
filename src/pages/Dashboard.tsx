
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingRide from "@/components/dashboard/UpcomingRide";
import QuickRoutes from "@/components/dashboard/QuickRoutes";
import RecentRides from "@/components/dashboard/RecentRides";
import AccountLinks from "@/components/dashboard/AccountLinks";
import RealTimeStatus from "@/components/dashboard/RealTimeStatus";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import Footer from "@/components/dashboard/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRides } from "@/hooks/useRides";
import { useUserReceipts } from "@/hooks/useReceipts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReceiptGenerator from "@/components/ReceiptGenerator";

// Quick routes suggestions
const quickRoutes = [
  { 
    from: "Lagos", 
    to: "University of Ibadan", 
    price: "₦1,200" 
  },
  { 
    from: "Abuja", 
    to: "Ahmadu Bello University", 
    price: "₦1,500" 
  },
  { 
    from: "Port Harcourt", 
    to: "University of Port Harcourt", 
    price: "₦800" 
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const isMobile = useIsMobile();
  const { userProfile } = useAuth();
  const { data: rides = [], isLoading: ridesLoading } = useUserRides();
  const { data: receipts = [] } = useUserReceipts();

  const userName = userProfile?.full_name?.split(' ')[0] || 'User';

  // Get upcoming and recent rides
  const upcomingRides = rides.filter(ride => 
    ride.status === 'confirmed' || ride.status === 'pending'
  );
  const recentRides = rides.filter(ride => 
    ride.status === 'completed'
  ).slice(0, 3);

  const upcomingRide = upcomingRides[0] ? {
    id: upcomingRides[0].id,
    from: upcomingRides[0].from_location,
    to: upcomingRides[0].to_location,
    date: new Date(upcomingRides[0].departure_date).toLocaleDateString(),
    time: upcomingRides[0].departure_time,
    driver: "Driver TBD",
    vehicle: "Vehicle TBD",
    vehicleColor: "TBD",
    licensePlate: "TBD",
    pickup: upcomingRides[0].pickup_location || "Pickup TBD",
    status: upcomingRides[0].status
  } : null;

  const formattedRecentRides = recentRides.map(ride => ({
    id: ride.id,
    from: ride.from_location,
    to: ride.to_location,
    date: new Date(ride.departure_date).toLocaleDateString(),
    price: ride.price ? `₦${ride.price}` : "₦0",
    status: ride.status
  }));

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <WelcomeHeader name={userName} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main actions and upcoming ride */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />
              
              {upcomingRide ? (
                <UpcomingRide ride={upcomingRide} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Upcoming Rides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">You don't have any upcoming rides scheduled.</p>
                    <Link to="/schedule">
                      <Button className="bg-black text-white hover:bg-neutral-800">
                        Schedule a Ride
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              
              <QuickRoutes routes={quickRoutes} />
            </div>
            
            {/* Right column - Real-time activity and account */}
            <div className="space-y-6">
              <RealTimeStatus />
              <LiveActivityFeed />
              
              {formattedRecentRides.length > 0 ? (
                <RecentRides rides={formattedRecentRides} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Recent Rides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">You haven't taken any rides yet.</p>
                  </CardContent>
                </Card>
              )}

              {/* Receipts Section */}
              {receipts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Receipts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {receipts.slice(0, 3).map((receipt) => (
                      <div key={receipt.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium text-sm">{receipt.receipt_number}</p>
                          <p className="text-xs text-gray-500">₦{receipt.total_amount.toFixed(2)}</p>
                        </div>
                        <ReceiptGenerator 
                          receipt={receipt} 
                          onDownload={() => console.log('Receipt downloaded')} 
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              
              <AccountLinks />
            </div>
          </div>
          
          {/* Mobile Bottom Navigation */}
          {isMobile && (
            <MobileNavigation 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
        
        <Footer isMobile={isMobile} />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
