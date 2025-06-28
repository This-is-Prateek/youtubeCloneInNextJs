"use client";

import { useState } from "react";
import videos, { Video } from "@/apis/video";

interface ApiError {
  message?: string;
}

interface VideoData {
  title: string;
  description: string;
  thumbnail?: FileList;
  videoFile?: FileList;
}

export const useVideoPanel = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channelVideos, setChannelVideos] = useState<Video[]>([]);

  const stats = { subscribers: 123, likes: 456, views: 789 }; // Replace with real stats if needed

  const fetchAllUserVideos = async (overridePage = page) => {
    setLoading(true);
    try {
      const data = await videos.getAllUserVideos({ page: overridePage });
      setVideoList(data.videos);
      setTotalPages(data.totalPages);
      setTotalVideos(data.totalVideos);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error fetching user videos");
      console.error("Error fetching user videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllVideos = async () => {
    setLoading(true);
    try {
      const data = await videos.getAllVideos();
      setVideoList(data.videos || data); // Adjust structure based on your API response
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error fetching all videos");
      console.error("Error fetching all videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async (videoId: string) => {
    setLoading(true);
    try {
      const data = await videos.getVideo({ videoId });
      setSelectedVideo(data);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error fetching video");
      console.error("Error fetching video:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelVideos = async (channelId: string) => {
    setLoading(true);
    try {
      const data = await videos.getChannelVideos({ channelId });
      setChannelVideos(data.videos || data);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error fetching channel videos");
      console.error("Error fetching channel videos:", err);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: VideoData) => {
    if (!data.videoFile || !data.thumbnail)
      return alert("Video & Thumbnail required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", data.videoFile[0]);
      formData.append("thumbnail", data.thumbnail[0]);

      await videos.publishVideo(formData);
      await fetchAllUserVideos(1); // Reset to first page
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error publishing video");
      console.error("Error publishing video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async ({ videoId, data }: { videoId: string; data: VideoData }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);

      await videos.updateVideo({ videoId }, formData);
      await fetchAllUserVideos();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error editing video");
      console.error("Error editing video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    setLoading(true);
    try {
      await videos.deleteVideo({ videoId });
      await fetchAllUserVideos();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error deleting video");
      console.error("Error deleting video:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (videoId: string) => {
    setLoading(true);
    try {
      await videos.togglePublishStatus({ videoId });
      await fetchAllUserVideos();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Error toggling publish status");
      console.error("Error toggling publish status:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    videoList,
    selectedVideo,
    fetchVideo,
    fetchAllVideos,
    fetchAllUserVideos,
    fetchChannelVideos,
    page,
    setPage,
    totalPages,
    totalVideos,
    channelVideos,
    loading,
    error,
    onSubmit,
    handleEdit,
    handleDelete,
    togglePublishStatus,
  };
};
