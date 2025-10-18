import { cn } from '@/lib/utils';
import { type ReactElement } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'shiny';
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
  shiny:
    'inline-flex justify-center border border-blue-300 whitespace-nowrap  text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]',
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
        'inline-flex items-center justify-center rounded-md font-medium transition-all gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {
        <span className="flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
      }
      {<span className="flex items-center justify-center">{text}</span>}
    </button>
  );
};
