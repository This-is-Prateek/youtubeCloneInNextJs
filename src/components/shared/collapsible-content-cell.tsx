import { cn } from '@/lib/utils';
import { Typography } from 'antd';
import { useState } from 'react';

interface ContentCellProps {
  content: string;
  classname?: string;
}

export const ExpandableContentCell = ({ content, className }: ContentCellProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className={cn('w-full text-white space-y-1', className)}>
      <Typography.Paragraph
        className="!text-white whitespace-pre-line"
        style={{ marginBottom: 0, color: "white" }}
        ellipsis={!expanded ? { rows: 2 } : false}
      >
        {content}
      </Typography.Paragraph>

      {/* See more/less button */}
      {content.length > 100 && (
        <span
          onClick={toggleExpanded}
          className="cursor-pointer font-medium text-sm text-blue-500 hover:underline"
        >
          {expanded ? 'See less' : 'See more'}
        </span>
      )}
    </div>
  );
};
