import React from 'react';
import { cn } from '../utils';

interface DrawBallsProps {
  numbers: number[];
  stars: number[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DrawBalls: React.FC<DrawBallsProps> = ({ numbers, stars, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {numbers.map((n, i) => (
        <div key={`n-${i}`} className={cn("ball ball-number", sizeClasses[size])}>
          {n}
        </div>
      ))}
      <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />
      {stars.map((s, i) => (
        <div key={`s-${i}`} className={cn("ball ball-star", sizeClasses[size])}>
          {s}
        </div>
      ))}
    </div>
  );
};
