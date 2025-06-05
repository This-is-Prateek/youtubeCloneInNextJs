import React from 'react';
import { Button } from '@/lib/shared/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface ButtonFieldProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary' ;
}

const ButtonField: React.FC<ButtonFieldProps> = ({
  type = 'button',
  children,
  className,
  onClick,
  disabled = false,
  loading = false,
  variant = 'default',
    ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      className={cn('p-3 text-base font-normal cursor-pointer bg-blue-900 hover:bg-blue-950 flex gap-1', className)}
        {...props}
    >
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonField;
