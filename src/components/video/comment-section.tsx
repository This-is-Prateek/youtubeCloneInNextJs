"use client";

import { useState } from "react";
import { Input } from "@/lib/shared/components/ui/input";
import { Button } from "@/lib/shared/components/ui/button";
import Image from "next/image";

interface Comment {
  _id: string;
  owner: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  content: string;
}

export function CommentsSection({
  comments = [],
  handleCommentSubmit,
}: {
  comments: Comment[];
  handleCommentSubmit: (newComment: string) => void;
}) {
  const [commentInput, setCommentInput] = useState("");

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    handleCommentSubmit(commentInput);
    setCommentInput("");
  };

  return (
    <div className="space-y-4">
      {/* Input box */}
      <div className="space-y-2 text-white">
        <h2 className="text-lg font-semibold">Add a comment</h2>
        <Input
          placeholder="Write your comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button onClick={handlePostComment} className="mt-2">
          Post
        </Button>
      </div>

      {/* Comment list */}
      <div className="space-y-3 pt-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 pb-3">
              <div className="flex-shrink-0">
                <Image
                  src={comment.owner.avatar || "/images/profile.svg"}
                  alt={comment.owner.fullName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-white">{comment.owner.fullName}</div>
                <div className="text-sm text-muted-foreground">{comment.content}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground text-sm">No comments yet.</div>
        )}
      </div>
    </div>
  );
}
