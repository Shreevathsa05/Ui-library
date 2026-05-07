import React from 'react';
import { Skeleton } from './Skeleton';

export const TableSkeleton = ({ className = '', rows = 4, cols = 4 }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white w-full overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={`th-${i}`} className={`h-4 rounded ${i === 0 ? 'w-32' : 'w-24'}`} />
        ))}
      </div>
      {/* Table Rows */}
      <div className="flex flex-col bg-white">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={`tr-${rowIndex}`} 
            className={`flex items-center justify-between p-4 ${rowIndex !== rows - 1 ? 'border-b border-gray-100' : ''}`}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton 
                key={`td-${rowIndex}-${colIndex}`} 
                className={`h-3 rounded ${colIndex === 0 ? 'w-32' : 'w-20'}`} 
              />
            ))}
          </div>
        ))}
      </div>
      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
        <Skeleton className="h-4 w-32 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};
