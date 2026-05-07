import React, { useState, useRef } from 'react';
import { formatBytes } from './fileUtils';

/**
 * FileUpload — Drag-and-drop file upload zone with selected file list.
 *
 * Props:
 * - onFilesSelected: (files: File[]) => void
 * - accept: string  (e.g. '.pdf,.docx')
 * - multiple: boolean (default: true)
 * - maxSizeMB: number (default: 10)
 * - className: string
 *
 * Example:
 * <FileUpload
 *   accept=".pdf,.docx,.xlsx"
 *   onFilesSelected={(files) => console.log(files)}
 *   maxSizeMB={5}
 * />
 */
export const FileUpload = ({ onFilesSelected, accept, multiple = true, maxSizeMB = 10, className = '' }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const inputRef = useRef(null);

  const processFiles = (fileList) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    const valid = [];
    const errs = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxBytes) {
        errs.push(`${file.name} exceeds ${maxSizeMB}MB limit.`);
      } else {
        valid.push(file);
      }
    });

    setSelectedFiles(prev => multiple ? [...prev, ...valid] : valid);
    setErrors(errs);
    if (valid.length > 0) onFilesSelected?.(valid);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removeFile = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? '#111' : '#d1d5db'}`,
          borderRadius: '12px',
          backgroundColor: dragging ? '#f3f4f6' : '#fafafa',
          padding: '36px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background-color 0.2s',
          textAlign: 'center',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={e => processFiles(e.target.files)}
        />

        {/* Upload icon */}
        <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>

        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', margin: '0 0 4px' }}>
            {dragging ? 'Release to upload' : 'Drag & drop files here'}
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
            or <span style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>browse files</span>
            {accept && ` · ${accept}`}
            {` · Max ${maxSizeMB}MB`}
          </p>
        </div>
      </div>

      {/* Error messages */}
      {errors.map((err, i) => (
        <p key={i} style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>{err}</p>
      ))}

      {/* Selected file list */}
      {selectedFiles.length > 0 && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px',
                borderBottom: idx !== selectedFiles.length - 1 ? '1px solid #f3f4f6' : 'none',
                backgroundColor: '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                {/* File icon */}
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>
                  </svg>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#111', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{formatBytes(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(idx)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px', flexShrink: 0, lineHeight: 1 }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
