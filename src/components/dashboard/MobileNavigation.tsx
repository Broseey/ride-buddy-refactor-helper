
import React from "react";
import { Home, Clock, Calendar, User } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MobileNavigation = ({ activeTab, setActiveTab }: MobileNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-transparent border-t">
          <TabsTrigger value="home" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none">
            <div className="flex flex-col items-center py-2">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none">
            <div className="flex flex-col items-center py-2">
              <Clock className="h-5 w-5" />
              <span className="text-xs mt-1">Activity</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none">
            <div className="flex flex-col items-center py-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Schedule</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none">
            <div className="flex flex-col items-center py-2">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Account</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MobileNavigation;
