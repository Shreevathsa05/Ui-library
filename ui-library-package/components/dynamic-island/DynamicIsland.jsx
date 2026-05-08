import React, { useState, useEffect, useCallback } from 'react';

/**
 * DynamicIsland — Apple-style animated pill alert that expands from a compact capsule.
 *
 * Props:
 * - alert: { type: 'success'|'error'|'warning'|'info'|'loading', message: string } | null
 * - onDismiss: () => void
 * - duration: number (ms, default 3000, 0 = no auto-dismiss)
 *
 * Example usage with the useDynamicIsland hook:
 *
 * const { alert, show } = useDynamicIsland();
 *
 * <DynamicIsland alert={alert} />
 *
 * <button onClick={() => show('success', 'Changes saved successfully!')}>Save</button>
 * <button onClick={() => show('error', 'Something went wrong.')}>Error</button>
 * <button onClick={() => show('warning', 'Low storage space.')}>Warn</button>
 * <button onClick={() => show('info', 'New update available.')}>Info</button>
 * <button onClick={() => show('loading', 'Uploading files...')}>Load</button>
 */

const VARIANTS = {
  success: {
    dot: '#22c55e',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    dot: '#ef4444',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  warning: {
    dot: '#f59e0b',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    dot: '#3b82f6',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  loading: {
    dot: '#a855f7',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'di-spin 0.8s linear infinite' }}
      >
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
        <path d="M21 12a9 9 0 00-9-9" />
      </svg>
    ),
  },
};

export const DynamicIsland = ({ alert, onDismiss, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);
      if (duration > 0) {
        const t = setTimeout(() => {
          setVisible(false);
          setTimeout(() => onDismiss?.(), 400);
        }, duration);
        return () => clearTimeout(t);
      }
    } else {
      setVisible(false);
    }
  }, [alert, duration]);

  const variant = alert ? (VARIANTS[alert.type] || VARIANTS.info) : null;
  const expanded = visible && !!alert;

  return (
    <>
      {/* Keyframe for spin */}
      <style>{`
        @keyframes di-spin { to { transform: rotate(360deg); } }
        @keyframes di-fade-content { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div
        onClick={() => { setVisible(false); setTimeout(() => onDismiss?.(), 400); }}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          cursor: expanded ? 'pointer' : 'default',
          // Expand/contract the pill
          width: expanded ? '320px' : '100px',
          height: expanded ? '52px' : '28px',
          borderRadius: '999px',
          backgroundColor: '#0a0a0a',
          boxShadow: expanded
            ? '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'all 0.42s cubic-bezier(0.34, 1.2, 0.64, 1)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Idle state — just a small camera/pill dot */}
        {!expanded && (
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#222' }} />
        )}

        {/* Expanded content */}
        {expanded && variant && (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '0 16px',
              width: '100%',
              animation: 'di-fade-content 0.25s ease 0.15s both',
            }}
          >
            {/* Colored dot + icon */}
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: variant.dot + '22',
              border: `1.5px solid ${variant.dot}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {variant.icon}
            </div>

            {/* Message */}
            <span style={{
              fontSize: '13px', fontWeight: 500, color: '#f5f5f5',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              flex: 1,
            }}>
              {alert.message}
            </span>

            {/* Dismiss dot */}
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: variant.dot, flexShrink: 0 }} />
          </div>
        )}
      </div>
    </>
  );
};

/**
 * useDynamicIsland — convenience hook to trigger DynamicIsland alerts.
 *
 * Returns: { alert, show, dismiss }
 *
 * Example:
 * const { alert, show } = useDynamicIsland();
 * show('success', 'Saved!');
 */
export const useDynamicIsland = () => {
  const [alert, setAlert] = useState(null);

  const show = useCallback((type, message) => {
    setAlert({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    setAlert(null);
  }, []);

  return { alert, show, dismiss };
};
