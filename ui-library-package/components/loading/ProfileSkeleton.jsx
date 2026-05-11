import React from 'react';
import { Skeleton } from './Skeleton';

export const ProfileSkeleton = ({ className = '' }) => {
  return (
    <div style={{ width: '340px', border: '1px solid #d1d5db', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0, padding: '28px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={className}>
      {/* Avatar */}
      <Skeleton style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px' }} />

      {/* Name */}
      <Skeleton style={{ height: '16px', width: '140px', borderRadius: '4px', marginBottom: '8px' }} />
      {/* Role/subtitle */}
      <Skeleton style={{ height: '12px', width: '100px', borderRadius: '4px', marginBottom: '24px' }} />

      {/* Stats row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '24px', width: '100%', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100px' }}>
          <Skeleton style={{ height: '18px', width: '48px', borderRadius: '4px' }} />
          <Skeleton style={{ height: '11px', width: '64px', borderRadius: '4px' }} />
        </div>
        <div style={{ width: '1px', height: '36px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100px' }}>
          <Skeleton style={{ height: '18px', width: '48px', borderRadius: '4px' }} />
          <Skeleton style={{ height: '11px', width: '64px', borderRadius: '4px' }} />
        </div>
      </div>

      {/* CTA Button */}
      <Skeleton style={{ height: '38px', width: '100%', borderRadius: '8px' }} />
    </div>
  );
};
