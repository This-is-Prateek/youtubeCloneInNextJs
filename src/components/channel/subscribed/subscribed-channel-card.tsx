"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/lib/shared/components/ui/card";
import Button from "@/components/shared/button";

type Props = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  subscribers: number;
};

export default function SubscribedChannelCard({
  id,
  name,
  username,
  avatar,
  subscribers,
}: Props) {
  return (
    <Card className="bg-muted/10 hover:bg-muted/20 transition-colors rounded-xl overflow-hidden">
      <CardContent className="p-4 flex items-center justify-between">
        <Link href={`/channel/${id}`} className="flex items-center gap-4">
          <Image
            src={avatar || "/images/profile.svg"}
            alt={name}
            width={56}
            height={56}
            className="rounded-full border"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-white">{name}</h3>
            <span className="text-muted-foreground text-sm">{username}</span>
            <span className="text-muted-foreground text-xs">
              {Intl.NumberFormat().format(subscribers)} subscribers
            </span>
          </div>
        </Link>
        <Button className="rounded-full text-sm px-4">
          Subscribed
        </Button>
      </CardContent>
    </Card>
  );
}
