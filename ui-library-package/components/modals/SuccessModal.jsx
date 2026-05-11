import React from 'react';

/**
 * SuccessModal — Large-icon success modal with a prominent checkmark circle.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - description: string
 * - primaryLabel: string
 * - onPrimary: () => void
 * - secondaryLabel: string
 *
 * Example:
 * <SuccessModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Payment Successful!"
 *   description="Your transaction has been completed. A receipt has been sent to your email."
 *   primaryLabel="View Receipt"
 *   onPrimary={() => navigate('/receipt')}
 * />
 */
export const SuccessModal = ({
  open,
  onClose,
  title = 'Success!',
  description = 'Your action was completed successfully.',
  primaryLabel = 'Continue',
  onPrimary,
  secondaryLabel = 'Close',
}) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Top stripe */}
        <div style={{ height: '5px', backgroundColor: '#16a34a' }} />

        <div style={{ padding: '32px 28px 28px' }}>
          {/* Circle icon */}
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', margin: '0 0 8px 0' }}>{title}</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 24px 0' }}>{description}</p>

          <button onClick={onPrimary || onClose} style={{ display: 'block', width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}>
            {primaryLabel}
          </button>
          <button onClick={onClose} style={{ display: 'block', width: '100%', padding: '10px', fontSize: '13px', fontWeight: 500, color: '#9ca3af', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
