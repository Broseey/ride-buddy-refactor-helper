
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Edit2, Save, X, Calendar, MapPin, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRides } from "@/hooks/useRides";

const Profile = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const { rides } = useRides();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    email: userProfile?.email || '',
    phone_number: userProfile?.phone_number || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const isMobile = useIsMobile();

  const handleEdit = () => {
    setFormData({
      full_name: userProfile?.full_name || '',
      email: userProfile?.email || '',
      phone_number: userProfile?.phone_number || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: userProfile?.full_name || '',
      email: userProfile?.email || '',
      phone_number: userProfile?.phone_number || ''
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number
        })
        .eq('id', userProfile?.id);

      if (error) throw error;

      await refreshUserProfile();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalRides = rides?.length || 0;
  const completedRides = rides?.filter(ride => ride.status === 'completed').length || 0;
  const upcomingRides = rides?.filter(ride => 
    ride.status === 'confirmed' || ride.status === 'pending'
  ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className={`max-w-4xl mx-auto px-4 py-8 ${isMobile ? 'pb-20' : ''}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                {!isEditing && (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({...prev, full_name: e.target.value}))}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{userProfile.full_name || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{userProfile.email}</span>
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={(e) => setFormData(prev => ({...prev, phone_number: e.target.value}))}
                        placeholder="+234 xxx xxx xxxx"
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{userProfile.phone_number || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ride Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Total Rides</span>
                  </div>
                  <Badge variant="outline">{totalRides}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <Badge variant="outline">{completedRides}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Upcoming</span>
                  </div>
                  <Badge variant="outline">{upcomingRides}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phone Verified</span>
                  <Badge variant={userProfile.phone_verified ? "default" : "secondary"} 
                         className={userProfile.phone_verified ? "bg-green-100 text-green-800" : ""}>
                    {userProfile.phone_verified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member Since</span>
                  <span className="text-sm text-gray-600">
                    {new Date(userProfile.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
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
