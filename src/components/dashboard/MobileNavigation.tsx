
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, User, List } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => setActiveTab('home')}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link 
          to="/available" 
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive('/available') ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => setActiveTab('available')}
        >
          <List className="h-5 w-5 mb-1" />
          <span className="text-xs">Available</span>
        </Link>
        
        <Link 
          to="/schedule" 
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive('/schedule') ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => setActiveTab('book')}
        >
          <Car className="h-5 w-5 mb-1" />
          <span className="text-xs">Book</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive('/profile') ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
