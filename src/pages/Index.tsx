import { useState } from "react";
import Navbar from "@/components/Navbar";
import AvailableRides from "@/components/AvailableRides";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Calendar, CreditCard, MapPin, Users, Shield, Clock, Star, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RideBookingFormNew from "@/components/RideBookingFormNew";
import HeroImage from "@/components/HeroImage";
import IllustrationPlaceholder from "@/components/IllustrationPlaceholder";

const Index = () => {
  const [activeTab, setActiveTab] = useState("book");
  const currentYear = new Date().getFullYear();
  
  const mobileFeatures = [
    { icon: <Users className="h-8 w-8 text-campusorange-600" />, title: "Share Rides" },
    { icon: <MapPin className="h-8 w-8 text-campusorange-600" />, title: "Track Location" },
    { icon: <Shield className="h-8 w-8 text-campusorange-600" />, title: "Safe Travel" },
    { icon: <Clock className="h-8 w-8 text-campusorange-600" />, title: "On Time" },
    { icon: <Star className="h-8 w-8 text-campusorange-600" />, title: "Top Rated" }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-4 py-6 md:py-10 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero section with enhanced mobile layout and updated breakpoint */}
        <div className="grid grid-cols-1 hero-breakpoint:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20 mt-4 md:mt-8 min-h-[600px] hero-breakpoint:min-h-[700px]">
          <div className="flex flex-col justify-center hero-breakpoint:order-1">
            {/* Left column - Heading and form */}
            <div className="text-left mb-2 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-none">
                Campus Rides Made Easy
              </h1>
              <p className="text-campusorange-600 font-medium text-base mb-8">
                Safe and reliable transport for students
              </p>
            </div>
            
            {/* Booking form */}
            <div className="bg-transparent rounded-[2rem] md:rounded-[3.5rem] hero-breakpoint:rounded-[5.5rem] transition-all duration-300">
              <RideBookingFormNew />
            </div>
          </div>
          
          {/* Right column - Hero Image for large screens with 1135px breakpoint */}
          <div className="hidden hero-breakpoint:flex hero-breakpoint:order-2 hero-breakpoint:items-center hero-breakpoint:justify-center">
            <div className="w-full max-w-[600px] h-full flex items-center justify-center">
              <HeroImage />
            </div>
          </div>
        </div>
        
        {/* Mobile-specific features showcase with infinite sliding */}
        <div className="block md:hidden mb-8 overflow-hidden">
          <div className="relative">
            <div className="flex animate-slide-infinite space-x-4">
              {[...mobileFeatures, ...mobileFeatures].map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-32">
                  <IllustrationPlaceholder 
                    icon={feature.icon} 
                    title={feature.title} 
                    height="h-32" 
                    className="bg-white border-campusorange-200" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Available rides section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[5.5rem] shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 rounded-[1.5rem]">
                <TabsTrigger value="book" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-[1.5rem] md:rounded-[3rem] text-sm md:text-base">Available Rides</TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-[1.5rem] md:rounded-[3rem] text-sm md:text-base">How It Works</TabsTrigger>
              </TabsList>
              <TabsContent value="book" className="mt-4">
                <AvailableRides />
              </TabsContent>
              <TabsContent value="schedule" className="mt-4">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-lg md:text-xl font-semibold">How to Book Your Ride</h2>
                  
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div className="flex items-start">
                      <div className="bg-campusorange-100 rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-3 mr-3 md:mr-4 hover:shadow-glow-orange transition-all duration-300 flex-shrink-0">
                        <MapPin className="h-4 w-4 md:h-6 md:w-6 text-campusorange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm md:text-base">1. Choose Your Route</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Select your departure and destination locations.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-campusorange-100 rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-3 mr-3 md:mr-4 hover:shadow-glow-orange transition-all duration-300 flex-shrink-0">
                        <Calendar className="h-4 w-4 md:h-6 md:w-6 text-campusorange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm md:text-base">2. Pick Date & Time</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Choose when you want to travel.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-campusorange-100 rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-3 mr-3 md:mr-4 hover:shadow-glow-orange transition-all duration-300 flex-shrink-0">
                        <Car className="h-4 w-4 md:h-6 md:w-6 text-campusorange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm md:text-base">3. Select Vehicle</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Choose from available vehicles or join an existing ride.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-campusorange-100 rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-3 mr-3 md:mr-4 hover:shadow-glow-orange transition-all duration-300 flex-shrink-0">
                        <CreditCard className="h-4 w-4 md:h-6 md:w-6 text-campusorange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm md:text-base">4. Confirm & Pay</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Review your booking and make payment to confirm.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link to="/how-it-works">
                        <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-200 rounded-[1.5rem] md:rounded-[3rem] text-xs md:text-sm">
                          Learn more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Features section with mobile optimization */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-campusorange-700">Why Choose Uniride?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[5.5rem] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-campusorange-100 w-10 h-10 md:w-12 md:h-12 rounded-[1.5rem] md:rounded-[3rem] flex items-center justify-center mb-3 md:mb-4 hover:shadow-glow-orange transition-all duration-300">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-campusorange-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Share & Save</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Join existing rides and split the cost with other students for affordable travel.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[5.5rem] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-campusorange-100 w-10 h-10 md:w-12 md:h-12 rounded-[1.5rem] md:rounded-[3rem] flex items-center justify-center mb-3 md:mb-4 hover:shadow-glow-orange transition-all duration-300">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-campusorange-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Vehicle Options</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Choose from Sienna, Hiace bus, Long bus, or Corolla based on your needs.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[5.5rem] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-campusorange-100 w-10 h-10 md:w-12 md:h-12 rounded-[1.5rem] md:rounded-[3rem] flex items-center justify-center mb-3 md:mb-4 hover:shadow-glow-orange transition-all duration-300">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-campusorange-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Campus Focused</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Specialized in routes between universities and major cities for students.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile call-to-action section with fixed links */}
        <div className="block md:hidden mt-12 bg-white p-6 rounded-[2rem] shadow-sm">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">Ready to ride?</h3>
            <div className="space-y-3">
              <Link to="/signup" className="block">
                <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-[2rem]">
                  <Car className="mr-2 h-4 w-4" />
                  Book Your First Ride
                </Button>
              </Link>
              <Link to="/drive" className="block">
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white rounded-[2rem]">
                  Start Driving
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with dynamic copyright year */}
      <footer className="bg-white py-4 md:py-6 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p className="text-sm md:text-base">© {currentYear} Uniride. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Add global styles for special effects and new breakpoint */}
      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 0 rgba(255, 153, 0, 0.4); }
            50% { box-shadow: 0 0 10px rgba(255, 153, 0, 0.7); }
            100% { box-shadow: 0 0 0 rgba(255, 153, 0, 0.4); }
          }
          
          .hover\\:shadow-glow-orange:hover {
            animation: glow 2s infinite;
          }

          @keyframes slide-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .animate-slide-infinite {
            animation: slide-infinite 20s linear infinite;
          }

          @media (min-width: 1135px) {
            .hero-breakpoint\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .hero-breakpoint\\:order-1 {
              order: 1;
            }
            .hero-breakpoint\\:order-2 {
              order: 2;
            }
            .hero-breakpoint\\:flex {
              display: flex;
            }
            .hero-breakpoint\\:items-center {
              align-items: center;
            }
            .hero-breakpoint\\:justify-center {
              justify-content: center;
            }
            .hero-breakpoint\\:min-h-\\[700px\\] {
              min-height: 700px;
            }
            .hero-breakpoint\\:rounded-\\[5\\.5rem\\] {
              border-radius: 5.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
