"use client";

import { VideoCard } from "@/components/shared/video-card";

const mockHistory = [
  {
    _id: "1",
    title: "How to Master TypeScript in 2024",
    thumbnail: "/images/thumb1.jpg",
    owner: "user1",
    ownerName: "CodeWizard",
    channelImg: "/images/profile1.jpg",
    views: 1000,
    createdAt: "2024-01-01",
  },
  {
    _id: "2",
    title: "React vs. Vue: The Final Showdown",
    thumbnail: "/images/thumb2.jpg",
    owner: "user2",
    ownerName: "DevTalks",
    channelImg: "/images/profile2.jpg",
    views: 1500,
    createdAt: "2024-01-02",
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
            key={video._id}
            videoDetails={video}
            showChannelImage
            showChannelName
          />
        ))}
      </div>
    </div>
  );
}
