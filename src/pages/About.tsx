
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Users, Shield, Globe, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            We reimagine the way the world moves for the better
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Movement is what we power. It's our lifeblood. It runs through our veins. 
            It's what gets us out of bed each morning. It pushes us to constantly reimagine 
            how we can move better.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white text-black py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-600">Rides completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-gray-600">Active users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-600">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We ignite opportunity by setting the world in motion. We take on big problems 
              to help drivers, riders, eaters, and cities go further.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">For Students</h3>
                <p className="text-gray-300">
                  Safe, reliable, and affordable transportation to get you where you need to go.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">For Drivers</h3>
                <p className="text-gray-300">
                  Flexible earning opportunities that work around your schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">For Cities</h3>
                <p className="text-gray-300">
                  Reducing traffic congestion and environmental impact through shared rides.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p className="text-gray-300">
                We never compromise on safety. Every driver is verified and every ride is tracked.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                We're constantly improving our platform to serve you better.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-300">
                Building connections and trust within the student community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white text-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get moving?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students already using Uniride for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Get started
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
