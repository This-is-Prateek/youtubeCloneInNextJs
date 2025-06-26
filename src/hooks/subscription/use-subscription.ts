"use client";

import { useState, useCallback } from "react";
import subscriptions from "@/apis/subscription"; // adjust the import path if needed

interface Subscription {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  subscriberCount: number;
  [key: string]: unknown;
}

interface ApiError {
  message?: string;
}

export const useSubscriptions = () => {
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false); // For subscription fetching
  const [loadingToggle, setLoadingToggle] = useState(false); // For subscription toggle
  const [loadingSubscribers, setLoadingSubscribers] = useState(false); // For fetching subscribers
  const [error, setError] = useState<null | string>(null);
  const [subscriberList, setSubscriberList] = useState<Subscription[]>([]);
  const [subscribedChannels, setSubscribedChannels] = useState<Subscription[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  const toggleSubscription = useCallback(async (channelId: string) => {
    try {
      setLoadingToggle(true);
      setError(null);
      const result = await subscriptions.toggleSubscription({ channelId });
      return result;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || "Error toggling subscription");
      throw err;
    } finally {
      setLoadingToggle(false);
    }
  }, []);

  const getSubscribers = useCallback(async (channelId: string) => {
    try {
      setLoadingSubscribers(true);
      setError(null);
      const data = await subscriptions.getSubscribers({ channelId });
      setSubscriberList(data);
      setTotalSubscribers(data.subscriberCount);
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to fetch subscribers");
    } finally {
      setLoadingSubscribers(false);
    }
  }, []);

  const getSubscriptions = useCallback(async (subscriberId: string) => {
    try {
      setLoadingSubscriptions(true);
      setError(null);
      const data = await subscriptions.getSubscriptions({ subscriberId });
      setSubscribedChannels(data.channelsSubscribed);
      setTotalSubscriptions(data.subscriptionCount);
      console.log("Subscribed Channels:", data.channelsSubscribed);
      return data;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to fetch subscriptions");
    } finally {
      setLoadingSubscriptions(false);
    }
  }, []);

  const isSubscribedTo = useCallback((channelId: string) => {
    console.log("Checking subscription for channelId:", channelId);
    console.log("Subscribed Channels for channel:", subscribedChannels);
    
    console.log(subscribedChannels.some((sub: Subscription) => sub._id === channelId));
    
    return subscribedChannels.some((sub: Subscription) => sub._id === channelId);
  }, [subscribedChannels]);

  return {
    loadingSubscriptions,
    loadingToggle,
    loadingSubscribers,
    error,
    totalSubscribers,
    totalSubscriptions,
    toggleSubscription,
    getSubscribers,
    getSubscriptions,
    subscriberList,
    subscribedChannels,
    isSubscribedTo,
  };
};
