"use client";

import Image from "next/image";
import { Card, CardContent } from "@/lib/shared/components/ui/card";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/helpers/time-ago";
import { formatNumber } from "@/helpers/format-to-standard-form";
import { useRouter } from "next/navigation";

interface VideoDetails {
  _id: string;
  title: string;
  thumbnail: string;
  owner: string;
  ownerName: string;
  channelImg?: string;
  views: number;
  createdAt: string;
}

interface VideoCardProps {
  videoDetails: VideoDetails;
  showChannelImage?: boolean;
  showChannelName?: boolean;
  variant?: "vertical" | "horizontal";
}

export function VideoCard({
  videoDetails,
  showChannelImage = false,
  showChannelName = false,
  variant = "vertical",
}: VideoCardProps) {
  const isVertical = variant === "vertical";
  const router = useRouter();

  const goToVideo = () => router.push(`/video/${videoDetails._id}`);
  const goToChannel = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/channel/${videoDetails.owner}`);
  };

  return (
    <div
      role="button"
      onClick={goToVideo}
      className="w-full h-full hover:scale-105 transition-transform duration-200"
    >
      <Card
        className={cn(
          "overflow-hidden bg-black text-white flex border-0 cursor-pointer",
          isVertical
            ? "flex-col p-0 gap-0"
            : "w-full flex-row gap-3 items-start p-2"
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "relative overflow-hidden rounded aspect-video",
            isVertical ? "w-full" : "w-1/2 max-w-44 flex-shrink-0"
          )}
        >
          <Image
            src={videoDetails.thumbnail}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
        </div>

        {/* Video Details */}
        <CardContent
          className={cn(
            "flex p-3 w-full gap-2 items-start",
            !isVertical && "p-0 w-1/2"
          )}
        >
          {showChannelImage && (
            <div
              role="button"
              onClick={goToChannel}
              className="flex-shrink-0"
            >
              <Image
                src={videoDetails.channelImg || "/images/profile.svg"}
                alt="Channel"
                width={30}
                height={30}
                className="rounded-full hover:opacity-70 transition-opacity duration-200"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="font-semibold text-sm line-clamp-2">
              {videoDetails.title}
            </div>
            {showChannelName && (
              <div className="flex flex-col">
                <span
                  onClick={goToChannel}
                  className="text-sm text-muted-foreground hover:text-blue-500 hover:underline cursor-pointer"
                >
                  {videoDetails.ownerName}
                </span>
                <div className="text-s text-muted-foreground flex gap-1">
                  <span>{formatNumber(videoDetails.views)} views</span>
                  <strong>&middot;</strong>
                  <span>{timeAgo(videoDetails.createdAt)}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
