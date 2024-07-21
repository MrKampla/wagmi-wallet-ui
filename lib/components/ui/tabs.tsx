'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'ww-inline-flex ww-h-10 ww-items-center ww-justify-center ww-rounded-md ww-bg-muted ww-p-1 ww-text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'ww-inline-flex ww-items-center ww-justify-center ww-whitespace-nowrap ww-rounded-sm ww-px-3 ww-py-1.5 ww-text-sm ww-font-medium ww-ring-offset-background ww-transition-all focus-visible:ww-outline-none focus-visible:ww-ring-2 focus-visible:ww-ring-ring focus-visible:ww-ring-offset-2 disabled:ww-pointer-events-none disabled:ww-opacity-50 data-[state=active]:ww-bg-background data-[state=active]:ww-text-foreground data-[state=active]:ww-shadow-sm',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ww-mt-2 ww-ring-offset-background focus-visible:ww-outline-none focus-visible:ww-ring-2 focus-visible:ww-ring-ring focus-visible:ww-ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
