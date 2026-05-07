import React from 'react';

/**
 * Example Usage:
 * 
 * // Basic Skeleton
 * <Skeleton className="w-32 h-4 rounded" />
 * <Skeleton className="w-12 h-12 rounded-full" />
 */

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      {...props}
    />
  );
};
