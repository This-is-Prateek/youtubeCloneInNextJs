"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/shared/components/ui/dialog";
import Input from "@/components/shared/input";
import Button from "@/components/shared//button";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function UploadVideoPopup({ open, onClose, onUpload }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [uploading, setUploading] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const thumbnailFile = watch("thumbnail");
  const videoFile = watch("videoFile");

  useEffect(() => {
    if (!open) {
      setUploading(false);
      reset();
      setThumbnailPreview(null);
      setVideoPreview(null);
    }
  }, [open, reset]);

  useEffect(() => {
    if (thumbnailFile && thumbnailFile[0]) {
      const url = URL.createObjectURL(thumbnailFile[0]);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailFile]);

  useEffect(() => {
    if (videoFile && videoFile[0]) {
      const url = URL.createObjectURL(videoFile[0]);
      setVideoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  const onSubmit = async (data) => {
    setUploading(true);
    await onUpload(data);
    setUploading(false);
    onClose();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setValue(type, [file]);
  };

  const preventDefault = (e) => e.preventDefault();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black text-white">
        {uploading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-6">
            <Loader2 className="animate-spin text-primary w-6 h-6" />
            <span className="text-sm">Uploading video...</span>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Upload New Video</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Video Title"
                  {...register("title", { required: true })}
                />
                <Input
                  placeholder="Video Description"
                  {...register("description", { required: true })}
                />
              </div>

              <div className="flex gap-4">
                {/* Thumbnail Upload */}
                <div
                  className={cn(
                    "w-1/2 h-32 border border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground relative overflow-hidden cursor-pointer",
                    thumbnailPreview && "p-1"
                  )}
                  onDrop={(e) => handleDrop(e, "thumbnail")}
                  onDragOver={preventDefault}
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  {thumbnailPreview ? (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <span>Drop Thumbnail</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("thumbnail", { required: true })}
                    ref={(e) => {
                      register("thumbnail").ref(e);
                      thumbnailInputRef.current = e;
                    }}
                    hidden
                  />
                </div>

                {/* Video Upload */}
                <div
                  className={cn(
                    "w-1/2 h-32 border border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground relative overflow-hidden cursor-pointer",
                    videoPreview && "p-1"
                  )}
                  onDrop={(e) => handleDrop(e, "videoFile")}
                  onDragOver={preventDefault}
                  onClick={() => videoInputRef.current?.click()}
                >
                  {videoPreview ? (
                    <video
                      src={videoPreview}
                      className="w-full h-full object-cover rounded"
                      muted
                      controls
                    />
                  ) : (
                    <span>Drop Video</span>
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    {...register("videoFile", { required: true })}
                    ref={(e) => {
                      register("videoFile").ref(e);
                      videoInputRef.current = e;
                    }}
                    hidden
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
