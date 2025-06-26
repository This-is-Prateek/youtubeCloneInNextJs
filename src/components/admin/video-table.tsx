"use client";

import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/lib/shared/components/ui/button";
import { Switch } from "@/lib/shared/components/ui/switch"; // make sure you import Switch
import { useState } from "react";
import { EditVideoPopup } from "@/components/admin/edit-video-popup";
import { DeleteVideoPopup } from "@/components/admin/delete-video-popup";
import { Badge } from "@/lib/shared/components/ui/badge";
import { ModalContentCell } from "../shared/text-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/shared/components/ui/table";

interface Video {
  _id: string;
  title: string;
  description: string;
  isPublished: boolean;
}

interface VideoTableProps {
  videos: Video[];
  onPublish: (videoId: string) => void;
  onDelete: (videoId: string) => void;
  onEdit: (videoId: string, data: { title: string; description: string; thumbnail?: FileList }) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function VideoTable({
  videos,
  onPublish,
  onDelete,
  onEdit,
  page,
  setPage,
  totalPages,
}: VideoTableProps) {
  const [editVideo, setEditVideo] = useState<string | null>(null);
  const [deleteVideo, setDeleteVideo] = useState<string | null>(null);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-500 text-white">
      <div className="w-full max-h-[500px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Toggle Status</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video._id}>
                <TableCell className="text-center">
                  {/* Publish Toggle */}
                  <Switch
                    checked={video.isPublished}
                    onCheckedChange={() => onPublish(video._id)}
                    className="cursor-pointer"
                  />
                </TableCell>
                <TableCell className="text-center">
                  {/* Status Tag */}
                  {video.isPublished ? (
                    <Badge
                      variant="outline"
                      className="text-green-400 bg-green-900"
                    >
                      Published
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-yellow-400 bg-yellow-900"
                    >
                      Draft
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <ModalContentCell content={video.title} />
                </TableCell>
                <TableCell>
                  <ModalContentCell content={video.description} />
                </TableCell>

                <TableCell className="flex items-center gap-2">
                  {/* Edit Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditVideo(video._id)}
                    className="cursor-pointer"
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteVideo(video._id)}
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {/* Edit Popup */}
                  {editVideo === video._id && (
                    <EditVideoPopup
                      open={true}
                      onClose={() => setEditVideo(null)}
                      video={video}
                      onSave={onEdit}
                    />
                  )}

                  {/* Delete Popup */}
                  {deleteVideo === video._id && (
                    <DeleteVideoPopup
                      open={true}
                      onClose={() => setDeleteVideo(null)}
                      video={video}
                      onSubmit={onDelete}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4 border-t-1 p-1">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
