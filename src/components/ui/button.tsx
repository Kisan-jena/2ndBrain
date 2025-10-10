import { cn } from '@/lib/utils';
import { type ReactElement } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  text: string;
  icon?: ReactElement | string;
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 shadow-sm',
  secondary:
    'bg-white text-blue-700 border border-blue-700 hover:bg-blue-50 shadow-sm',
  danger:
    'bg-red-500 text-white hover:bg-red-600 border border-red-600 shadow-sm',
};

const sizeClasses = {
  sm: 'text-sm px-3 h-8',
  md: 'text-base px-4 h-10',
  lg: 'text-lg px-5 h-12',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  text,
  icon,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && (
        <span className="flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
      )}
      {text && <span className="flex items-center justify-center">{text}</span>}
    </button>
  );
};
