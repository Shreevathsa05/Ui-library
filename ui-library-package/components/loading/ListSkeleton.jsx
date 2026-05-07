import React from 'react';
import { Skeleton } from './Skeleton';

export const ListSkeleton = ({ className = '', items = 3 }) => {
  return (
    <div style={{ width: '340px', border: '1px solid #d1d5db', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0 }} className={className}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <Skeleton style={{ height: '14px', width: '100px', borderRadius: '4px' }} />
      </div>

      {/* List Items */}
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px',
            borderBottom: i !== items - 1 ? '1px solid #f3f4f6' : 'none',
            backgroundColor: '#fff',
          }}
        >
          <Skeleton style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton style={{ height: '13px', width: '180px', borderRadius: '4px' }} />
            <Skeleton style={{ height: '11px', width: '120px', borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};
