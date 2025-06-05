"use client";

import VideoGrid from "@/components/shared/video-grid";
import { useEffect, useState } from "react";
import videosApi from "@/apis/video";

export default function Home() {
  const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await videosApi.getAllVideos();
          console.log("videos", response);
          setVideos(response.videos.filter((video) => video.isPublished === true));
        } catch (error) {
          setError(error);
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
