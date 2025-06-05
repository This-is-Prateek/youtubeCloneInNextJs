'use client';

import * as React from 'react';
import { Input } from '@/lib/shared/components/ui/input';
import { Label } from '@/lib/shared/components/ui/label';
import { cn } from '@/lib/utils'; // Tailwind class merging utility

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string; // Optional wrapper styles
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          ref={ref}
          className={cn(
            "",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
