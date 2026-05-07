import React from 'react';
import { Skeleton } from './Skeleton';

export const ListSkeleton = ({ className = '', items = 3 }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white w-[340px] overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
      {/* List Items */}
      <div className="flex flex-col bg-white">
        {Array.from({ length: items }).map((_, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 p-4 ${i !== items - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-3.5 w-5/6 rounded" />
              <Skeleton className="h-3 w-3/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
