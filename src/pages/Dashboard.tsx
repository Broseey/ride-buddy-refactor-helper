
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

// Sample upcoming ride
const upcomingRide = {
  id: "ride-123",
  from: "Lagos",
  to: "University of Ibadan",
  date: "May 16, 2023",
  time: "09:00 AM",
  driver: "Emmanuel O.",
  vehicle: "Toyota Sienna",
  vehicleColor: "Silver",
  licensePlate: "LND 432 JK",
  pickup: "Ikeja Bus Terminal",
  status: "confirmed"
};

// Sample recent rides
const recentRides = [
  {
    id: "ride-122",
    from: "University of Ibadan",
    to: "Lagos",
    date: "May 2, 2023",
    price: "₦1,200",
    status: "completed"
  },
  {
    id: "ride-121",
    from: "Lagos",
    to: "University of Ibadan",
    date: "April 29, 2023",
    price: "₦1,200",
    status: "completed"
  },
  {
    id: "ride-120",
    from: "University of Ibadan",
    to: "Lagos",
    date: "April 15, 2023",
    price: "₦1,100",
    status: "completed"
  }
];

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

  const userName = userProfile?.full_name?.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <WelcomeHeader name={userName} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main actions and upcoming ride */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <UpcomingRide ride={upcomingRide} />
            <QuickRoutes routes={quickRoutes} />
          </div>
          
          {/* Right column - Real-time activity and account */}
          <div className="space-y-6">
            <RealTimeStatus />
            <LiveActivityFeed />
            <RecentRides rides={recentRides} />
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
