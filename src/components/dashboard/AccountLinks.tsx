
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { CreditCard, User, MapPin, ChevronRight } from "lucide-react";

const AccountLinks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          <Link to="/account/payment">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                <p className="text-sm font-medium">Payment Methods</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          <Link to="/account/profile">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-gray-500" />
                <p className="text-sm font-medium">Personal Details</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          <Link to="/account/saved-locations">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <p className="text-sm font-medium">Saved Locations</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountLinks;
