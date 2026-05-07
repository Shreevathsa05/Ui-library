import React from 'react';
import { InputField } from './InputField';
import { primaryBtnStyle, errorStyle } from './authStyles';

export const RegisterForm = ({
  name, setName,
  email, setEmail,
  password, setPassword,
  confirm, setConfirm,
  errors,
  submitted,
  onSubmit,
  onSwitchMode,
}) => (
  <form onSubmit={onSubmit} noValidate>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div>
        <InputField id="auth-name" label="Full Name" placeholder="John Appleseed" value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>

      <div>
        <InputField id="auth-email-reg" label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      <div>
        <InputField id="auth-password-reg" label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>

      <div>
        <InputField id="auth-confirm" label="Confirm Password" type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} />
        {errors.confirm && <p style={errorStyle}>{errors.confirm}</p>}
      </div>

      <button
        type="submit"
        style={{ ...primaryBtnStyle, marginTop: '4px', backgroundColor: submitted ? '#16a34a' : '#111' }}
        onMouseEnter={e => { if (!submitted) e.currentTarget.style.backgroundColor = '#374151'; }}
        onMouseLeave={e => { if (!submitted) e.currentTarget.style.backgroundColor = '#111'; }}
      >
        {submitted ? '✓  Account Created' : 'Create Account'}
      </button>
    </div>

    <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '20px', marginBottom: 0 }}>
      Already have an account?{' '}
      <button type="button" onClick={onSwitchMode}
        style={{ fontSize: '13px', fontWeight: 600, color: '#111', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}>
        Sign In
      </button>
    </p>
  </form>
);
