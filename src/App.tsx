
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import MyRides from "./pages/MyRides";
import Profile from "./pages/Profile";
import Drive from "./pages/Drive";
import DriverSignUp from "./pages/DriverSignUp";
import DriverSignIn from "./pages/DriverSignIn";
import DriverDashboard from "./pages/DriverDashboard";
import DriverEarnings from "./pages/DriverEarnings";
import DriverHelp from "./pages/DriverHelp";
import DriverRequirements from "./pages/DriverRequirements";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Help from "./pages/Help";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Available from "./pages/Available";
import Partner from "./pages/Partner";
import JoinAsCompany from "./pages/JoinAsCompany";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DriverRoute from "./components/auth/DriverRoute";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/available" element={<Available />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/join-as-company" element={<JoinAsCompany />} />
              
              {/* Driver routes */}
              <Route path="/drive" element={<Drive />} />
              <Route path="/driver-signup" element={<DriverSignUp />} />
              <Route path="/driver-signin" element={<DriverSignIn />} />
              <Route path="/driver-requirements" element={<DriverRequirements />} />
              
              {/* Admin routes */}
              <Route path="/admin-signin" element={<AdminSignIn />} />
              
              {/* Protected user routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route path="/my-rides" element={
                <ProtectedRoute>
                  <MyRides />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/booking-confirmation" element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } />
              
              {/* Protected driver routes */}
              <Route path="/driver-dashboard" element={
                <DriverRoute>
                  <DriverDashboard />
                </DriverRoute>
              } />
              <Route path="/driver-earnings" element={
                <DriverRoute>
                  <DriverEarnings />
                </DriverRoute>
              } />
              <Route path="/driver-help" element={
                <DriverRoute>
                  <DriverHelp />
                </DriverRoute>
              } />
              
              {/* Protected admin routes */}
              <Route path="/admin-dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
