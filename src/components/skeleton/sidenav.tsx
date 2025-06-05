"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/lib/shared/components/ui/button";
import { ScrollArea } from "@/lib/shared/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Home,
  Heart,
  History,
  Video,
  ListVideo,
  Users,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SideNavbar = (({ className, isCollapsed }:{className?:string, isCollapsed:boolean}) => {
  const user = useSelector((state: RootState) => state.auth.userData);
  if (!user) return null; 
  const menuItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    { label: "Liked Videos", icon: <Heart className="w-5 h-5" />, href: `/user/${user._id}/liked-videos` },
    { label: "Watch History", icon: <History className="w-5 h-5" />, href: `/user/${user._id}/watch-history` },
    { label: "My Videos", icon: <Video className="w-5 h-5" />, href: `/channel/${user._id}/videos` },
    { label: "My Playlists", icon: <ListVideo className="w-5 h-5" />, href: `/channel/${user._id}/playlists` },
    { label: "Subscriptions", icon: <Users className="w-5 h-5" />, href: `/channel/${user._id}/subscribed-channels` },
  ];
  
  const bottomItems = [
    { label: "Support", icon: <LifeBuoy className="w-5 h-5" />, href: "/information" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: `/user/${user._id}` },
  ];
  return (
    <nav
      className={cn(
        `h-[calc(100vh-5rem)] sticky top-0 left-0 bg-black text-white border-r transition-all`,
        className
      )}
    >
      <ScrollArea className="h-full">
        <div className="flex flex-col justify-between h-full py-4 px-3">
          {/* Top Menu */}
          <div className="space-y-2 flex flex-col">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 cursor-pointer hover:bg-blue-950 hover:text-white rounded-full px-4 py-2 text-white ${isCollapsed ? '' : 'w-full'}`}
                >
                  {item.icon}
                  {isCollapsed ? null : item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Bottom Menu */}
          <div className="space-y-2 pt-4 border-t border-white/10 flex flex-col">
            {bottomItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 cursor-pointer hover:bg-blue-950 hover:text-white rounded-full px-4 py-2 text-white ${isCollapsed ? '' : 'w-full'}`}
                >
                  {item.icon}
                  {isCollapsed ? null : item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </nav>
  );
});

SideNavbar.displayName = "SideNavbar";
export default SideNavbar;
