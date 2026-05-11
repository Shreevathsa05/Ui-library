import React from 'react';

/**
 * CenteredModal — General purpose centered modal with title, body, and action buttons.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - children: ReactNode
 * - primaryLabel: string (default: 'Confirm')
 * - onPrimary: () => void
 * - secondaryLabel: string (default: 'Cancel')
 *
 * Example:
 * <CenteredModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Update Settings"
 *   primaryLabel="Save Changes"
 *   onPrimary={() => { save(); setIsOpen(false); }}
 * >
 *   <p>Are you sure you want to save these changes?</p>
 * </CenteredModal>
 */
export const CenteredModal = ({
  open,
  onClose,
  title,
  children,
  primaryLabel = 'Confirm',
  onPrimary,
  secondaryLabel = 'Cancel',
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
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '440px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '2px', lineHeight: 1, fontSize: '18px' }}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 500, color: '#374151', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '7px', cursor: 'pointer' }}>
            {secondaryLabel}
          </button>
          <button onClick={onPrimary} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
