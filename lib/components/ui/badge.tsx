import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'ww-inline-flex ww-items-center ww-rounded-full ww-border ww-px-2.5 ww-py-0.5 ww-text-xs ww-font-semibold ww-transition-colors focus:ww-outline-none focus:ww-ring-2 focus:ww-ring-ring focus:ww-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'ww-border-transparent ww-bg-primary ww-text-primary-foreground hover:ww-bg-primary/80',
        secondary:
          'ww-border-transparent ww-bg-secondary ww-text-secondary-foreground hover:ww-bg-secondary/80',
        destructive:
          'ww-border-transparent ww-bg-destructive ww-text-destructive-foreground hover:ww-bg-destructive/80',
        outline: 'ww-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
