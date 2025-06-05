"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/lib/shared/components/ui/dialog";
import { useState } from "react";

interface ModalContentCellProps {
  content: string;
}

export const ModalContentCell = ({ content }: ModalContentCellProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const truncatedContent =
    content.length > 150 ? `${content.slice(0, 150)}...` : content;

  return (
    <>
      <p className="max-w-3xl mb-0 whitespace-pre-wrap break-words">
        {truncatedContent}{" "}
        {content.length > 150 && (
          <ShowMoreLessToggle onClick={() => setIsModalVisible(true)} text="see more" />
        )}
      </p>

      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent className="max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle>Full Content</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[40rem] overflow-auto whitespace-pre-wrap break-words text-base">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface ShowMoreLessToggleProps {
  onClick: () => void;
  text: string;
}

const ShowMoreLessToggle = ({ onClick, text }: ShowMoreLessToggleProps) => (
  <span
    onClick={onClick}
    className="cursor-pointer font-medium text-blue-400 hover:text-blue-500"
  >
    {text}
  </span>
);
