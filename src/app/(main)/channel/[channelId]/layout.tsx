"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import Button from "@/components/shared/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useSubscriptions } from "@/hooks/subscription/use-subscription";
import { formatNumber } from "@/helpers/format-to-standard-form";
import { useGetUser } from "@/hooks/shared/use-get-user";

const navLinks = [
  { label: "Videos", path: "videos" },
  { label: "Playlists", path: "playlists" },
  { label: "Posts", path: "posts" },
  { label: "Subscribed", path: "subscribed-channels" },
];

export default function ChannelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { channelId } = useParams();
  const user = useSelector((state: RootState) => state.auth.userData);
  const [subscribed, setSubscribed] = React.useState(false);
  const { toggleSubscription, getSubscriptions, isSubscribedTo, totalSubscribers, loadingToggle } = useSubscriptions()
  const {fetchUser, user:channel} = useGetUser();

  useEffect(() => {
    if (user && channelId) {
      getSubscriptions(user._id); // Fetch the subscriptions only once
    }
  }, [user, channelId]);

  useEffect(() => {
    if (channelId && user) {
      setSubscribed(isSubscribedTo(channelId as string));
    }
  }, [channelId, user]);

  useEffect(() => {
    if (!channel) {
      fetchUser(channelId as string); // Fetch user data if not available
    }
  }
  , [channelId, channel]);

  const handleSubscriptionToggle = async () => {
    if (!user) return; // Ensure user is logged in

    try {
      const res = await toggleSubscription(channelId as string);
      if (!res) {
        toast.error("Failed to toggle subscription. Please try again.");
        return;
      }
      console.log("Subscription toggled:", res);
      setSubscribed((prev) => !prev);
      toast.success(
        subscribed ? "Unsubscribed successfully!" : "Subscribed successfully!");
    } catch (err) {
      console.error("Error toggling subscription:", err);
      toast.error("Failed to toggle subscription. Please try again.");
    }
  }

  return (
    <section className="w-full h-full overflow-auto bg-black text-white">
      <div className="w-full h-full">
        <div className="flex flex-col w-full h-full">
          {/* Banner */}
          <div className="w-full">
            <Image
              src="/images/channelbg.jpg"
              alt="channel banner"
              width={1200}
              height={160}
              className="w-full h-40 object-cover"
            />
          </div>

          {/* Channel Header */}
          <div className="flex justify-between items-center w-full px-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile.svg"
                alt="channel image"
                width={128}
                height={128}
                className="rounded-full border-4 border-background"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{channel?.fullName}</h2>
                <span className="text-muted-foreground text-sm">@{channel?.userName}</span>
                <span className="text-muted-foreground text-sm">
                  {formatNumber(totalSubscribers)} Subscribers
                </span>
              </div>
            </div>

            {user && user._id !== channelId && (
              <Button className="rounded-full gap-2 px-5 py-2 text-sm" onClick={handleSubscriptionToggle} loading={loadingToggle}>
                {loadingToggle ? (
                  "Loading..."
                ) : subscribed ? (
                  <>
                    <Image
                      src="/images/subscribed.svg"
                      alt="subscribed"
                      width={20}
                      height={20}
                    />
                    Unsubscribe
                  </>
                ) : (
                  <>
                    <Image
                      src="/images/subscribe.svg"
                      alt="subscribe"
                      width={20}
                      height={20}
                    />
                    Subscribe
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className="w-full bg-black text-white sticky top-0 z-20 pt-4">
            <div className="flex justify-evenly border-b border-white/30">
              {navLinks.map((link) => {
                const href = `/channel/${channelId}/${link.path}`;
                let isActive = pathname === href;
                if (pathname === `/channel/${channelId}` && href === `/channel/${channelId}/videos`) {
                  isActive = true; // Handle root path case for videos
                }

                if (pathname === `/protected/channel/${channelId}` && link.path === "videos") {
                  isActive = true;
                }
                return (
                  <Link
                    key={link.path}
                    href={href}
                    className={`py-3 px-4 text-sm font-medium flex-1 text-center transition-colors border-b-2 ${isActive
                      ? "border-b-2 border-white text-white"
                      : "text-muted-foreground border-transparent hover:border-white/50"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Outlet Content */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
