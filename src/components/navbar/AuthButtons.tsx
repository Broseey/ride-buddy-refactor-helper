
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const { user, userProfile } = useAuth();

  // Show user menu if user is logged in
  if (user) {
    const currentUser = {
      id: user.id,
      full_name: userProfile?.full_name || null,
      email: user.email || null,
      avatar_url: userProfile?.avatar_url || null,
    };
    
    return <UserMenu currentUser={currentUser} />;
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
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button 
          variant="default" 
          size={buttonSize} 
          className={`bg-white text-black hover:bg-gray-100 font-medium ${buttonClasses}`}
        >
          Signup
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
