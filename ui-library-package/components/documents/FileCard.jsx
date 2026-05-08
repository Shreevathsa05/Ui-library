import React from 'react';
import { FileTypeBadge } from './FileTypeBadge';
import { formatBytes, formatDate } from './fileUtils';

/**
 * FileCard — A single document card showing type badge, name, size, date, and actions.
 *
 * Props:
 * - file: { name: string, size: number (bytes), date: string (ISO), url?: string }
 * - onDownload: (file) => void
 * - onDelete: (file) => void
 * - onPreview: (file) => void
 * - className: string
 *
 * Example:
 * <FileCard
 *   file={{ name: 'Annual Report.pdf', size: 2048000, date: '2024-03-15' }}
 *   onDownload={(f) => window.open(f.url)}
 *   onDelete={(f) => deleteFile(f.name)}
 * />
 */
export const FileCard = ({ file = {}, onDownload, onDelete, onPreview, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        width: '260px', flexShrink: 0,
        border: '1px solid #e5e7eb', borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        backgroundColor: '#fff', overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Preview Area */}
      <div
        onClick={() => onPreview?.(file)}
        style={{
          height: '110px', backgroundColor: '#f9fafb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid #f3f4f6',
          cursor: onPreview ? 'pointer' : 'default',
        }}
      >
        <FileTypeBadge filename={file.name} size={52} />
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#111', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name || 'Untitled'}
        </p>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
          {formatBytes(file.size)}{file.date ? ` · ${formatDate(file.date)}` : ''}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb' }}>
        {onPreview && (
          <ActionBtn label="View" onClick={() => onPreview(file)} />
        )}
        {onDownload && (
          <ActionBtn label="Download" onClick={() => onDownload(file)} />
        )}
        {onDelete && (
          <ActionBtn label="Delete" onClick={() => onDelete(file)} danger />
        )}
      </div>
    </div>
  );
};

const ActionBtn = ({ label, onClick, danger = false }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1, padding: '9px 0', fontSize: '12px', fontWeight: 600,
      color: danger ? '#ef4444' : '#374151',
      background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: 'inherit', transition: 'background-color 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
  >
    {label}
  </button>
);
