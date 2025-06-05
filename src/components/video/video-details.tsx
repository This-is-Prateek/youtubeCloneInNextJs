"use client";

import { Button } from "@/lib/shared/components/ui/button";
import Image from "next/image";
import { ExpandableContentCell } from "@/components/shared/collapsible-content-cell"; // adjust path accordingly
import { VideoDescription } from "./description";

export function VideoDetails({
  title,
  description,
  channelImg,
  channelName,
  viewCount,
  createdAt,
}: {
  title: string;
  description: string;
  channelImg: string;
  channelName: string;
  viewCount: number;
  createdAt: string;
}) {
  return (
    <div className="space-y-4 text-white">
      {/* Video Title */}
      <h1 className="text-xl font-bold text-white">{title}</h1>

      {/* Channel Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={channelImg || "/images/profile.svg"}
            alt="Channel"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-white">
              {channelName}
            </span>
            <Button size="sm" className="mt-1">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Like and Share Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="default">👍 Like</Button>
          <Button variant="outline">🔗 Share</Button>
        </div>
      </div>

      {/* Collapsible Description */}
      <VideoDescription description={description} views={viewCount} createdAt={createdAt}/>
    </div>
  );
}
