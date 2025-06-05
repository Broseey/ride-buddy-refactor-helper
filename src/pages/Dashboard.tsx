
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
import { useAuth } from "@/contexts/AuthContext";
import { useRides } from "@/hooks/useRides";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const isMobile = useIsMobile();
  const { userProfile } = useAuth();
  const { data: rides, isLoading } = useRides();

  const userName = userProfile?.full_name?.split(' ')[0] || 'User';

  // Separate upcoming and past rides
  const upcomingRides = rides?.filter(ride => 
    ride.status === 'confirmed' || ride.status === 'pending'
  ) || [];
  
  const pastRides = rides?.filter(ride => 
    ride.status === 'completed'
  ) || [];

  const nextUpcomingRide = upcomingRides[0] || null;

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <WelcomeHeader name={userName} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main actions and upcoming ride */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            
            {/* Upcoming Ride or No Rides Message */}
            {nextUpcomingRide ? (
              <UpcomingRide ride={nextUpcomingRide} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">No Upcoming Rides</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600 mb-6">
                    You don't have any upcoming rides scheduled.
                  </p>
                  <Link to="/schedule">
                    <Button className="bg-black text-white hover:bg-neutral-800">
                      <CalendarPlus className="mr-2 h-4 w-4" />
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
            
            {/* Recent Rides or No Rides Message */}
            {pastRides.length > 0 ? (
              <RecentRides rides={pastRides.slice(0, 3)} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Rides</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <p className="text-gray-600 text-sm">
                    No ride history yet. Book your first ride to get started!
                  </p>
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
  );
};

export default Dashboard;
