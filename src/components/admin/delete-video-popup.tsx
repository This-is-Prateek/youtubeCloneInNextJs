"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/lib/shared/components/ui/dialog";
import { Button } from "@/lib/shared/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Spin } from "antd";

export function DeleteVideoPopup({ open, onClose, onSubmit, video }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (videoId) => {
    setLoading(true);
    try {
      await onSubmit(videoId);
      onClose();
      toast.success("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Video</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <p>
              Are you sure you want to delete video titled <strong>&apos;{video?.title}&apos;</strong>?
            </p>
            <DialogFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(video._id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
