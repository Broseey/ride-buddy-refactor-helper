
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

interface RouteProps {
  from: string;
  to: string;
  price: string;
}

const QuickRoutes = ({ routes }: { routes: RouteProps[] }) => {
  const navigate = useNavigate();

  const handleRouteClick = (route: RouteProps) => {
    navigate('/schedule', {
      state: {
        prefilledRide: {
          from: route.from,
          to: route.to,
          date: new Date().toISOString().split('T')[0],
          time: "08:00"
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Route Selection</CardTitle>
        <CardDescription>Popular routes for your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {routes.map((route, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors border"
              onClick={() => handleRouteClick(route)}
            >
              <div className="flex items-center">
                <div className="min-w-[24px] mr-4 flex flex-col items-center">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-6 border-l border-dashed border-gray-300"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {route.from} → {route.to}
                  </p>
                  <p className="text-xs text-gray-500">Starting from {route.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  Book Now
                </Button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickRoutes;
