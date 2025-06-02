import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus-visible:ring-primary-500",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-800 focus-visible:ring-secondary-500",
        accent: "bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-700 dark:hover:bg-accent-800 focus-visible:ring-accent-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus-visible:ring-gray-400",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus-visible:ring-gray-400",
      },
      size: {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-2.5",
        xl: "text-lg px-6 py-3",
      },
      fullWidth: {
        true: "w-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;