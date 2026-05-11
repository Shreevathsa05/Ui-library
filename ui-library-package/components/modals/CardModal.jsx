import React from 'react';

/**
 * CardModal — Modal with a distinct visual header block (image/icon area) + content body.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - headerContent: ReactNode  (icon, image, or graphic in the header area)
 * - title: string
 * - description: string
 * - primaryLabel: string
 * - onPrimary: () => void
 * - secondaryLabel: string
 *
 * Example:
 * <CardModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   headerContent={<img src="..." className="w-full h-full object-cover" />}
 *   title="Welcome to Pro"
 *   description="You've unlocked all premium features."
 *   primaryLabel="Get Started"
 *   onPrimary={() => setIsOpen(false)}
 * />
 */
export const CardModal = ({
  open,
  onClose,
  headerContent,
  title,
  description,
  primaryLabel = 'Continue',
  onPrimary,
  secondaryLabel = 'Maybe Later',
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
          maxWidth: '400px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Graphic Header */}
        <div style={{ height: '160px', backgroundColor: '#f3f4f6', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {headerContent || (
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
          )}
          {/* Close button */}
          <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.8)', border: '1px solid #e5e7eb', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#6b7280' }}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 24px 20px' }}>
          {title && <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px', margin: '0 0 8px 0' }}>{title}</h2>}
          {description && <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 20px 0' }}>{description}</p>}

          <button onClick={onPrimary} style={{ display: 'block', width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}>
            {primaryLabel}
          </button>
          <button onClick={onClose} style={{ display: 'block', width: '100%', padding: '10px', fontSize: '13px', fontWeight: 500, color: '#6b7280', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
