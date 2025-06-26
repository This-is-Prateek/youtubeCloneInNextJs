"use client";

import { useState } from "react";
import tweets from "@/apis/tweet"; // adjust if the path is different

interface Tweet {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

export const useTweets = () => {
  const [tweetList, setTweetList] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createTweet = async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      const newTweet = await tweets.createTweet({ content });
      setTweetList((prev) => [newTweet, ...prev]);
      return newTweet;
    } catch {
      setError("Failed to create tweet");
    } finally {
      setLoading(false);
    }
  };

  const getUserTweets = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTweets = await tweets.getTweet({ id: userId });
      setTweetList(fetchedTweets);
      return fetchedTweets;
    } catch {
      setError("Failed to fetch tweets");
    } finally {
      setLoading(false);
    }
  };

  const updateTweet = async (id: string, content: string) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await tweets.updateTweet({ id, content });
      setTweetList((prev) =>
        prev.map((tweet) => (tweet._id === id ? updated : tweet))
      );
      return updated;
    } catch {
      setError("Failed to update tweet");
    } finally {
      setLoading(false);
    }
  };

  const deleteTweet = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await tweets.deleteTweet({ id });
      setTweetList((prev) => prev.filter((tweet) => tweet._id !== id));
    } catch {
      setError("Failed to delete tweet");
    } finally {
      setLoading(false);
    }
  };

  return {
    tweetList,
    loading,
    error,
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
  };
};
