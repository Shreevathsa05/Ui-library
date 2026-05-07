import React from 'react';
import { Skeleton } from './Skeleton';

export const ProfileSkeleton = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center p-6 border border-gray-300 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white w-[340px] text-center ${className}`}>
      <Skeleton className="w-24 h-24 rounded-full mb-4 shadow-sm" />
      <Skeleton className="h-6 w-1/2 rounded mb-2" />
      <Skeleton className="h-4 w-1/3 rounded mb-6" />
      
      <div className="flex gap-4 w-full justify-center mb-6">
        <div className="flex flex-col items-center gap-1 w-20">
          <Skeleton className="h-5 w-10 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="flex flex-col items-center gap-1 w-20">
          <Skeleton className="h-5 w-10 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
      
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};
