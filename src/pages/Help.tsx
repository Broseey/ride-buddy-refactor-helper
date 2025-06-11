
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, HelpCircle, Search } from "lucide-react";

const Help = () => {
  const currentYear = new Date().getFullYear();

  const faqs = [
    {
      question: "How do I book a ride?",
      answer: "Simply select your departure and destination locations, choose your preferred date and time, select a vehicle, and proceed to payment. Once confirmed, you'll receive booking details."
    },
    {
      question: "How much does it cost to book a ride?",
      answer: "Pricing varies based on the route, vehicle type, and whether you're booking a seat or the entire ride. Full ride bookings receive a 10% discount."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before departure for a full refund. Cancellations within 24 hours may incur charges."
    },
    {
      question: "How do I become a driver?",
      answer: "Visit our 'Become a Driver' page, complete the registration form with your license and vehicle details, and wait for verification. Our team will review your application within 3-5 business days."
    },
    {
      question: "Is Uniride safe?",
      answer: "Yes, all our drivers are verified with background checks, valid licenses, and insurance. We maintain a 99% safety rating through strict verification processes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods through Paystack, including bank cards, bank transfers, USSD, and QR codes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search for help articles..."
              className="pl-10 py-3 text-lg rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3 text-lg">
                      <HelpCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">support@uniride.ng</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+234 (0) 800 UNIRIDE</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-600 mb-2">Business Hours:</p>
                  <p className="text-sm">Monday - Friday: 8AM - 8PM</p>
                  <p className="text-sm">Saturday - Sunday: 9AM - 6PM</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={4} />
                  <Button className="w-full bg-black hover:bg-gray-900">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a href="/terms" className="block text-blue-600 hover:underline">Terms & Conditions</a>
                  <a href="/privacy" className="block text-blue-600 hover:underline">Privacy Policy</a>
                  <a href="/driver-requirements" className="block text-blue-600 hover:underline">Driver Requirements</a>
                  <a href="/about" className="block text-blue-600 hover:underline">About Uniride</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
