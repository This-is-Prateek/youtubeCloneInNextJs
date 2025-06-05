"use client";

import { Card, CardContent } from "@/lib/shared/components/ui/card";
import { Eye, Heart, Users } from "lucide-react";

interface Props {
  views: number;
  subscribers: number;
  likes: number;
}

export function VideoStats({ views, subscribers, likes }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard icon={<Eye className="text-blue-500" />} label="Total Views" value={views} />
      <StatCard icon={<Users className="text-green-500" />} label="Subscribers" value={subscribers} />
      <StatCard icon={<Heart className="text-red-500" />} label="Total Likes" value={likes} />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card className="bg-black text-white">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="bg-gray-500 p-2 rounded-xl">{icon}</div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
