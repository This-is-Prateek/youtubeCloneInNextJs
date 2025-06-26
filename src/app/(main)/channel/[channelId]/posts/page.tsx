"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/lib/shared/components/ui/textarea";
import Button from "@/components/shared/button";
import PostCard from "@/components/channel/post/post-card";
import { useTweets } from "@/hooks/tweets/use-tweet"; // your custom hook
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ChannelPostsPage() {
  const { channelId } = useParams(); 
  const [newPost, setNewPost] = useState("");

  const {
    tweetList,
    loading,
    createTweet,
    getUserTweets,
  } = useTweets();

  useEffect(() => {
    if (!channelId) return;
    const fetchTweets = async () => {
      try {
        await getUserTweets(channelId as string);
      } catch {
        toast.error("Failed to fetch posts.");
      }
    }
    fetchTweets();
  }, [channelId, getUserTweets]);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;

    try {
      await createTweet(newPost);
      setNewPost("");
    } catch {
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Post Input Form */}
      <div className="bg-muted/10 p-4 rounded-xl space-y-4">
        <Textarea
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="min-h-[100px] text-sm"
        />
        <div className="flex justify-end">
          <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
            Post
          </Button>
        </div>
      </div>

      {/* Post Feed */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-muted-foreground">Loading posts...</p>
        ) : tweetList  ? (
          tweetList.map((post) => (
            <PostCard
              key={post._id}
              content={post.content}
              createdAt={new Date(post.createdAt)}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm text-center">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
