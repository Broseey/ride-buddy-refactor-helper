
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Truck, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Shield,
  BarChart3,
  UserCheck,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-blue-900 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-white font-bold text-2xl tracking-tight">Uniride Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage all platform activities</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">186</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦1,245,000</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,721</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Ride Payment</p>
                    <p className="text-sm text-gray-600">User: john.doe@example.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₦2,500</p>
                    <p className="text-sm text-gray-600">5 mins ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Driver Payout</p>
                    <p className="text-sm text-gray-600">Driver: mike.driver@example.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-₦2,000</p>
                    <p className="text-sm text-gray-600">15 mins ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ride Payment</p>
                    <p className="text-sm text-gray-600">User: sarah.student@example.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₦1,800</p>
                    <p className="text-sm text-gray-600">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Driver Verification</p>
                    <p className="text-sm text-gray-600">3 pending approvals</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Dispute Resolution</p>
                    <p className="text-sm text-gray-600">2 open disputes</p>
                  </div>
                  <Button size="sm" variant="outline">Handle</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Refund Requests</p>
                    <p className="text-sm text-gray-600">5 pending refunds</p>
                  </div>
                  <Button size="sm" variant="outline">Process</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Management Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Truck className="h-6 w-6 mb-2" />
              <span>Manage Drivers</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Analytics</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Shield className="h-6 w-6 mb-2" />
              <span>Security</span>
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Payment System</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Ride Matching</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">SMS Service</p>
                <p className="text-sm text-gray-600">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
