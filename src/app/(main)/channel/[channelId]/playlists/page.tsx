"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/lib/shared/components/ui/skeleton";
import PlaylistCard from "@/components/channel/playlist/playlist-card";
import { usePlaylists } from "@/hooks/playlist/use-playlist";
import { toast } from "sonner";

export default function PlaylistPage() {
  const { channelId } = useParams();
  const {
    getUserPlaylists,
    userPlaylists,
    loading,
  } = usePlaylists();

  useEffect(() => {
    if (!channelId) return;

    const loadPlaylists = async () => {
      try {
        await getUserPlaylists(Array.isArray(channelId) ? channelId[0] : channelId);
      } catch (err) {
        console.error("Failed to load playlists:", err);
        toast.error("Failed to load playlists. Please try again later.");
      }
    };

    loadPlaylists();
  }, [channelId, getUserPlaylists]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[220px] w-full rounded-xl" />
        ))
      ) : userPlaylists && userPlaylists.length > 0 ? (
        userPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            id={playlist._id}
            title={playlist.name}
            thumbnail={playlist.thumbnail || "/images/default-thumbnail.jpg"}
            videosCount={playlist.videos.length}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground text-sm">
          No playlists available.
        </div>
      )}
    </div>
  );
}
