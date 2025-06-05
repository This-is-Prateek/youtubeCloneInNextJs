'use client';

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Spin } from "antd";

import SubscribedChannelCard from "@/components/channel/subscribed/subscribed-channel-card";
import { useSubscriptions } from "@/hooks/subscription/use-subscription";

export default function SubscribedChannelsPage() {
  const { channelId } = useParams();
  const {
    getSubscriptions,
    subscribedChannels,
    loadingSubscriptions,
    error,
  } = useSubscriptions();

  useEffect(() => {
    if (!channelId || typeof channelId !== "string") return;

    getSubscriptions(channelId).catch((err) => {
      console.error("Error fetching subscriptions:", err);
      toast.error("Failed to fetch subscriptions. Please try again later.");
    });
  }, [channelId]);

  if (loadingSubscriptions) {
    return <Spin/>;
  }

  if (subscribedChannels.length === 0) {
    return <div className="text-muted-foreground text-center">You haven't subscribed to any channels yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subscribedChannels.map((channel) => (
        <SubscribedChannelCard
          key={channel._id}
          id={channel._id}
          name={channel.fullName}
          username={channel.username}
          avatar={channel.avatar}
          subscribers={channel.subscriberCount}
        />
      ))}
    </div>
  );
}
