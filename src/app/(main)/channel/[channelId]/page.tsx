'use client';

import VideoGrid from "@/components/shared/video-grid";
import { useVideoPanel } from "@/hooks/admin/use-video-panel";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function ChannelVideosPage() {
  const { channelVideos, fetchChannelVideos, loading, error } = useVideoPanel();
  const params = useParams();
  const channelId = useMemo(()=> params.channelId, [params]);

  useEffect(() => {
    if (channelId) {
      fetchChannelVideos(channelId as string);
    }

  }, [channelId]);

  return (
    <section className="w-full px-4 py-6">
      <div className="flex flex-wrap gap-4">
        {loading && <div>Loading videos...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        <VideoGrid videos={channelVideos} loading={loading} error={error} />
      </div>
    </section>
  );
}
