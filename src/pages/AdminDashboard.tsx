
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
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const { 
    rides, 
    rideRequests, 
    driverProfiles, 
    userProfiles,
    approveRideRequest,
    rejectRideRequest,
    verifyDriver,
    rejectDriver 
  } = useAdmin();

  const totalUsers = userProfiles?.length || 0;
  const totalDrivers = driverProfiles?.length || 0;
  const verifiedDrivers = driverProfiles?.filter(d => d.verification_status === 'verified').length || 0;
  const pendingDrivers = driverProfiles?.filter(d => d.verification_status === 'pending').length || 0;
  const totalRides = rides?.length || 0;
  const completedRides = rides?.filter(r => r.status === 'completed').length || 0;
  const pendingRequests = rideRequests?.filter(r => r.status === 'pending').length || 0;

  const totalRevenue = rides
    ?.filter(r => r.status === 'completed')
    ?.reduce((sum, ride) => sum + (Number(ride.price) || 0), 0) || 0;

  const handleSignOut = async () => {
    await signOut();
  };

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
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={handleSignOut}>
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
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedDrivers}</div>
              <p className="text-xs text-muted-foreground">{pendingDrivers} pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From {completedRides} completed rides</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRides}</div>
              <p className="text-xs text-muted-foreground">{completedRides} completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Ride Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Pending Ride Requests ({pendingRequests})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {rideRequests?.filter(r => r.status === 'pending').slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{request.rides?.from_location} → {request.rides?.to_location}</p>
                      <p className="text-xs text-gray-600">
                        {request.profiles?.full_name} • {request.request_type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => approveRideRequest(request.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => rejectRideRequest(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                )) || <p className="text-gray-500 text-sm">No pending requests</p>}
              </div>
            </CardContent>
          </Card>

          {/* Driver Verification Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Driver Verification ({pendingDrivers})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {driverProfiles?.filter(d => d.verification_status === 'pending').slice(0, 5).map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{driver.full_name}</p>
                      <p className="text-xs text-gray-600">{driver.email}</p>
                      <Badge variant="outline" className="text-xs">
                        {driver.verification_status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => verifyDriver(driver.id)}
                      >
                        Verify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => rejectDriver(driver.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                )) || <p className="text-gray-500 text-sm">No pending verifications</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Recent Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {rides?.slice(0, 10).map((ride) => (
                <div key={ride.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{ride.from_location} → {ride.to_location}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(ride.departure_date).toLocaleDateString()} at {ride.departure_time}
                    </p>
                    <p className="text-xs text-gray-500">
                      Booked by: {ride.profiles?.full_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={ride.status === 'completed' ? 'default' : 'secondary'}
                      className={ride.status === 'completed' ? 'bg-green-500' : ''}
                    >
                      {ride.status}
                    </Badge>
                    {ride.price && (
                      <p className="text-sm font-medium">₦{Number(ride.price).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )) || <p className="text-gray-500 text-sm">No rides yet</p>}
            </div>
          </CardContent>
        </Card>

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
                <p className="font-medium">Ride System</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Driver Verification</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Payment System</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
