'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'ww-flex ww-h-10 ww-w-full ww-items-center ww-justify-between ww-rounded-md ww-border ww-border-input ww-bg-background ww-px-3 ww-py-2 ww-text-sm ww-ring-offset-background placeholder:ww-text-muted-foreground focus:ww-outline-none focus:ww-ring-2 focus:ww-ring-ring focus:ww-ring-offset-2 disabled:ww-cursor-not-allowed disabled:ww-opacity-50 [&>span]:ww-line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ww-h-4 ww-w-4 ww-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'ww-flex ww-cursor-default ww-items-center ww-justify-center ww-py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="ww-h-4 ww-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'ww-flex ww-cursor-default ww-items-center ww-justify-center ww-py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="ww-h-4 ww-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'ww-relative ww-z-50 ww-max-h-96 ww-min-w-[8rem] ww-overflow-hidden ww-rounded-md ww-border ww-bg-popover ww-text-popover-foreground ww-shadow-md data-[state=open]:ww-animate-in data-[state=closed]:ww-animate-out data-[state=closed]:ww-fade-out-0 data-[state=open]:ww-fade-in-0 data-[state=closed]:ww-zoom-out-95 data-[state=open]:ww-zoom-in-95 data-[side=bottom]:ww-slide-in-from-top-2 data-[side=left]:ww-slide-in-from-right-2 data-[side=right]:ww-slide-in-from-left-2 data-[side=top]:ww-slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:ww-translate-y-1 data-[side=left]:ww--translate-x-1 data-[side=right]:ww-translate-x-1 data-[side=top]:ww--translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'ww-p-1',
          position === 'popper' &&
            'ww-h-[var(--radix-select-trigger-height)] ww-w-full ww-min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'ww-py-1.5 ww-pl-8 ww-pr-2 ww-text-sm ww-font-semibold',
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'ww-relative ww-flex ww-w-full ww-cursor-default ww-select-none ww-items-center ww-rounded-sm ww-py-1.5 ww-pl-8 ww-pr-2 ww-text-sm ww-outline-none focus:ww-bg-accent focus:ww-text-accent-foreground data-[disabled]:ww-pointer-events-none data-[disabled]:ww-opacity-50',
      className,
    )}
    {...props}
  >
    <span className="ww-absolute ww-left-2 ww-flex ww-h-3.5 ww-w-3.5 ww-items-center ww-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ww-h-4 ww-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('ww--mx-1 ww-my-1 ww-h-px ww-bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
