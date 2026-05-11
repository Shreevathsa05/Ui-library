import React from 'react';

/**
 * BadgeSuccessModal — Compact modal with a floating badge-style success icon and a single action.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - badge: string  (short label shown on badge, e.g. "Done", "Saved")
 * - title: string
 * - description: string
 * - primaryLabel: string
 * - onPrimary: () => void
 *
 * Example:
 * <BadgeSuccessModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   badge="Saved"
 *   title="Changes Saved"
 *   description="Your profile has been updated successfully."
 *   primaryLabel="Got it"
 *   onPrimary={() => setIsOpen(false)}
 * />
 */
export const BadgeSuccessModal = ({
  open,
  onClose,
  badge = 'Success',
  title = 'All Done!',
  description = 'Your action was completed successfully.',
  primaryLabel = 'Got it',
  onPrimary,
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
          maxWidth: '360px',
          textAlign: 'center',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          padding: '32px 28px 28px',
        }}
      >
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '20px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#15803d' }}>{badge}</span>
        </div>

        <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111', margin: '0 0 8px 0' }}>{title}</h2>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 24px 0' }}>{description}</p>

        <button
          onClick={onPrimary || onClose}
          style={{ display: 'block', width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
};
