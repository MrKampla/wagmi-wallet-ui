import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'ww-inline-flex ww-items-center ww-justify-center ww-whitespace-nowrap ww-rounded-md ww-text-sm ww-font-medium ww-ring-offset-background ww-transition-colors focus-visible:ww-outline-none focus-visible:ww-ring-2 focus-visible:ww-ring-ring focus-visible:ww-ring-offset-2 disabled:ww-pointer-events-none disabled:ww-opacity-50',
  {
    variants: {
      variant: {
        default:
          'ww-bg-primary ww-text-primary-foreground hover:ww-bg-primary/90',
        destructive:
          'ww-bg-destructive ww-text-destructive-foreground hover:ww-bg-destructive/90',
        outline:
          'ww-border ww-border-input ww-bg-background hover:ww-bg-accent hover:ww-text-accent-foreground',
        secondary:
          'ww-bg-secondary ww-text-secondary-foreground hover:ww-bg-secondary/80',
        ghost: 'hover:ww-bg-accent hover:ww-text-accent-foreground',
        link: 'ww-text-primary ww-underline-offset-4 hover:ww-underline',
      },
      size: {
        default: 'ww-h-10 ww-px-4 ww-py-2',
        sm: 'ww-h-9 ww-rounded-md ww-px-3',
        lg: 'ww-h-11 ww-rounded-md ww-px-8',
        icon: 'ww-h-10 ww-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
