import React from 'react';

/**
 * SimpleFooter — One-row footer: logo left, links center, copyright right.
 *
 * Example:
 * <SimpleFooter
 *   brandName="Acme"
 *   brandLogo={<div className="w-7 h-7 bg-black rounded-md" />}
 *   links={[
 *     { label: 'About', href: '#' },
 *     { label: 'Blog', href: '#' },
 *     { label: 'Careers', href: '#' },
 *   ]}
 * />
 */
export const SimpleFooter = ({
  brandName,
  brandLogo,
  links = [],
  socialLinks = [],
  className = "",
}) => {
  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div style={{
        padding: '20px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'
      }}>
        {/* Left: Logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {brandLogo}
          {brandName && (
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111', letterSpacing: '-0.3px' }}>
              {brandName}
            </span>
          )}
        </div>

        {/* Center: Nav links */}
        {links.length > 0 && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {links.map((link, idx) => (
              <a key={idx} href={link.href}
                style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right: Social + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.href} aria-label={link.label}
              style={{ color: '#9ca3af', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >
              {link.icon}
            </a>
          ))}
          <p style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
            &copy; {new Date().getFullYear()} {brandName || 'Company'}
          </p>
        </div>
      </div>
    </footer>
  );
};
