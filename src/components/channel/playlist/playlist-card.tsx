"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/lib/shared/components/ui/card";

type PlaylistCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  videosCount: number;
};

export default function PlaylistCard({ id, title, thumbnail, videosCount }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${id}`}>
      <Card className="bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer overflow-hidden rounded-xl">
        <CardContent className="p-0">
          <div className="relative w-full h-[150px]">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 flex flex-col gap-1">
            <h3 className="text-base font-semibold truncate">{title}</h3>
            <span className="text-sm text-muted-foreground">
              {videosCount} videos
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
