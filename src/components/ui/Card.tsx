import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 transition-all duration-300",
        hover && "hover:shadow-soft-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <h3 
      className={cn("text-lg font-semibold text-gray-900 dark:text-white", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <p 
      className={cn("text-sm text-gray-600 dark:text-gray-300", className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn("mt-4 pt-4 border-t border-gray-200 dark:border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };