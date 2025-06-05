// app/page.tsx
"use client";

import { VideoCard } from "@/components/shared/video-card";
import { VideoSkeletonGrid } from "./video-skeleton-grid";

export default function VideoGrid({videos, loading, error}) {

  return (
    <main className="w-full h-full px-4 pt-6 flex justify-center">
      <div className="w-full">
        {loading ? (
          <VideoSkeletonGrid />
        ) : error ? (
          <div className="w-full flex justify-center items-center text-red-500">
            Failed to load videos. Please try again later.
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
                videoDetails={video}
                showChannelImage
                showChannelName
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center text-muted-foreground">
            No videos available to show.
          </div>
        )}
      </div>
    </main>
  );
}
