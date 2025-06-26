"use client";

import VideoGrid from "@/components/shared/video-grid";
import { useEffect, useState } from "react";
import videosApi from "@/apis/video";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  owner: string;
  ownerName: string;
  channelImg?: string;
  views: number;
  createdAt: string;
  isPublished: boolean;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videosApi.getAllVideos();
        console.log("videos", response);
        setVideos(response.videos.filter((video: Video) => video.isPublished === true));
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main className="w-full h-full px-4 pt-6 bg-black">
      <VideoGrid videos={videos} loading={loading} error={error}/>
    </main>
  );
}
