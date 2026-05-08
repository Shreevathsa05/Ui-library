import React from 'react';
import { FileTypeBadge } from './FileTypeBadge';
import { formatBytes, formatDate } from './fileUtils';

/**
 * FileList — Table-style list of documents with actions per row.
 *
 * Props:
 * - files: [{ name: string, size: number, date: string }]
 * - onDownload: (file) => void
 * - onDelete: (file) => void
 * - onPreview: (file) => void
 * - className: string
 *
 * Example:
 * <FileList
 *   files={[
 *     { name: 'Report Q1.pdf', size: 1048576, date: '2024-01-10' },
 *     { name: 'Budget.xlsx', size: 524288, date: '2024-02-05' },
 *   ]}
 *   onDownload={(f) => console.log('download', f.name)}
 *   onDelete={(f) => console.log('delete', f.name)}
 * />
 */
export const FileList = ({ files = [], onDownload, onDelete, onPreview, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        border: '1px solid #e5e7eb', borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        backgroundColor: '#fff', overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 80px 100px 120px',
        gap: '8px', padding: '10px 16px',
        borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb',
      }}>
        {['Name', 'Size', 'Modified', 'Actions'].map((h) => (
          <span key={h} style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {files.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
          No files to display.
        </div>
      ) : files.map((file, idx) => (
        <div
          key={idx}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 80px 100px 120px',
            gap: '8px', padding: '10px 16px', alignItems: 'center',
            borderBottom: idx !== files.length - 1 ? '1px solid #f3f4f6' : 'none',
            backgroundColor: '#fff', transition: 'background-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafafa'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
        >
          {/* Name + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <FileTypeBadge filename={file.name} size={32} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </span>
          </div>

          {/* Size */}
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{formatBytes(file.size)}</span>

          {/* Date */}
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(file.date)}</span>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {onPreview && (
              <IconBtn title="View" onClick={() => onPreview(file)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </IconBtn>
            )}
            {onDownload && (
              <IconBtn title="Download" onClick={() => onDownload(file)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </IconBtn>
            )}
            {onDelete && (
              <IconBtn title="Delete" onClick={() => onDelete(file)} danger>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                </svg>
              </IconBtn>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const IconBtn = ({ children, onClick, title, danger = false }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: '28px', height: '28px', borderRadius: '6px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'none', border: '1px solid #e5e7eb', cursor: 'pointer',
      color: danger ? '#ef4444' : '#6b7280',
      transition: 'all 0.15s',
    }}
    onMouseEnter={e => { e.currentTarget.style.backgroundColor = danger ? '#fee2e2' : '#f3f4f6'; e.currentTarget.style.borderColor = danger ? '#fca5a5' : '#d1d5db'; }}
    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
  >
    {children}
  </button>
);
