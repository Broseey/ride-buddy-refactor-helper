
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Shield, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import RideBookingFormNew from "@/components/RideBookingFormNew";
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
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Campus Rides
                <span className="block text-black">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with fellow students for safe, affordable rides between universities and cities across Nigeria.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
                  onClick={handleBookRideClick}
                >
                  Book a Ride
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg font-medium transition-all duration-200"
                  onClick={() => navigate('/drive')}
                >
                  Become a Driver
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">10K+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">50+</div>
                <div className="text-sm text-gray-600">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">99%</div>
                <div className="text-sm text-gray-600">Safety Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-8">
            <RideBookingFormNew />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
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
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-medium"
              onClick={() => navigate('/drive')}
            >
              Start Driving
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
