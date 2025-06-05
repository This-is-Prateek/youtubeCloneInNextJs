"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/lib/shared/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Heart,
  History,
  Video,
  ListVideo,
  Users,
} from "lucide-react";

const userId = 123;
const channelId = 24;

const menuItems = [
  { icon: <Home className="w-5 h-5" />, href: "/" },
  { icon: <Heart className="w-5 h-5" />, href: `/user/${userId}/liked-videos` },
  { icon: <History className="w-5 h-5" />, href: `/user/${userId}/history` },
  { icon: <Video className="w-5 h-5" />, href: `/channel/${channelId}/videos` },
  { icon: <ListVideo className="w-5 h-5" />, href: `/channel/${channelId}/playlists` },
  { icon: <Users className="w-5 h-5" />, href: `/channel/${channelId}/subscribed-channels` },
];

const SmallNav = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div>test</div>
  );
});

SmallNav.displayName = "SmallNav";
export default SmallNav;
