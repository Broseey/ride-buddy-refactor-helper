
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import HowItWorksSection from "@/components/HowItWorksSection";
import AvailableRides from "@/components/AvailableRides";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Shield } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("rides");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Uber-like design */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Go anywhere with 
                <span className="text-blue-400 block">Uniride</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Safe, reliable, and affordable rides connecting university students to their destinations across Nigeria.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <HeroSection />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">10K+</h3>
                <p className="text-gray-600 font-medium">Happy Students</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600 font-medium">Universities</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">99%</h3>
                <p className="text-gray-600 font-medium">Safety Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Available Rides Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Ride</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse available rides or check how our service works
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="rides">Available Rides</TabsTrigger>
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="rides" className="mt-8">
              <AvailableRides />
            </TabsContent>
            
            <TabsContent value="how-it-works" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <HowItWorksSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <ServicesSection />
      <FeatureHighlights />
      
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2024 Uniride. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
