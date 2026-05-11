import React from 'react';

/**
 * NewsletterFooter — Newsletter banner top, link columns below, brand bar at bottom.
 *
 * Example:
 * <NewsletterFooter
 *   brandName="Acme"
 *   brandLogo={<div className="w-7 h-7 bg-black rounded-md" />}
 *   description="Get the latest updates sent to your inbox."
 *   sections={[
 *     { title: 'Product', links: [{ label: 'Features', href: '#' }] },
 *     { title: 'Company', links: [{ label: 'About', href: '#' }] },
 *   ]}
 * />
 */
export const NewsletterFooter = ({
  brandName,
  brandLogo,
  description,
  sections = [],
  className = "",
}) => {
  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div style={{ padding: '0 40px' }}>

        {/* ── Newsletter band ─────────────────────────── */}
        <div style={{
          padding: '28px 0',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px'
        }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '4px' }}>
              Stay in the loop
            </p>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
              {description || 'The latest news, articles, and resources — sent weekly.'}
            </p>
          </div>

          {/* Input + button on one line */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                width: '200px', padding: '8px 12px', fontSize: '13px',
                border: '1px solid #d1d5db', borderRadius: '6px',
                outline: 'none', color: '#111', backgroundColor: '#fff'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px', fontSize: '13px', fontWeight: 600,
                backgroundColor: '#111', color: '#fff', border: 'none',
                borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111'}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* ── Link columns ────────────────────────────── */}
        <div style={{
          padding: '28px 0',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex', gap: '40px'
        }}>
          {sections.map((section, idx) => (
            <div key={idx} style={{ width: '120px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                {section.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}
                      style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#111'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Brand bar ───────────────────────────────── */}
        <div style={{
          padding: '20px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {brandLogo}
            {brandName && (
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{brandName}</span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()} {brandName || 'Company'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
