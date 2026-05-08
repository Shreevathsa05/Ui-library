import React from 'react';
import { InputField } from './InputField';
import { labelStyle, primaryBtnStyle, errorStyle } from './authStyles';

export const SignInForm = ({
  email, setEmail,
  password, setPassword,
  errors,
  submitted,
  onSubmit,
  onForgotPassword,
  onSwitchMode,
}) => (
  <form onSubmit={onSubmit} noValidate>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div>
        <InputField id="auth-email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label htmlFor="auth-password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
          <button
            type="button"
            onClick={() => onForgotPassword?.(email)}
            style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.color = '#111'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            Forgot password?
          </button>
        </div>
        <InputField id="auth-password" label="" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>

      <button
        type="submit"
        style={{ ...primaryBtnStyle, marginTop: '4px', backgroundColor: submitted ? '#16a34a' : '#111' }}
        onMouseEnter={e => { if (!submitted) e.currentTarget.style.backgroundColor = '#374151'; }}
        onMouseLeave={e => { if (!submitted) e.currentTarget.style.backgroundColor = '#111'; }}
      >
        {submitted ? '✓  Signed In' : 'Sign In'}
      </button>
    </div>

    <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '20px', marginBottom: 0 }}>
      Don&apos;t have an account?{' '}
      <button type="button" onClick={onSwitchMode}
        style={{ fontSize: '13px', fontWeight: 600, color: '#111', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}>
        Register
      </button>
    </p>
  </form>
);
