"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import videos from "@/apis/video";
import { Spin } from "antd";
import { CommentsSection } from "@/components/video/comment-section";
import commentsApi from "@/apis/comment";
import { VideoDetails } from "@/components/video/video-details";
import { VideoCard } from "@/components/shared/video-card";

interface VideoDetail {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  owner: string;
  ownerName: string;
  channelImg: string;
  views: number;
  createdAt: string;
  isPublished: boolean;
}

interface Comment {
  _id: string;
  content: string;
  owner: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  createdAt: string;
}

export default function VideoPlayerPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [videoDetails, setVideoDetails] = useState<VideoDetail | null>(null);
  const [allVideos, setAllVideos] = useState<VideoDetail[]>([]);
  const params = useParams();
  const videoId = params.videoId as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVideo = await videos.getVideo({ videoId });
        if (resVideo) {
          setVideoDetails(resVideo);
          console.log("Video details:", resVideo);
        } else {
          toast.error("Failed to fetch video details. Please try again later.");
        }

        const resAll = await videos.getAllVideos();
        if (resAll) {
          setAllVideos(
            resAll.videos.filter((video: VideoDetail) => video.isPublished === true)
          );
        } else {
          toast.error("Failed to fetch all videos. Please try again later.");
        }

        const resComments = await commentsApi.getComments({ videoId });
        if (resComments) {
          console.log("Comments:", resComments);
          setComments(resComments);
        } else {
          toast.error("Failed to fetch comments. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        toast.error("Failed to fetch video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [videoId]);

  const handleCommentSubmit = async (newComment: string) => {
    try {
      const res = await commentsApi.addComment({
        videoId,
        content: newComment,
      });
      if (res) {
        setComments((prevComments) => [res, ...prevComments]);
      } else {
        toast.error("Failed to post comment. Please try again later.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again later.");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-8 xl:px-16 py-4 w-full">
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Spin size="large" />
        </div>
      ) : videoDetails ? (
        <>
          {/* Main Video Player */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
              <video
                src={videoDetails.videoFile}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <VideoDetails
              title={videoDetails.title}
              description={videoDetails.description}
              channelImg={videoDetails.channelImg}
              channelName={videoDetails.ownerName}
              viewCount={videoDetails.views}
              createdAt={videoDetails.createdAt}
            />

            <div className="pt-6 space-y-2">
              <CommentsSection comments={comments} handleCommentSubmit={handleCommentSubmit}/>
            </div>
          </div>

          {/* Recommended Videos */}
          <div className="lg:w-[25rem] flex-shrink-0 w-full">
            <h2 className="text-lg font-semibold text-white">Recommended</h2>
            <div className="flex flex-col gap-4 mt-4 w-full">
              {allVideos.map((video, i) => (
                <VideoCard
                  videoDetails={video}
                  key={i}
                  variant="horizontal"
                  showChannelName
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <p className="text-red-500">Video not found</p>
        </div>
      )}
    </div>
  );
}
