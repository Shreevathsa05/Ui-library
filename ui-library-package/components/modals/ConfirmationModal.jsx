import React from 'react';

/**
 * ConfirmationModal — Two-option modal asking user to confirm an important action.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - description: string
 * - confirmLabel: string (default: 'Yes, Confirm')
 * - onConfirm: () => void
 * - cancelLabel: string (default: 'No, Go Back')
 *
 * Example:
 * <ConfirmationModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Submit Application?"
 *   description="Once submitted, you won't be able to edit your responses."
 *   confirmLabel="Yes, Submit"
 *   onConfirm={() => { submit(); setIsOpen(false); }}
 * />
 */
export const ConfirmationModal = ({
  open,
  onClose,
  title = 'Are you sure?',
  description = 'Please confirm you want to proceed with this action.',
  confirmLabel = 'Yes, Confirm',
  onConfirm,
  cancelLabel = 'No, Go Back',
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
          maxWidth: '400px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      >
        <div style={{ padding: '28px 24px' }}>
          {/* Question icon */}
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111', margin: '0 0 8px 0' }}>{title}</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{description}</p>
        </div>

        {/* Two equal-width buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #f3f4f6' }}>
          <button
            onClick={onClose}
            style={{ padding: '14px', fontSize: '13px', fontWeight: 500, color: '#374151', backgroundColor: '#f9fafb', border: 'none', borderRight: '1px solid #f3f4f6', cursor: 'pointer' }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{ padding: '14px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111', border: 'none', cursor: 'pointer' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
