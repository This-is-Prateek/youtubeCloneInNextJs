"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/shared/components/ui/dialog";
import { Input } from "@/lib/shared/components/ui/input";
import { Button } from "@/lib/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/lib/shared/components/ui/textarea";

export function EditVideoPopup({ open, onClose, onSave, video }: { open: boolean, onClose: () => void, onSave: (data: any) => void, video: any }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [uploading, setUploading] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const thumbnailFile = watch("thumbnail");

  useEffect(() => {
    if (!open) {
      setUploading(false);
      reset();
      setThumbnailPreview(null);
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
    if (video) {
      reset({
        title: video.title || "",
        description: video.description || "",
      });

      if (video.thumbnail) {
        setThumbnailPreview(video.thumbnail);
      }
    }
  }, [video, reset]);

  const onSubmit = async (data: any) => {
    setUploading(true);
    await onSave({ videoId: video._id, data });
    setUploading(false);
    onClose();
  };

  const handleDrop = (e: any, type: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setValue(type, [file]);
  };

  const preventDefault = (e: any) => e.preventDefault();

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {uploading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-6">
            <Loader2 className="animate-spin text-primary w-6 h-6" />
            <span className="text-sm">Updating video details...</span>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Edit Video</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Video Title"
                {...register("title", { required: true })}
              />
              <Textarea
                placeholder="Video Description"
                {...register("description", { required: true })}
                className="max-h-[120px] overflow-auto" 
              />
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
                    {...register("thumbnail")}
                    ref={(e) => {
                      register("thumbnail").ref(e);
                      thumbnailInputRef.current = e;
                    }}
                    hidden
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
