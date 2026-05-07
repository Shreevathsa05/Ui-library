import React from 'react';

/**
 * DeleteModal — Destructive action modal with bold warning and danger button.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - description: string
 * - deleteLabel: string (default: 'Delete')
 * - onDelete: () => void
 * - itemName: string  (renders "Delete [itemName]?" in body)
 *
 * Example:
 * <DeleteModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Delete Project"
 *   description="This action cannot be undone. The project and all its data will be permanently removed."
 *   onDelete={() => { deleteItem(); setIsOpen(false); }}
 * />
 */
export const DeleteModal = ({
  open,
  onClose,
  title = 'Delete Item',
  description = 'This action cannot be undone. All associated data will be permanently deleted.',
  deleteLabel = 'Delete',
  onDelete,
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
        <div style={{ padding: '28px 24px 24px' }}>
          {/* Warning icon */}
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>

          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111', margin: '0 0 8px 0' }}>{title}</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0' }}>{description}</p>
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 500, color: '#374151', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '7px', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={onDelete} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#ef4444', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>
            {deleteLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
