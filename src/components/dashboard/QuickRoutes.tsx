
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface RouteProps {
  from: string;
  to: string;
  price: string;
}

const QuickRoutes = ({ routes }: { routes: RouteProps[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Route Selection</CardTitle>
        <CardDescription>Popular routes for your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {routes.map((route, index) => (
            <Link to="/book" key={index}>
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center">
                  <div className="min-w-[24px] mr-4 flex flex-col items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="h-6 border-l border-dashed border-gray-300"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{route.from} → {route.to}</p>
                    <p className="text-xs text-gray-500">Starting from {route.price}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickRoutes;
