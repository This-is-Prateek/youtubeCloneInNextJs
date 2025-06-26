"use client";

import { VideoStats } from "@/components/admin/channel-stats";
import { VideoTable } from "@/components/admin/video-table";
import { UploadVideoPopup } from "@/components/admin/upload-video-popup";
import Button from "@/components/shared/button";
import { useVideoPanel } from "@/hooks/admin/use-video-panel";
import { useState } from "react";
import { useUser } from "@/hooks/auth/use-user";
import { Spin } from "antd";

export default function AdminPage() {
  const { videoList, onSubmit, togglePublishStatus, handleDelete, handleEdit, page, setPage, totalPages, totalVideos } =
    useVideoPanel();
  const { user, loading, error } = useUser(); // Get user data from useUser hook

  const [uploadVideo, setUploadVideo] = useState(false);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="w-full h-full px-8 py-2 bg-black text-white">
      <section className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back, {user?.fullName.split(" ")[0] || "Admin"}</h1>
          <p className="text-sm text-muted-foreground">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <Button onClick={() => setUploadVideo(true)}>Upload Video</Button>
      </section>

      <VideoStats
        views={10} // These can be dynamic
        subscribers={10} // These can be dynamic
        likes={10} // These can be dynamic
      />

      <div className="mt-6">
        <VideoTable
          videos={videoList}
          onPublish={togglePublishStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalVideos={totalVideos}
        />
      </div>

      <UploadVideoPopup
        open={uploadVideo}
        onClose={() => setUploadVideo(false)}
        onUpload={onSubmit}
      />
    </main>
  );
}
