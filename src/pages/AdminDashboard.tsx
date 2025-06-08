
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Car, MapPin, DollarSign, TrendingUp, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import RideManagement from "@/components/admin/RideManagement";
import RealTimeLocationManager from "@/components/admin/RealTimeLocationManager";
import AdminRideManager from "@/components/admin/AdminRideManager";
import PricingManagement from "@/components/admin/PricingManagement";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch admin stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ridesResponse, usersResponse, driversResponse, partnersResponse] = await Promise.all([
        supabase.from('rides').select('id, status', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('driver_profiles').select('id', { count: 'exact' }),
        supabase.from('ride_companies').select('id', { count: 'exact' })
      ]);

      return {
        totalRides: ridesResponse.count || 0,
        totalUsers: usersResponse.count || 0,
        totalDrivers: driversResponse.count || 0,
        totalPartners: partnersResponse.count || 0,
        activeRides: ridesResponse.data?.filter(ride => 
          ride.status === 'confirmed' || ride.status === 'pending'
        ).length || 0
      };
    },
  });

  // Fetch partner applications
  const { data: partnerApplications } = useQuery({
    queryKey: ['partner-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ride_companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your Uniride platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="create-ride">Create Ride</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">Registered students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalRides || 0}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.activeRides || 0}</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Partners</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalPartners || 0}</div>
                  <p className="text-xs text-muted-foreground">Registered partners</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="text-sm">
                        <p className="font-medium">New user registered</p>
                        <p className="text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="text-sm">
                        <p className="font-medium">Ride booked: Lagos → UI</p>
                        <p className="text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="text-sm">
                        <p className="font-medium">Partner application received</p>
                        <p className="text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab("create-ride")}
                      className="w-full text-left p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Create Available Ride</p>
                          <p className="text-sm opacity-80">Add a new ride for users to join</p>
                        </div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab("locations")}
                      className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Manage Locations</p>
                          <p className="text-sm text-gray-500">Add/remove states & universities</p>
                        </div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab("partners")}
                      className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Review Partners</p>
                          <p className="text-sm text-gray-500">Review partnership applications</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rides">
            <RideManagement />
          </TabsContent>

          <TabsContent value="create-ride">
            <AdminRideManager />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManagement />
          </TabsContent>

          <TabsContent value="locations">
            <RealTimeLocationManager />
          </TabsContent>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Partnership Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {partnerApplications && partnerApplications.length > 0 ? (
                  <div className="space-y-4">
                    {partnerApplications.map((partner) => (
                      <div key={partner.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{partner.company_name}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            partner.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            partner.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {partner.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{partner.contact_email}</p>
                        <p className="text-sm text-gray-600 mb-2">{partner.contact_phone}</p>
                        <p className="text-sm text-gray-700">{partner.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Applied: {new Date(partner.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No partnership applications yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
