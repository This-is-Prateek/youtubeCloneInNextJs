"use client";

import { formatDistanceToNow } from "date-fns";

type PostCardProps = {
  content: string;
  createdAt: Date;
};

export default function PostCard({ content, createdAt }: PostCardProps) {
  return (
    <div className="p-4 rounded-xl bg-muted/10">
      <p className="text-sm text-white whitespace-pre-wrap">{content}</p>
      <span className="text-xs text-muted-foreground block mt-2">
        {formatDistanceToNow(createdAt)} ago
      </span>
    </div>
  );
}
