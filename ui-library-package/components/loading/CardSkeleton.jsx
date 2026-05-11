import React from 'react';
import { Skeleton } from './Skeleton';

export const CardSkeleton = ({ className = '' }) => {
  return (
    <div style={{ width: '340px', border: '1px solid #d1d5db', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0 }} className={className}>
      {/* Image placeholder */}
      <Skeleton style={{ height: '180px', width: '100%', borderRadius: 0 }} />

      {/* Content area */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff' }}>
        {/* Avatar + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Skeleton style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <Skeleton style={{ height: '13px', width: '160px', borderRadius: '4px' }} />
            <Skeleton style={{ height: '11px', width: '100px', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Body text lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton style={{ height: '11px', width: '100%', borderRadius: '4px' }} />
          <Skeleton style={{ height: '11px', width: '100%', borderRadius: '4px' }} />
          <Skeleton style={{ height: '11px', width: '220px', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Footer area */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton style={{ height: '32px', width: '80px', borderRadius: '6px' }} />
        <Skeleton style={{ height: '32px', width: '96px', borderRadius: '6px' }} />
      </div>
    </div>
  );
};
