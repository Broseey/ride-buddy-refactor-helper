
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Car, MapPin, DollarSign, Settings, BarChart3 } from "lucide-react";
import LocationManagement from "@/components/admin/LocationManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app, this would come from Supabase
  const stats = {
    totalUsers: 1248,
    totalDrivers: 156,
    activeRides: 23,
    totalRevenue: 2450000
  };

  const recentDrivers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "pending", joinedAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "verified", joinedAt: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "rejected", joinedAt: "2024-01-13" },
  ];

  const recentRides = [
    { id: 1, from: "University of Lagos", to: "Lagos", status: "completed", price: 5000 },
    { id: 2, from: "Ahmadu Bello University", to: "Kaduna", status: "active", price: 7500 },
    { id: 3, from: "University of Ibadan", to: "Oyo", status: "pending", price: 4500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your ride-sharing platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="locations">Locations & Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDrivers}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeRides}</div>
                  <p className="text-xs text-muted-foreground">Live tracking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Driver Applications</CardTitle>
                  <CardDescription>Latest driver verification requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-gray-500">{driver.email}</p>
                        </div>
                        <Badge 
                          variant={
                            driver.status === 'verified' ? 'default' : 
                            driver.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {driver.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Rides</CardTitle>
                  <CardDescription>Latest ride bookings and completions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRides.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{ride.from} → {ride.to}</p>
                          <p className="text-sm text-gray-500">₦{ride.price.toLocaleString()}</p>
                        </div>
                        <Badge 
                          variant={
                            ride.status === 'completed' ? 'default' : 
                            ride.status === 'active' ? 'secondary' : 'outline'
                          }
                        >
                          {ride.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Management</CardTitle>
                <CardDescription>Verify and manage driver applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Driver management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride Management</CardTitle>
                <CardDescription>Monitor and manage all rides on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Ride management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <LocationManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
