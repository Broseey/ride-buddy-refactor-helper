
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Search, CreditCard, Car } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your account with your university email and verify your student status."
    },
    {
      icon: Search,
      title: "Find Rides",
      description: "Browse available rides or book a custom trip between your university and home."
    },
    {
      icon: CreditCard,
      title: "Book & Pay",
      description: "Select your seat, choose your vehicle, and pay securely through our platform."
    },
    {
      icon: Car,
      title: "Travel Safe",
      description: "Meet your verified driver and fellow students at the pickup location and enjoy your journey."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">How Uniride Works</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Getting around between your university and home has never been easier. Follow these simple steps to start your journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                  {index + 1}
                </div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorksSection;
