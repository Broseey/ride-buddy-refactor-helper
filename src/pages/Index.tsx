
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Shield, Star, ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import RideBookingFormNew from "@/components/RideBookingFormNew";
import AvailableRides from "@/components/AvailableRides";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookRideClick = () => {
    if (!user) {
      toast.error("Please sign in to book a ride");
      navigate('/signin');
      return;
    }
    // If user is authenticated, they can use the booking form directly
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-black rounded-full p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Nigeria's #1 Student Ride Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Campus Rides
                <span className="block text-black">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with fellow students for safe, affordable rides between universities and cities across Nigeria.
              </p>
              
              {/* Hero Image - Uber Style */}
              <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🚗</span>
                    </div>
                    <div className="text-sm font-medium">Your ride is on the way</div>
                    <div className="text-xs text-gray-500">2 mins away</div>
                  </div>
                  <div className="text-6xl opacity-20">🗺️</div>
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-200 rounded-full opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-40"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200" 
                  onClick={handleBookRideClick}
                >
                  <Target className="mr-2 h-5 w-5" />
                  Book a Ride
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg font-medium transition-all duration-200" 
                  onClick={() => navigate('/drive')}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Become a Driver
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-8">
            <RideBookingFormNew />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-black">10K+</div>
              <div className="text-sm text-gray-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black">50+</div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-black">99%</div>
              <div className="text-sm text-gray-600">Safety Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Rides Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Rides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join other students on their journey. Book your seat on rides that match your route.
            </p>
          </div>
          
          <div className="flex justify-center">
            <AvailableRides />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Uniride?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're designed specifically for Nigerian students, with safety and affordability at our core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Verified Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All drivers are university-verified with background checks and safety training.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Campus Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Specialized routes connecting major universities to cities across Nigeria.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Flexible Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Book rides that match your schedule, from early morning to late evening.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Student Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Travel with fellow students from your university or nearby campuses.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who trust Uniride for their campus travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium" 
              onClick={handleBookRideClick}
            >
              Book Your First Ride
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/drive')} 
              className="border-white hover:bg-white px-8 py-3 text-lg font-medium text-white hover:text-black"
            >
              Start Driving
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
