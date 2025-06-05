"use client";

import { VideoCard } from "@/components/shared/video-card";

const mockHistory = [
  {
    id: "1",
    title: "How to Master TypeScript in 2024",
    thumbnailUrl: "/images/thumb1.jpg",
    description: "A deep dive into mastering TypeScript with real-world examples.",
    channelImage: "/images/profile1.jpg",
    channelName: "CodeWizard",
  },
  {
    id: "2",
    title: "React vs. Vue: The Final Showdown",
    thumbnailUrl: "/images/thumb2.jpg",
    description: "A feature-by-feature comparison between React and Vue.",
    channelImage: "/images/profile2.jpg",
    channelName: "DevTalks",
  },
  // Add more mock video objects as needed
];

export default function WatchHistoryPage() {
  return (
    <div className="p-4 space-y-6 bg-black">
      <h2 className="text-2xl font-semibold text-white">Watch History</h2>
      <div className="flex flex-wrap gap-4">
        {mockHistory.map((video) => (
          <VideoCard
            key={video.id}
            videoDetails={video}
            showChannelImage
            showChannelName
          />
        ))}
      </div>
    </div>
  );
}
