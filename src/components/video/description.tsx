"use client";
import { ExpandableContentCell } from "@/components/shared/collapsible-content-cell"; // adjust path accordingly
import { timeAgo } from "@/helpers/time-ago";
import { formatNumber } from "@/helpers/format-to-standard-form";

export function VideoDescription({
  description,
  views,
  createdAt,
}: {
  description: string;
  views: number;
  createdAt: string;
}) {
  return (
    <div className="bg-gray-500 rounded-lg p-3">
      <div className="flex items-center gap-1 font-bold">
        <span className="text-sm text-gray-300">
          {formatNumber(views)} views
        </span>
        <span className="text-sm text-gray-300">{timeAgo(createdAt)}</span>
      </div>
      <ExpandableContentCell content={description} />
    </div>
  );
}
