
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./NavbarTypes";

interface DesktopMenuProps {
  menuItems: MenuItem[];
}

const DesktopMenu = ({ menuItems }: DesktopMenuProps) => (
  <NavigationMenu>
    <NavigationMenuList className="bg-transparent border-none">
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.label}>
          <Link to={item.path}>
            <div className="flex items-center gap-2 px-4 py-2 text-white hover:opacity-80 transition-opacity">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export default DesktopMenu;
