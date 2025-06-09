
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const { user, userProfile, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  // Show user menu if authenticated
  if (user && userProfile) {
    return <UserMenu currentUser={userProfile} />;
  }

  const buttonSize = isMobile ? "sm" : "sm";
  const buttonClasses = isMobile ? "text-sm px-3 py-1" : "";

  return (
    <div className="flex items-center space-x-2">
      <Link to="/signin">
        <Button 
          variant="ghost" 
          size={buttonSize} 
          className={`text-white hover:bg-white/10 font-medium border-none ${buttonClasses}`}
        >
          Log in
        </Button>
      </Link>
      <Link to="/signup">
        <Button 
          variant="default" 
          size={buttonSize} 
          className={`bg-white text-black hover:bg-gray-100 font-medium ${buttonClasses}`}
        >
          Sign up
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
