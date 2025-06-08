
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Users, Shield, Award, Mail, Phone, User } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const [showDirectorLetter, setShowDirectorLetter] = useState(false);

  const directorLetter = `Dear Valued Students and Partners,

Welcome to Uniride, where we believe that transportation should never be a barrier to education and opportunity.

As the Director of Uniride, I am proud to lead a team that is dedicated to revolutionizing how Nigerian students travel between their universities and home. Our platform was born from a simple observation: students across Nigeria face significant challenges in finding safe, affordable, and reliable transportation options.

Since our inception, we have connected thousands of students with verified drivers and transportation companies, creating a community built on trust, safety, and shared experiences. Every ride booked on our platform represents not just a journey, but a step toward academic success and personal growth.

Our commitment extends beyond just connecting riders with drivers. We are building a comprehensive ecosystem that prioritizes:

• Student Safety: Every driver undergoes thorough background checks and vehicle inspections
• Affordability: We work tirelessly to keep transportation costs accessible to all students
• Reliability: Our platform ensures that students can depend on us for their travel needs
• Community: We foster connections between students from different universities across Nigeria

The road ahead is exciting. We are continuously expanding our network, improving our technology, and enhancing the travel experience for Nigerian students. Our vision is to become the leading student transportation platform across West Africa, setting new standards for safety, convenience, and community engagement.

I want to personally thank every student who trusts us with their journey, every driver who maintains our high standards, and every partner who shares our vision. Together, we are not just moving people from place to place – we are moving Nigeria's future leaders toward their dreams.

Safe travels and continued success in your academic journey.

Warm regards,

Adebayo Olanrewaju
Director, Uniride
Lagos, Nigeria`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Uniride</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting Nigerian students with safe, affordable transportation solutions 
            that bridge the gap between universities and home.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide Nigerian students with safe, reliable, and affordable transportation 
                options that connect universities with cities across the country, fostering 
                academic success and community building.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Safety First</h3>
                <p className="text-gray-600">Every driver is verified and every vehicle is inspected to ensure student safety.</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become West Africa's leading student transportation platform, 
                revolutionizing how students travel and creating lasting connections 
                within the academic community.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Community Building</h3>
                <p className="text-gray-600">Connecting students from different universities across Nigeria.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Born from the challenges faced by Nigerian students in finding reliable transportation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">The Problem</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Nigerian students struggled with unreliable, expensive, and often unsafe 
                  transportation options between universities and their home cities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">The Solution</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We created a platform that connects students with verified drivers 
                  and transportation companies, ensuring safety, affordability, and reliability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center">The Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Today, we serve thousands of students across 50+ universities, 
                  providing safe passage and building lasting connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety</h3>
              <p className="text-gray-600">Student safety is our top priority in every journey.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-600">Building connections between students across Nigeria.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">Continuously improving our service and platform.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Accessibility</h3>
              <p className="text-gray-600">Making transportation affordable for all students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership</h2>
            <p className="text-xl text-gray-600">Meet the visionary behind Uniride</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Adebayo Olanrewaju</h3>
                    <p className="text-lg text-blue-600 mb-4">Director & Founder</p>
                    <p className="text-gray-600 mb-6">
                      A visionary leader passionate about student welfare and transportation innovation. 
                      With over 10 years of experience in the transportation industry and a deep 
                      understanding of student needs across Nigerian universities.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Dialog open={showDirectorLetter} onOpenChange={setShowDirectorLetter}>
                        <DialogTrigger asChild>
                          <Button className="bg-black text-white hover:bg-gray-800">
                            Read Director's Letter
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                              Letter from the Director
                            </DialogTitle>
                          </DialogHeader>
                          <div className="prose prose-gray max-w-none">
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                              {directorLetter}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-300">Numbers that tell our story</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-2">10K+</div>
              <div className="text-gray-300">Students Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Universities Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Verified Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-2">99%</div>
              <div className="text-gray-300">Safety Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">© 2025 Uniride. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
