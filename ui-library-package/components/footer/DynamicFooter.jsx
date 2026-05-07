import React from 'react';

/**
 * DynamicFooter — Brand column on left, link columns on right.
 *
 * Props:
 * - brandName: string
 * - brandLogo: ReactNode
 * - description: string
 * - sections: [{ title: string, links: [{ label: string, href: string }] }]
 * - bottomLinks: [{ label: string, href: string }]
 * - socialLinks: [{ label: string, href: string, icon: ReactNode }]
 * - className: string
 *
 * Example:
 * <DynamicFooter
 *   brandName="Acme"
 *   brandLogo={<div className="w-7 h-7 bg-black rounded-md" />}
 *   description="Building great products."
 *   sections={[
 *     { title: 'Product', links: [{ label: 'Features', href: '#' }] },
 *     { title: 'Company', links: [{ label: 'About', href: '#' }] },
 *   ]}
 *   bottomLinks={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]}
 * />
 */
export const DynamicFooter = ({
  brandName,
  brandLogo,
  description,
  sections = [],
  bottomLinks = [],
  socialLinks = [],
  className = "",
}) => {
  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div style={{ padding: '40px 40px 0 40px' }}>

        {/* ── Main row ─────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>

          {/* Brand block — fixed width, does not grow */}
          <div style={{ width: '220px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              {brandLogo}
              {brandName && (
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', letterSpacing: '-0.3px' }}>
                  {brandName}
                </span>
              )}
            </div>
            {description && (
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
                {description}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                {socialLinks.map((link, idx) => (
                  <a key={idx} href={link.href} aria-label={link.label}
                    style={{ color: '#9ca3af', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#111'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns — tight, fixed 120px each */}
          <div style={{ display: 'flex', gap: '40px' }}>
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
        </div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <div style={{
          marginTop: '32px', paddingTop: '20px', paddingBottom: '20px',
          borderTop: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()} {brandName || 'Company'}. All rights reserved.
          </p>
          {bottomLinks.length > 0 && (
            <div style={{ display: 'flex', gap: '20px' }}>
              {bottomLinks.map((link, idx) => (
                <a key={idx} href={link.href}
                  style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#111'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
