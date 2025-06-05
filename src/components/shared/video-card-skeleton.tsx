"use client";

import { Card, CardContent } from "@/lib/shared/components/ui/card";
import { Skeleton } from "@/lib/shared/components/ui/skeleton";

export function VideoCardSkeleton() {
  return (
    <Card className="w-full max-w-sm rounded-xl shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4 flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-3/4 h-4 rounded" />
          <Skeleton className="w-1/2 h-4 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
