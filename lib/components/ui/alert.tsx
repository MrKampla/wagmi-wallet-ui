import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'ww-relative ww-w-full ww-rounded-lg ww-border ww-p-4 [&>svg~*]:ww-pl-7 [&>svg+div]:ww-translate-y-[-3px] [&>svg]:ww-absolute [&>svg]:ww-left-4 [&>svg]:ww-top-4 [&>svg]:ww-text-foreground',
  {
    variants: {
      variant: {
        default: 'ww-bg-background ww-text-foreground',
        destructive:
          'ww-border-destructive/50 ww-text-destructive dark:ww-border-destructive [&>svg]:ww-text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('ww-mb-1 ww-font-medium ww-leading-none ww-tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('ww-text-sm [&_p]:ww-leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
