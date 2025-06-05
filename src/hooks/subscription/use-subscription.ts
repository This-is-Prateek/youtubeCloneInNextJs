"use client";

import { useState, useCallback } from "react";
import subscriptions from "@/apis/subscription"; // adjust the import path if needed

export const useSubscriptions = () => {
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false); // For subscription fetching
  const [loadingToggle, setLoadingToggle] = useState(false); // For subscription toggle
  const [loadingSubscribers, setLoadingSubscribers] = useState(false); // For fetching subscribers
  const [error, setError] = useState<null | string>(null);
  const [subscriberList, setSubscriberList] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  const toggleSubscription = useCallback(async (channelId: string) => {
    try {
      setLoadingToggle(true);
      setError(null);
      const result = await subscriptions.toggleSubscription({ channelId });
      return result;
    } catch (err: any) {
      setError(err.message || "Error toggling subscription");
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
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscribers");
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
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscriptions");
    } finally {
      setLoadingSubscriptions(false);
    }
  }, []);

  const isSubscribedTo = useCallback((channelId: string) => {
    console.log("Checking subscription for channelId:", channelId);
    console.log("Subscribed Channels for channel:", subscribedChannels);
    
    console.log(subscribedChannels.some((sub: any) => sub._id === channelId));
    
    return subscribedChannels.some((sub: any) => sub._id === channelId);
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
