import React from 'react';
import { Skeleton } from './Skeleton';

export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white w-[340px] overflow-hidden ${className}`}>
      {/* Image Placeholder */}
      <Skeleton className="h-48 w-full" />
      {/* Content Area */}
      <div className="flex flex-col gap-4 p-5 bg-white">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-4/5 rounded" />
        </div>
      </div>
      {/* Footer Area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};
