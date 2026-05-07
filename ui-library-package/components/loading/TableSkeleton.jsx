import React from 'react';
import { Skeleton } from './Skeleton';

export const TableSkeleton = ({ className = '', rows = 4, cols = 4 }) => {
  // Fixed column widths: first col wider, rest equal
  const colWidths = Array.from({ length: cols }, (_, i) => (i === 0 ? 140 : 100));

  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', backgroundColor: '#fff', overflow: 'hidden' }} className={className}>
      {/* Table Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        {colWidths.map((w, i) => (
          <Skeleton key={`th-${i}`} style={{ height: '13px', width: `${w}px`, borderRadius: '4px', flexShrink: 0 }} />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`tr-${rowIndex}`}
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '12px 20px',
            borderBottom: rowIndex !== rows - 1 ? '1px solid #f3f4f6' : 'none',
            backgroundColor: '#fff',
          }}
        >
          {colWidths.map((w, colIndex) => (
            <Skeleton key={`td-${rowIndex}-${colIndex}`} style={{ height: '11px', width: `${w}px`, borderRadius: '4px', flexShrink: 0 }} />
          ))}
        </div>
      ))}

      {/* Pagination Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <Skeleton style={{ height: '12px', width: '120px', borderRadius: '4px' }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <Skeleton style={{ height: '30px', width: '30px', borderRadius: '6px' }} />
          <Skeleton style={{ height: '30px', width: '30px', borderRadius: '6px' }} />
          <Skeleton style={{ height: '30px', width: '30px', borderRadius: '6px' }} />
        </div>
      </div>
    </div>
  );
};
