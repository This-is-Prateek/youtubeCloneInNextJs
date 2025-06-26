"use client";

import { useState } from "react";
import Playlists from "@/apis/playlist";

interface Playlist {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  videos: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePlaylistParams {
  name: string;
  description?: string;
}

interface ApiError {
  message?: string;
}

export const usePlaylists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const createPlaylist = async ({ name, description }: CreatePlaylistParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.createPlaylist({ name, description: description || "" });
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to create playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPlaylist = async (playlistId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.getPlaylist({ playlistId });
      setSelectedPlaylist(data);
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to fetch playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserPlaylists = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.getUserPlaylists({ userId });
      setUserPlaylists(data);
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to fetch user playlists");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addVideoToPlaylist = async ({ playlistId, videoId }: { playlistId: string; videoId: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.addVideoToPlaylist({ playlistId, videoId });
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to add video");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeVideoFromPlaylist = async ({ playlistId, videoId }: { playlistId: string; videoId: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.removeVideoFromPlaylist({ playlistId, videoId });
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to remove video");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlaylist = async ({ playlistId, name, description }: { playlistId: string; name: string; description?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.updatePlaylist({ playlistId, name, description: description || "" });
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to update playlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = async (playlistId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Playlists.deletePlaylist({ playlistId });
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Failed to delete playlist");
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
