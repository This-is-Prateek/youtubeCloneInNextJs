"use client";

import { useEffect, useState } from "react";
import videos from "@/apis/video";

export const useVideoPanel = () => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);

  const stats = { subscribers: 123, likes: 456, views: 789 }; // Replace with real stats if needed

  const fetchAllUserVideos = async (overridePage = page) => {
    setLoading(true);
    try {
      const data = await videos.getAllUserVideos({ page: overridePage });
      setVideoList(data.videos);
      setTotalPages(data.totalPages);
      setTotalVideos(data.totalVideos);
    } catch (err) {
      setError(err);
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
    } catch (err) {
      setError(err);
      console.error("Error fetching all videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async (videoId) => {
    setLoading(true);
    try {
      const data = await videos.getVideo({ videoId });
      setSelectedVideo(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching video:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelVideos = async (channelId) => {
    setLoading(true);
    try {
      const data = await videos.getChannelVideos({ channelId });
      setChannelVideos(data.videos || data);
    } catch (err) {
      setError(err);
      console.error("Error fetching channel videos:", err);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data) => {
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
    } catch (err) {
      setError(err);
      console.error("Error publishing video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async ({ videoId, data }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);

      await videos.updateVideo({ videoId }, formData);
      await fetchAllUserVideos();
    } catch (err) {
      setError(err);
      console.error("Error editing video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    setLoading(true);
    try {
      await videos.deleteVideo({ videoId });
      await fetchAllUserVideos();
    } catch (err) {
      setError(err);
      console.error("Error deleting video:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (videoId) => {
    setLoading(true);
    try {
      await videos.togglePublishStatus({ videoId });
      await fetchAllUserVideos();
    } catch (err) {
      setError(err);
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
