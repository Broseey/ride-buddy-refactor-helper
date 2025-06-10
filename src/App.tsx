
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Help from "./pages/Help";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyRides from "./pages/MyRides";
import Schedule from "./pages/Schedule";
import Available from "./pages/Available";
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
import Partner from "./pages/Partner";
import JoinAsCompany from "./pages/JoinAsCompany";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DriverRoute from "./components/auth/DriverRoute";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/help" element={<Help />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/driver-signup" element={<DriverSignUp />} />
              <Route path="/driver-signin" element={<DriverSignIn />} />
              <Route path="/admin-signin" element={<AdminSignIn />} />
              <Route path="/admin" element={<AdminSignIn />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/join-as-company" element={<JoinAsCompany />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/my-rides" element={
                <ProtectedRoute>
                  <MyRides />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route path="/available" element={
                <ProtectedRoute>
                  <Available />
                </ProtectedRoute>
              } />
              <Route path="/booking-confirmation" element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } />

              {/* Driver Routes */}
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
              <Route path="/driver-requirements" element={
                <DriverRoute>
                  <DriverRequirements />
                </DriverRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
