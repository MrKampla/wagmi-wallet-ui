import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'ww-flex ww-h-10 ww-w-full ww-rounded-md ww-border ww-border-input ww-bg-background ww-px-3 ww-py-2 ww-text-sm ww-ring-offset-background file:ww-border-0 file:ww-bg-transparent file:ww-text-sm file:ww-font-medium placeholder:ww-text-muted-foreground focus-visible:ww-outline-none focus-visible:ww-ring-2 focus-visible:ww-ring-ring focus-visible:ww-ring-offset-2 disabled:ww-cursor-not-allowed disabled:ww-opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
