import React from 'react';
import { getFileType } from './fileUtils';

/**
 * FileTypeBadge — Displays a colored badge showing the file type abbreviation.
 *
 * Props:
 * - filename: string
 * - size: number (px, default 40)
 */
export const FileTypeBadge = ({ filename, size = 40 }) => {
  const type = getFileType(filename);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '8px',
      backgroundColor: type.bg,
      color: type.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.04em',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {type.label}
    </div>
  );
};
