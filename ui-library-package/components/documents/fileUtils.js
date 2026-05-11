// Shared document utility functions — no JSX in this file

// Derive a short extension label and grayscale shade from a filename
export const getFileType = (filename = '') => {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    pdf:  { label: 'PDF',  bg: '#1a1a1a', color: '#fff' },
    doc:  { label: 'DOC',  bg: '#374151', color: '#fff' },
    docx: { label: 'DOC',  bg: '#374151', color: '#fff' },
    xls:  { label: 'XLS',  bg: '#374151', color: '#fff' },
    xlsx: { label: 'XLS',  bg: '#374151', color: '#fff' },
    ppt:  { label: 'PPT',  bg: '#4b5563', color: '#fff' },
    pptx: { label: 'PPT',  bg: '#4b5563', color: '#fff' },
    txt:  { label: 'TXT',  bg: '#6b7280', color: '#fff' },
    csv:  { label: 'CSV',  bg: '#6b7280', color: '#fff' },
    png:  { label: 'IMG',  bg: '#9ca3af', color: '#fff' },
    jpg:  { label: 'IMG',  bg: '#9ca3af', color: '#fff' },
    jpeg: { label: 'IMG',  bg: '#9ca3af', color: '#fff' },
    svg:  { label: 'SVG',  bg: '#9ca3af', color: '#fff' },
    zip:  { label: 'ZIP',  bg: '#d1d5db', color: '#374151' },
    mp4:  { label: 'VID',  bg: '#d1d5db', color: '#374151' },
  };
  return map[ext] || { label: (ext.toUpperCase().slice(0, 3) || 'FILE'), bg: '#e5e7eb', color: '#374151' };
};

export const formatBytes = (bytes = 0) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
