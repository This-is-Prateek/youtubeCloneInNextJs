"use client";

import { useState } from "react";
import Playlists from "@/apis/playlist";

export const usePlaylists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const createPlaylist = async ({ name, description }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.createPlaylist({ name, description });
      return data;
    } catch (err) {
      setError(err?.message || "Failed to create playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPlaylist = async (playlistId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.getPlaylist({ playlistId });
      setSelectedPlaylist(data);
      return data;
    } catch (err) {
      setError(err?.message || "Failed to fetch playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserPlaylists = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.getUserPlaylists({ userId });
      setUserPlaylists(data);
      return data;
    } catch (err) {
      setError(err?.message || "Failed to fetch user playlists");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addVideoToPlaylist = async ({ playlistId, videoId }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.addVideoToPlaylist({ playlistId, videoId });
      return data;
    } catch (err) {
      setError(err?.message || "Failed to add video");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeVideoFromPlaylist = async ({ playlistId, videoId }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.removeVideoFromPlaylist({ playlistId, videoId });
      return data;
    } catch (err) {
      setError(err?.message || "Failed to remove video");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlaylist = async ({ playlistId, name, description }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.updatePlaylist({ playlistId, name, description });
      return data;
    } catch (err) {
      setError(err?.message || "Failed to update playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = async (playlistId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.deletePlaylist({ playlistId });
      return data;
    } catch (err) {
      setError(err?.message || "Failed to delete playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userPlaylists,
    selectedPlaylist,
    createPlaylist,
    getPlaylist,
    getUserPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    updatePlaylist,
    deletePlaylist,
  };
};
