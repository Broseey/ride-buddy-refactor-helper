
import React from "react";
import Navbar from "@/components/Navbar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const isMobile = useIsMobile();
  const { userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userProfile?.full_name || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userProfile?.email || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{userProfile?.phone_number || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {userProfile?.created_at ? 
                      new Date(userProfile.created_at).toLocaleDateString() : 
                      'Not available'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                My Rides
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MobileNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
