
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DriverSignIn from "./pages/DriverSignIn";
import DriverSignUp from "./pages/DriverSignUp";
import Dashboard from "./pages/Dashboard";
import DriverDashboard from "./pages/DriverDashboard";
import Schedule from "./pages/Schedule";
import MyRides from "./pages/MyRides";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Help from "./pages/Help";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Drive from "./pages/Drive";
import DriverRequirements from "./pages/DriverRequirements";
import DriverEarnings from "./pages/DriverEarnings";
import DriverHelp from "./pages/DriverHelp";
import AdminDashboard from "./pages/AdminDashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import JoinAsCompany from "./pages/JoinAsCompany";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/driver-signin" element={<DriverSignIn />} />
              <Route path="/driver-signup" element={<DriverSignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/my-rides" element={<MyRides />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/driver-requirements" element={<DriverRequirements />} />
              <Route path="/driver-earnings" element={<DriverEarnings />} />
              <Route path="/driver-help" element={<DriverHelp />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/join-as-company" element={<JoinAsCompany />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
